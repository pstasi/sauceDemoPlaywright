import { Page, Locator } from "@playwright/test";

export class ProductsPage
{
  private readonly page:Page;
  //page elements
  private readonly allProducts:Locator;
  private readonly specificItemByTitle:(productName:string)=>Locator;

  constructor(page:Page)
  {
    this.page = page;
    //page elements
    this.allProducts = page.locator(`//div[@class='inventory_item_name ']`); //should return 6 different selctors
    this.specificItemByTitle = (productName:string) => page.locator(`//div[@class='inventory_item_name ' and text()='${productName}']`);
  }

  async clickOnNthProduct(productPosition:number)
  {
    await this.allProducts.nth(productPosition).click();
  }

  async getItemCount(): Promise<number>
  {
    return await this.allProducts.count();
  }

  async getListOfItems()
  {
    let listOfItems:string[] = [];
    const items = this.allProducts;
    for(let i = 0; i < await items.count(); i++)
    {
      let itemText = await items.nth(i).textContent();
      if(itemText)
      {
        listOfItems.push(itemText.toString());
      }
    }
    return listOfItems;
  }

  async validateProductTextAmongItems(productSearchedFor:string)
  {
    return (await this.getListOfItems()).includes(productSearchedFor);
  }

  async searchForItemAndCLick(productSearchedFor:string)
  {
    if(!this.validateProductTextAmongItems(productSearchedFor))
    {
      throw new Error(`Product ${productSearchedFor} does not exist on the Products Page.`)
    }
    else
    {
      await this.specificItemByTitle(productSearchedFor).click();
    }
  }

}