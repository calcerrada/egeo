export class Page {
  constructor(
    public currentPage: number,
    public elementsPerPage: number,
    public limit: number // TODO: Name more descriptive
  ) { }
}
