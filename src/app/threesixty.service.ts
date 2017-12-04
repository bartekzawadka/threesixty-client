import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {PageableArray} from '../models/PageableArray';
import {ImagesFilter} from '../models/ImagesFilter';
import {environment} from '../environments/environment';

@Injectable()
export class ThreesixtyService {

  constructor(private http: Http) {
  }

  private static handleError(error: any, reject: (any) => void) {
    if (error && error.error) {
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


}
