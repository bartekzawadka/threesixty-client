import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ILoadData} from '../../models/interfaces/ILoadData';
import {ActivatedRoute, Params} from '@angular/router';
import {ThreesixtyService} from '../threesixty.service';
import {DialogService} from '../dialog.service';
import {UserInfo} from '../../models/user/UserInfo';
import {NavigationBase} from '../../models/common/navigation-base';
import {Location} from '@angular/common';
import {DetailsSectionInfo} from '../../models/user/DetailsSectionInfo';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent extends NavigationBase implements OnInit, ILoadData {

  public data: UserInfo = new UserInfo();
  public sections: Array<DetailsSectionInfo> = [];
  private username: string;

  constructor(private dService: DialogService,
              private threesixtyService: ThreesixtyService,
              public location: Location,
              private route: ActivatedRoute) {
    super(location);
    this.route.params.subscribe((p: Params) => {
      if (!p || !p['username']) {
        return;
      }

      this.username = p['username'];
      this.loadData();
    });
  }

  ngOnInit() {
  }

  loadData() {
    if (!this.username) {
      return;
    }

    this.dService.showLoader(this.threesixtyService.getUser(this.username).then(data => {
      this.data = data;
      const sections = [];

      sections.push(new DetailsSectionInfo('ID', data.id));
      sections.push(new DetailsSectionInfo('User name', data.username));
      sections.push(new DetailsSectionInfo('Full name', data.fullname));
      sections.push(new DetailsSectionInfo('Created at', data.createdAt, true));
      sections.push(new DetailsSectionInfo('Last login', data.lastLogin, true));

      this.sections = sections;
    }), error => {
      if (error) {
        this.dService.showMessage('Error getting user details',
          'Unable to get user details: ' + error,
          'error');
      }
    });
  }
}
