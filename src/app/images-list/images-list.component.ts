import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {PageableArray} from '../../models/PageableArray';
import {ThreesixtyService} from '../threesixty.service';
import {DialogService} from '../dialog.service';
import {saveAs} from 'file-saver/FileSaver';
import {ILoadData} from '../../models/interfaces/ILoadData';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImagesListComponent implements OnInit, ILoadData {

  public nbCols = 4;
  public nbGutter = '2vw';

  images: PageableArray<any> = new PageableArray<any>();
  pageSizeOptions = [5, 10, 25, 50, 100];

  constructor(private media: ObservableMedia,
              private threesixtyService: ThreesixtyService,
              private dService: DialogService) {
    this.loadData();
  }

  ngOnInit() {
    this.updateGrid();
    this.media.subscribe(() => {
      this.updateGrid();
    });
  }

  loadData() {
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
    } else if (this.media.isActive('sm')) {
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

  downloadImage(id: number, fileName: string, type: string) {
    this.dService.showLoader(this.threesixtyService.downloadImage(id, type, fileName).then((data) => {
      try {
        saveAs(data.FileData, data.FileName);
      } catch (e) {
        this.dService.showMessage('Operation failed', e, 'error');
      }
    }), (error) => {
      if (error) {
        this.dService.showMessage('Operation failed', error, 'error');
      }
    });
  }

}
