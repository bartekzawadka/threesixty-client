import {Component, OnInit} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {PageableArray} from '../../models/PageableArray';
import {ThreesixtyService} from '../threesixty.service';
import {DialogService} from '../dialog.service';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  public nbCols = 4;
  public nbGutter = '2vw';

  images: PageableArray<any> = new PageableArray<any>();
  pageSizeOptions = [5, 10, 25, 50, 100];

  constructor(private media: ObservableMedia,
              private threesixtyService: ThreesixtyService,
              private dService: DialogService) {
    this.getData();
  }

  ngOnInit() {
    this.updateGrid();
    this.media.subscribe(() => {
      this.updateGrid();
    });
  }

  getData() {
    this.dService.showLoader(this.threesixtyService.getImages(null, this.images.PageIndex, this.images.PageSize)
      .then((data) => {
        this.images = data;
      }), (error) => {
      if (error) {
        this.dService.showMessage('Error', error, 'error');
      }
    });
  }

  private updateGrid(): void {
    if (this.media.isActive('xs')) {
      this.nbCols = 1;
      this.nbGutter = '8px';
    }else if (this.media.isActive('sm')) {
      this.nbCols = 2;
      this.nbGutter = '8px';
    } else if (this.media.isActive('md')) {
      this.nbCols = 4;
      this.nbGutter = '20px';
    } else if (this.media.isActive('gt-md')) {
      this.nbCols = 4;
      this.nbGutter = '40px';
    } else {
      this.nbCols = 4;
      this.nbGutter = '20px';
    }
  }

}
