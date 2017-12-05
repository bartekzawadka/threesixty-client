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
import { LoaderDialogComponent } from './loader-dialog/loader-dialog.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import {HttpModule} from '@angular/http';
import {DialogService} from './dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    ImagesListComponent,
    NewImageComponent,
    FilesListComponent,
    LoaderDialogComponent,
    MessageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule
  ],
  providers: [Formatting, ThreesixtyService, DialogService],
  bootstrap: [AppComponent],
  entryComponents: [LoaderDialogComponent, MessageDialogComponent]
})
export class AppModule { }
