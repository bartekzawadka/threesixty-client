import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {PageableArray} from '../models/PageableArray';
import {ImagesFilter} from '../models/ImagesFilter';
import {environment} from '../environments/environment';
import {FileResult} from '../models/FileResult';
import {LoginInfo} from '../models/auth/LoginInfo';
import {UserInfo} from '../models/user/UserInfo';
import {ChangePasswordInfo} from '../models/auth/ChangePasswordInfo';

@Injectable()
export class ThreesixtyService {

  constructor(private http: HttpClient) {
  }

  private static handleError(error: any, reject: (any) => void) {
    try {
      if (error && error._body) {
        const body = JSON.parse(error._body);
        if (body && body.error) {
          reject(body.error);
        }
      } else if (error && error.error) {

        if (error.error.error) {
          reject(error.error.error);
          return;
        }

        try {
          const erM = JSON.parse(error.error);
          if (erM && erM.error) {
            reject(erM.error);
          }
        } catch (e) {
          if (error && error.message) {
            reject(error.message);
          } else if (error && error.statusText) {
            reject(error.statusText);
          } else {
            reject(error);
          }
        }
      } else if (error && error.message) {
        reject(error.message);
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

      this.http.get<any>(uri).subscribe((data) => {
        const result = new PageableArray<any>();
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
      this.http.get<any>(environment.threesixtyServiceUrl + '/api/image/' + id).subscribe((data) => {
        if (data.chunks && data.chunks.length > 0) {
          this.http.get<any>(environment.threesixtyServiceUrl + '/api/chunk/' + data.chunks[0].id)
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

      this.http.post<any>(environment.threesixtyServiceUrl + '/api/image/upload', formData)
        .subscribe((data) => {
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

      this.http.get(url, {observe: 'response', responseType: 'arrayBuffer' as 'json'}
      ).subscribe((data) => {

          try {
            if (!data || !data.headers) {
              reject('Response could not be parsed. No headers received');
              return;
            }

            if (!data['body']) {
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
            result.FileData = new Blob([data['body']], {type: contentType});
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
        .subscribe((data) => {
          resolve(data);
        }, error => {
          ThreesixtyService.handleError(error, reject);
        });
    });
  }

  getUsers(): Promise<Array<UserInfo>> {
    return new Promise<Array<UserInfo>>((resolve, reject) => {
      this.http.get<Array<UserInfo>>(environment.threesixtyServiceUrl + '/api/user')
        .subscribe(data => {

          if (!data || !data.length) {
            resolve(null);
            return;
          }

          resolve(data);
        }, error => {
          ThreesixtyService.handleError(error, reject);
        });
    });
  }

  changePassword(changePasswordInfo: ChangePasswordInfo) {
    return new Promise((resolve, reject) => {

      if (!changePasswordInfo) {
        reject('New password has not been provided');
        return;
      }

      if (!changePasswordInfo.username) {
        reject('User name has not been provided');
        return;
      }

      if (!changePasswordInfo.password || !changePasswordInfo.oldPassword || !changePasswordInfo.passwordConfirm) {
        reject('Invalid data. Some parts are missing');
        return;
      }

      this.http.post<any>(environment.threesixtyServiceUrl + '/api/user/changePassword', changePasswordInfo, {
        responseType: 'text' as 'json'
      })
        .subscribe(() => resolve(), error => ThreesixtyService.handleError(error, reject));
    });
  }

  refreshToken() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.threesixtyServiceUrl + '/api/user/refreshToken')
        .subscribe(data => {
          resolve(data);
        }, error => ThreesixtyService.handleError(error, reject));
    });
  }

  getUser(username: string): Promise<UserInfo> {
    return new Promise<UserInfo>((resolve, reject) => {
      this.http.get<UserInfo>(environment.threesixtyServiceUrl + '/api/user/' + username)
        .subscribe(data => {
          resolve(data);
        }, error => ThreesixtyService.handleError(error, reject));
    });
  }
}
