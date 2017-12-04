import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ThreesixtyService} from '../threesixty.service';
import {LoaderDialogComponent} from '../loader-dialog/loader-dialog.component';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.scss']
})
export class NewImageComponent implements OnInit {

  private Files: File[];

  constructor(public dialog: MatDialog,
              public threesixtyService: ThreesixtyService) {
  }

  ngOnInit() {
  }

  inputChanged(ev) {
    if (ev.target.files && ev.target.files.length > 0) {
      this.Files = ev.target.files;
    }
  }

  submit() {
    const dialog = this.dialog.open(LoaderDialogComponent, <MatDialogConfig>{
      disableClose: true
    });

    this.threesixtyService.uploadFiles(this.Files).then(data => {
      dialog.close();
      dialog.afterClosed().subscribe(() => {
        this.dialog.open(MessageDialogComponent, <MatDialogConfig>{
          disableClose: true,
          data: {
            title: 'Success',
            message: 'Import completed successfully',
            type: 'info'
          }
        });
      });
    }, error => {
      dialog.close();
      dialog.afterClosed().subscribe(() => {
        this.dialog.open(MessageDialogComponent, <MatDialogConfig>{
          disableClose: true,
          data: {
            title: 'Operation failed',
            message: error,
            type: 'error'
          }
        });
      });
    });
  }
}
