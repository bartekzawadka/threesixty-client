import {Injectable} from '@angular/core';
import {LoggedUserInfo} from '../models/auth/LoggedUserInfo';
import {LoginInfo} from '../models/auth/LoginInfo';
import {ThreesixtyService} from './threesixty.service';
import {CookieService} from 'ngx-cookie-service';
import {ChangePasswordInfo} from '../models/auth/ChangePasswordInfo';

@Injectable()
export class AuthService {

  private userInfo: LoggedUserInfo;

  constructor(private cookieService: CookieService,
              private threesixtyService: ThreesixtyService) {
    this.setToDefault();
    this.getUserInfo();
  }

  private setToDefault() {
    this.userInfo = new LoggedUserInfo();
  }

  private extractUserInfo(data) {
    this.userInfo = new LoggedUserInfo();
    this.userInfo.IsAuthenticated = true;
    this.userInfo.Token = data.token;
    this.userInfo.Username = data.user.username;
    this.userInfo.Fullname = data.user.fullname;
  }

  public getUserInfo(): LoggedUserInfo {
    if (this.userInfo.IsAuthenticated) {
      return this.userInfo;
    }

    const data = this.cookieService.get('user');
    if (data) {
      const json = JSON.parse(data);
      this.extractUserInfo(json);
    }

    return this.userInfo;
  }

  public login(user: LoginInfo): Promise<LoggedUserInfo> {
    return new Promise<LoggedUserInfo>((resolve, reject) => {
      this.threesixtyService.authenticate(user).then(data => {
        if (!data || !data.token) {
          reject('No token data received!');
          return;
        }

        if (!data.user) {
          reject('No user data received!');
          return;
        }

        this.setToDefault();
        this.cookieService.set('user', JSON.stringify(data));
        this.extractUserInfo(data);

        resolve(this.getUserInfo());
      }).catch(error => {
        reject(error);
      });
    });
  }

  public logoff() {
    this.cookieService.delete('user');
    this.setToDefault();
  }
}
