import {Page} from "@playwright/test"

export class ProductDetailsPage
{
  private readonly page:Page;
  //selectors
  

  constructor(page:Page)
  {
    this.page = page;
  }
}