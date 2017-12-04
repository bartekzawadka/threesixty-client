import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule, MatButtonModule, MatIconModule,
  MatMenuModule, MatGridListModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule, MatButtonModule, MatIconModule,
    MatMenuModule, MatGridListModule
  ],
  exports: [
    MatToolbarModule, MatButtonModule, MatIconModule,
    MatMenuModule, MatGridListModule
  ],
  declarations: []
})
export class AppMaterialModule { }
