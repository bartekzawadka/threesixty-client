import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';
import {LoginInfo} from '../../../models/auth/LoginInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public LoginInfo = new LoginInfo();

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: LoginInfo) {
    this.LoginInfo = data;
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

}
