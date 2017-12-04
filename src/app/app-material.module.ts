import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule, MatButtonModule,
  MatMenuModule, MatGridListModule, MatCardModule, MatFormFieldModule,
  MatExpansionModule, MatInputModule, MatListModule, MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule, MatButtonModule, MatIconModule,
    MatMenuModule, MatGridListModule, MatCardModule, MatFormFieldModule,
    MatExpansionModule, MatInputModule, MatListModule, MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatToolbarModule, MatButtonModule, MatIconModule,
    MatMenuModule, MatGridListModule, MatCardModule, MatFormFieldModule,
    MatExpansionModule, MatInputModule, MatListModule, MatDialogModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class AppMaterialModule { }
