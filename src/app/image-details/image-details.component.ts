import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ILoadData} from '../../models/interfaces/ILoadData';
import {DialogService} from '../dialog.service';
import {ThreesixtyService} from '../threesixty.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageDetailsComponent implements OnInit, ILoadData {

  public data: any = {};
  private id: number;
  public nbCols = 2;

  constructor(private dService: DialogService,
              private threesixtyService: ThreesixtyService,
              private route: ActivatedRoute) {
    this.route.params.subscribe((p: Params) => {
      if (!p || !p['id']) {
        console.log('NO ID PARAM!');
        return;
      }

      console.log('ID: ' + p['id']);

      this.id = p['id'];
      this.loadData();
    });
  }

  ngOnInit() {
  }

  loadData() {
    this.dService.showLoader(this.threesixtyService.getImage(this.id).then(data => {
      console.log('data received:');
      console.log(data);
      this.data = data;
    }), (error) => {
      if (error) {
        this.dService.showMessage('Error getting details', 'Unable to get image details from server: ' + error, 'error');
      }
    });
  }

}
