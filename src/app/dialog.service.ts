import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {LoaderDialogComponent} from './dialogs/loader-dialog/loader-dialog.component';
import {MessageDialogComponent} from './dialogs/message-dialog/message-dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  showLoader<T>(promise: Promise<T>, dialogClosed: (error: any) => void = null) {

    const dRef = this.dialog.open(LoaderDialogComponent, <MatDialogConfig>{
      disableClose: true
    });
    promise.then(() => {
      this.closeDialog(dRef, dialogClosed);
    }, (error) => {
      this.closeDialog(dRef, dialogClosed, error);
    });
  }

  showMessage(title, message, type, messageClosed: () => void = null) {
    const dialogRef = this.dialog.open(MessageDialogComponent, <MatDialogConfig>{
      disableClose: true,
      data: {
        title: title,
        message: message,
        type: type
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      if (messageClosed) {
        messageClosed();
      }
    });
  }

  private closeDialog<T>(dRef: MatDialogRef<T>, dialogClosed: (error: any) => void = null, error: any = null) {
    dRef.close();
    dRef.afterClosed().subscribe(() => {
      if (dialogClosed) {
        dialogClosed(error);
      }
    });
  }
}
