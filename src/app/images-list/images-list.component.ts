import {Component, OnInit} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  public nbCols = 4;
  public nbGutter = '2vw';

  constructor(private media: ObservableMedia) {
  }

  ngOnInit() {
    this.updateGrid();
    this.media.subscribe(() => {
      this.updateGrid();
    });
  }

  private updateGrid(): void {
    if (this.media.isActive('xs')) {
      this.nbCols = 1;
      this.nbGutter = '8px';
    }
    if (this.media.isActive('md')) {
      this.nbCols = 2;
      this.nbGutter = '8px';
    } else {
      this.nbCols = 4;
      this.nbGutter = '2vw';
    }
  }

}
