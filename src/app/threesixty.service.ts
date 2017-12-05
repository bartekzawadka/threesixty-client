import {Injectable} from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/map';
import {PageableArray} from '../models/PageableArray';
import {ImagesFilter} from '../models/ImagesFilter';
import {environment} from '../environments/environment';

@Injectable()
export class ThreesixtyService {

  constructor(private http: Http) {
  }

  private static handleError(error: any, reject: (any) => void) {
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
}
