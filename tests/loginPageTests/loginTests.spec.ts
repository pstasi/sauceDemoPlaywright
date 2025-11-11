import { test , expect, Page } from '@playwright/test';
import { PageObjectManager } from '../../src/pom/pom';
import * as loginErrorTestCases from '../../data/login-error-case.json';

let pom:PageObjectManager;

interface LoginErrorCase {
  description: string;
  input: { username: string; password: string };
  expectedError: string;
}

const testCases: Record<string, LoginErrorCase> =
  loginErrorTestCases as unknown as Record<string, LoginErrorCase>;

test.beforeEach(async ({page}) => {
  pom = new PageObjectManager(page);
  await page.goto("https://www.saucedemo.com/");
});

test.describe("Happy Path Login Tests", () => {
  test("Test 'standard_user' Login", {tag:'@LoginPageTests'}, async ({page}) => 
  {
    await pom.getLoginPage().loginOnlyWithValidUser("standard_user");
    await pom.getProductsPage().clickOnNthProduct(1);
  })

  test("Check for broken format - Login Page", {tag:'@LoginPageTests, @formatTesting'}, async ({}) => 
  {
    await pom.getFormatTestFunctions().checkForBrokenHTML();
  })

});

test.describe("Login Page Error Message Validation", () => {
  test("Check error message when login button is clicked without user or password input", async () => {
    await pom.getLoginPage().clickLoginButton();
    await expect(pom.getLoginPage().errorLabel).toBeVisible();
  })

  //TODO: fix below
  for (const [id, testCase] of Object.entries(testCases)) {
    test(`${id}: ${testCase.description}`, { tag:'@expectToFail' }, async () => {
      //const loginPage = pom.getLoginPage();
      await pom.getLoginPage().enterUsername(testCase.input.username ? testCase.input.username: '');
      await pom.getLoginPage().enterPassword(testCase.input.password ? testCase.input.password: '');
      const errorText = await pom.getLoginPage().getErrorMessage();
      expect(errorText).toBe(testCase.expectedError);
    });
  }
  //end TODO

  test("Check error message when a non-valid user attempts login", async ({page}) => {
    await pom.getLoginPage().attemptLoginProcess("asdf", undefined, true);
  })
});