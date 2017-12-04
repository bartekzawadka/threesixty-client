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

@NgModule({
  declarations: [
    AppComponent,
    ImagesListComponent,
    NewImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
