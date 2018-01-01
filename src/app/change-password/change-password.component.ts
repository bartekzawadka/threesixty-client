import {Component, OnInit} from '@angular/core';
import {ChangePasswordInfo} from '../../models/auth/ChangePasswordInfo';
import {AuthService} from '../auth.service';
import {DialogService} from '../dialog.service';
import {Location} from '@angular/common';
import {NavigationBase} from '../../models/common/navigation-base';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends NavigationBase implements OnInit {

  ChangePasswordInfo = new ChangePasswordInfo();

  constructor(private authService: AuthService,
              private dService: DialogService,
              public location: Location) {
    super(location);
    this.ChangePasswordInfo.username = this.authService.getUserInfo().Username;
  }

  ngOnInit() {
  }

  changePassword() {

    this.dService.showLoader(this.authService.changePassword(this.ChangePasswordInfo), error => {
      if (error) {
        this.dService.showMessage('Error', error, 'error');
      } else {
        this.dService.showMessage('Success', 'Password successfully changed', 'info',
          () => {
            this.location.back();
          });
      }
    });
    this.authService.changePassword(this.ChangePasswordInfo);
  }

  passwordsAreEqual(): boolean {
    return this.ChangePasswordInfo.password === this.ChangePasswordInfo.passwordConfirm;
  }
}
