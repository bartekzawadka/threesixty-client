import {Injectable} from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import {PageableArray} from '../models/PageableArray';
import {ImagesFilter} from '../models/ImagesFilter';
import {environment} from '../environments/environment';
import {FileResult} from '../models/FileResult';
import {LoginInfo} from '../models/auth/LoginInfo';
import {LoggedUserInfo} from '../models/auth/LoggedUserInfo';

@Injectable()
export class ThreesixtyService {

  constructor(private http: Http) {
  }

  private static handleError(error: any, reject: (any) => void) {
    try {
      if (error && error._body) {
        const body = JSON.parse(error._body);
        if (body && body.error) {
          reject(body.error);
        }
      } else if (error && error.error) {
        reject(error.error);
      } else if (error && error.statusText) {
        reject(error.statusText);
      } else {
        reject(error);
      }
    } catch (e) {
      reject('Error occured while parsing response: ' + e);
    }
  }

  getImages(filter: ImagesFilter,
            skip: number = 0,
            limit: number = 50) {
    return new Promise<PageableArray<any>>((resolve, reject) => {
      let uri = environment.threesixtyServiceUrl + '/api/image?skip=' + skip + '&limit=' + limit;
      if (filter) {
        if (filter.SearchPhrase) {
          uri += '&searchString=' + filter.SearchPhrase;
        }
        if (filter.CreatedAtFrom) {
          uri += '&createdAtFrom=' + filter.CreatedAtFrom;
        }
        if (filter.CreatedAtTo) {
          uri += '&createdAtTo=' + filter.CreatedAtTo;
        }
      }

      this.http.get(uri).map((res) => res.json()).subscribe((data) => {
        const result = new PageableArray();
        result.PageIndex = skip;
        result.PageSize = limit;

        if (data) {
          result.Rows = data.rows;
          result.TotalCount = data.totalCount;
        }

        resolve(result);
      }, (error) => {
        ThreesixtyService.handleError(error, reject);
      });
    });
  }

  getImage(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.threesixtyServiceUrl + '/api/image/' + id).map((res) => res.json()).subscribe((data) => {
        if (data.chunks && data.chunks.length > 0) {
          this.http.get(environment.threesixtyServiceUrl + '/api/chunk/' + data.chunks[0].id).map((res) => res.json())
            .subscribe((chunk) => {
              if (chunk && chunk.data) {
                data.chunk = chunk.data;
              }
              resolve(data);
            });
        } else {
          resolve(data);
        }
      }, (error) => {
        ThreesixtyService.handleError(error, reject);
      });
    });
  }

  uploadFiles(files: File[]) {
    return new Promise((resolve, reject) => {
      if (!files) {
        reject('No files selected to upload');
        return;
      }

      const formData = new FormData();
      for (let k = 0; k < files.length; k++) {
        formData.append('files[' + k + ']', files[k], files[k].name);
      }

      const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      const options = new RequestOptions(<RequestOptionsArgs>{headers: headers});

      this.http.post(environment.threesixtyServiceUrl + '/api/image/upload', formData, options)
        .map((res) => res.json()).subscribe((data) => {
        resolve(data);
      }, (error) => {
        ThreesixtyService.handleError(error, reject);
      });
    });
  }

  downloadImage(id: number, type: string, fileName: string) {
    return new Promise<FileResult>((resolve, reject) => {
      let url = environment.threesixtyServiceUrl + '/api/image/' + id + '/download';
      if (type) {
        url += ((url.indexOf('?') === -1) ? '?' : '&') + 'format=' + type;
      }
      if (fileName) {
        url += ((url.indexOf('?') === -1) ? '?' : '&') + 'fileName=' + fileName;
      }

      this.http.get(url, {
        responseType: ResponseContentType.ArrayBuffer
      }).subscribe((data) => {

        try {

          if (!data || !data.headers) {
            reject('Response could not be parsed. No headers received');
            return;
          }

          if (!data['_body']) {
            reject('Empty data received');
          }

          const contentType = data.headers.get('content-type');
          const contentDisposition = data.headers.get('content-disposition');

          if (!contentType || !contentDisposition) {
            reject('Response does not contain expected headers. Invalid format');
            return;
          }

          const parts: string[] = contentDisposition.split(';');
          if (!parts || parts.length < 2) {
            reject('Content disposition header has invalid format');
            return;
          }

          const fileNameParts = parts[1].split('=');
          let fName: string;

          if (!fileNameParts || fileNameParts.length < 2) {
            console.warn('Content disposition header does not contain file name');
            fName = 'file';
          } else {
            fName = fileNameParts[1];
          }
          const filename = fName;

          const result = new FileResult();
          result.FileData = new Blob([data['_body']], {type: contentType});
          result.FileName = filename;

          resolve(result);

        } catch (e) {
          reject(e);
        }
      }, (error) => {
        ThreesixtyService.handleError(error, reject);
      });
    });
  }

  authenticate(loginInfo: LoginInfo) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.threesixtyServiceUrl + '/api/user/token', loginInfo)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
        }, error => {
          ThreesixtyService.handleError(error, reject);
        });
    });
  }
}
