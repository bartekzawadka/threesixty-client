export class DetailsSectionInfo {
  Label: string;
  Value: any;
  IsDate = false;

  constructor(label: string, value: any, isDate: boolean = false) {
    this.Label = label;
    this.Value = value;
    this.IsDate = isDate;
  }
}
