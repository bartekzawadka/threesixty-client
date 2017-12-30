import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ThreesixtyService} from '../threesixty.service';
import {LoaderDialogComponent} from '../dialogs/loader-dialog/loader-dialog.component';
import {MessageDialogComponent} from '../dialogs/message-dialog/message-dialog.component';
import {DialogService} from '../dialog.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.scss']
})
export class NewImageComponent implements OnInit {

  public Files: File[];

  constructor(private router: Router,
              public threesixtyService: ThreesixtyService,
              public dialogService: DialogService) {
  }

  ngOnInit() {
  }

  inputChanged(ev) {
    if (ev.target.files && ev.target.files.length > 0) {
      this.Files = ev.target.files;
    }
  }

  submit() {

    this.dialogService.showLoader(this.threesixtyService.uploadFiles(this.Files), (error) => {

      if (error) {
        this.dialogService.showMessage('Operation failed', error, 'error');
        return;
      }
      this.router.navigate(['/images']);
    });
  }
}
