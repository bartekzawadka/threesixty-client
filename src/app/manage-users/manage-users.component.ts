import { Component, OnInit } from '@angular/core';
import {ILoadData} from '../../models/interfaces/ILoadData';
import {ThreesixtyService} from '../threesixty.service';
import {DialogService} from '../dialog.service';
import {UserInfo} from '../../models/user/UserInfo';
import {NavigationBase} from '../../models/common/navigation-base';
import {Location} from '@angular/common';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent extends NavigationBase implements OnInit, ILoadData {
  Users: Array<UserInfo>;


  constructor(private threesixtyService: ThreesixtyService,
              private dService: DialogService,
              public location: Location) {
    super(location);
    this.loadData();
  }

  ngOnInit() {
  }

  loadData() {
    this.dService.showLoader(this.threesixtyService.getUsers()
      .then((data) => {
        this.Users = data;
      }), (error) => {
      if (error) {
        this.dService.showMessage('Error', error, 'error');
      }
    });
  }
}
