import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private authService: AuthService;

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.authService = this.injector.get(AuthService);

    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.authService.getUserInfo().Token
      }
    });

    const userInfo = this.authService.getUserInfo();

    return next.handle(request)
      .catch((res) => {
        try {
          if (res.status === 401 || (userInfo.Expires && ((userInfo.Expires.getTime() - new Date().getTime()) <= 0))) {
            this.authService.logoff();
          }
        } finally {
          return Observable.throw(res);
        }
      }).do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          const now = new Date();

          if (userInfo.IsAuthenticated && userInfo.Expires) {

            const diff = ((userInfo.Expires.getTime() - now.getTime()) / 1000);
            if (diff <= 120) {
              this.authService.refreshToken();
            }
          }
        }
      });
  }
}
