import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { ImagesListComponent } from './images-list/images-list.component';
import {AppMaterialModule} from './app-material.module';
import { NewImageComponent } from './new-image/new-image.component';
import { FilesListComponent } from './files-list/files-list.component';
import {Formatting} from '../utilities/formatting';
import {ThreesixtyService} from './threesixty.service';
import { LoaderDialogComponent } from './dialogs/loader-dialog/loader-dialog.component';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import {DialogService} from './dialog.service';
import { ImageDetailsComponent } from './image-details/image-details.component';
import {CookieService} from 'ngx-cookie-service';
import { LoginComponent } from './dialogs/login/login.component';
import {AuthService} from './auth.service';
import {TokenInterceptor} from './auth/token.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ImagesListComponent,
    NewImageComponent,
    FilesListComponent,
    LoaderDialogComponent,
    MessageDialogComponent,
    ImageDetailsComponent,
    LoginComponent,
    ManageUsersComponent,
    ChangePasswordComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    HttpClientModule
  ],
  providers: [Formatting, ThreesixtyService, DialogService, CookieService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [LoaderDialogComponent, MessageDialogComponent, LoginComponent]
})
export class AppModule { }
