import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Formatting} from '../../utilities/formatting';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilesListComponent implements OnInit {

  @Input('data') data: File[];
  @Output() dataChange = new EventEmitter();

  constructor(public formattingUtils: Formatting) {
  }

  ngOnInit() {
  }

  removeFile(index) {
    if (this.data && this.data.length > 0) {

      let files: File[] = [];

      for (let k = 0; k < this.data.length; k++) {
        if (k !== index) {
          files.push(this.data[k]);
        }
      }

      this.data = files;
      this.dataChange.emit(this.data);
    }
  }

}
