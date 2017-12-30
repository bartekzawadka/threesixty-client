import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoginComponent} from './dialogs/login/login.component';
import {LoginInfo} from '../models/auth/LoginInfo';
import {DialogService} from './dialog.service';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loginInfo = new LoginInfo();

  constructor(private dialog: MatDialog, private dService: DialogService, public authService: AuthService) {
  }

  login() {
    const dRef = this.dialog.open(LoginComponent, <MatDialogConfig>{
      disableClose: false,
      data: this.loginInfo
    });

    dRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dService.showLoader(this.authService.login(data).then(null, error => {
          if (error) {
            this.dService.showMessage('Log in failed', error, 'error');
          }
        }));
      }
    });
  }
}
