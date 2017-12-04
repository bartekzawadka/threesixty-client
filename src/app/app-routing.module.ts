import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImagesListComponent} from './images-list/images-list.component';
import {NewImageComponent} from './new-image/new-image.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'images'
  },
  {
    path: 'images',
    component: ImagesListComponent
  },
  {
    path: 'import',
    component: NewImageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
