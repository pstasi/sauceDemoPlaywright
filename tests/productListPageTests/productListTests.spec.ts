import { test } from "@playwright/test"
import { PageObjectManager } from "../../src/pom/pom";

let pom:PageObjectManager;

test.beforeEach(async ({page}) => {
  pom = new PageObjectManager(page);
  await page.goto("https://www.saucedemo.com/");
});

test.describe("Happy Path Product List Testing", () => 
{
  
  //this test will always fail because the test page has these formatting errors which we want to check for in a real testing environment
  test("Check Product List Page for Broken Formatting", {tag: '@expectToFail'}, async ({page}) =>
  {
    await page.goto("https://www.saucedemo.com/");
    await pom.getLoginPage().attemptLoginProcess("standard_user");
    await pom.getFormatTestFunctions().checkForBrokenHTML();

  })
});