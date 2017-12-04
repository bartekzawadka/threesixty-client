export class PageableArray<T> {
  public Rows: Array<T> = null;
  public TotalCount = 0;
  public PageIndex = 0;
  public PageSize = 50;

  get pageNumber(): number {
    return this.PageIndex + 1;
  }
}
