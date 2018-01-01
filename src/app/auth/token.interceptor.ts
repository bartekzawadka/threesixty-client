import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private authService: AuthService;

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.authService = this.injector.get(AuthService);

    const userInfo = this.authService.getUserInfo();
    if (userInfo && userInfo.Token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getUserInfo().Token
        }
      });
    }

    return next.handle(request);
  }
}
