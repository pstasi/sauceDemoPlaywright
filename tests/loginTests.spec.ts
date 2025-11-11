import { test , expect, Page } from '@playwright/test';
import { PageObjectManager } from '../src/pom/pom';

//let page: Page;
let pom:PageObjectManager;

test.beforeEach(async ({page}) => {
  pom = new PageObjectManager(page);
  await page.goto("https://www.saucedemo.com/");
});

test.describe("Happy Path Login Tests", () => {
  test("test login", async ({page}) => 
  {
    await page.goto("https://www.saucedemo.com/");
    await pom.getLoginPage().attemptLoginProcess("standard_user");
    await pom.getProductsPage().clickOnNthProduct(1);
  })

  test("check for broken code", async () => 
  {
    await pom.getFormatTestFunctions().checkForBrokenHTML();
  })

});

//this must be moved to another test file later
test.describe("product list page testing", () => 
{
  //this test will always fail because the test page has these formatting errors which we want to check for in a real testing environment
  test("Check Product List Page for Broken Formatting", async ({page}) =>
  {
    await page.goto("https://www.saucedemo.com/");
    await pom.getLoginPage().attemptLoginProcess("standard_user");
    await pom.getFormatTestFunctions().checkForBrokenHTML();

  })
});

