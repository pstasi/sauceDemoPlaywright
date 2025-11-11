import { Page } from "@playwright/test";
import { LoginPage } from "../page/loginPage";
import { ProductsPage } from "../page/productsPage";
import { FormattingTestFunctions } from "../page/formattingTestFunctions";

export class PageObjectManager {
  private page:Page;
  private loginPage:LoginPage;
  private productsPage:ProductsPage;
  private formatTestFunctions:FormattingTestFunctions;

  constructor(page:Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.productsPage = new ProductsPage(page);
    this.formatTestFunctions = new FormattingTestFunctions(page);
  }

  getLoginPage()
  {
    // if(!this.loginPage)
    // {
    //   this.loginPage = new LoginPage(this.page);
    // }
    return this.loginPage;
  }

  getProductsPage()
  {
    return this.productsPage;
  }

  getFormatTestFunctions()
  {
    return this.formatTestFunctions;
  }

}