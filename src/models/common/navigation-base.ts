import {Location} from '@angular/common';

export class NavigationBase {

  constructor(public location: Location) {
  }

  goBack() {
    this.location.back();
  }
}
