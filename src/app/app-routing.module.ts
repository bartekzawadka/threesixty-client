import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImagesListComponent} from './images-list/images-list.component';
import {NewImageComponent} from './new-image/new-image.component';
import {ImageDetailsComponent} from './image-details/image-details.component';

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
  },{
    path: 'image/:id',
    component: ImageDetailsComponent
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
