import { Page, Locator, expect } from "@playwright/test"

export class LoginPage
{
  private page:Page;
  //page elements
  usernameInputBox:Locator;
  passwordInputBox:Locator;
  loginButton:Locator;

  constructor(page:Page) {
    this.page = page;
    this.usernameInputBox = page.getByPlaceholder("Username");
    this.passwordInputBox = page.getByPlaceholder("Password");
    this.loginButton = page.locator("//input[@data-test='login-button']");
  }

  async enterUsername(user:string) {
    await this.usernameInputBox.fill(user);
    //expect(this.usernameInputBox).toContainText(user); //
    expect(this.usernameInputBox).toHaveValue(user);
  }

  //password is static for all users
  async enterPassword() {
    await this.passwordInputBox.fill("secret_sauce");
    expect(this.passwordInputBox).not.toBeEmpty();
  }

  async clickLoginButton()
  {
    await this.loginButton.click();
  }

  async attemptLoginProcess(user:string, expectLoginFailure?:Boolean)
  {
    await this.enterUsername(user);
    await this.enterPassword();
    await this.clickLoginButton();
  }
}