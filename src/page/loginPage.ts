import { Page, Locator, expect } from "@playwright/test"
import user from "../../data/approved-users.json"

export class LoginPage
{
  private page:Page;
  //page elements
  usernameInputBox:Locator;
  passwordInputBox:Locator;
  loginButton:Locator;
  errorLabel:Locator

  constructor(page:Page) {
    this.page = page;
    this.usernameInputBox = page.getByPlaceholder("Username");
    this.passwordInputBox = page.getByPlaceholder("Password");
    this.loginButton = page.locator("//input[@data-test='login-button']");
    this.errorLabel = page.locator("//*[@data-test='error']");
  }

  async enterUsername(user?:string) {
    if(user)
    {
      await this.usernameInputBox.fill(user);
      await expect(this.usernameInputBox).toHaveValue(user);
    }
  }

  //password is static for all users
  async enterPassword(password?:string) {
    if(password)
    {
      await this.passwordInputBox.fill(password);
    }
    else
    {
      await this.passwordInputBox.fill("secret_sauce");
      expect(this.passwordInputBox).not.toBeEmpty();
    }
  }

  async clickLoginButton()
  {
    await this.loginButton.click();
  }

  async isUserValid(expectedUser:string)
  {
    let userList = user.user;
    if(userList.includes(expectedUser))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  async attemptLoginProcess(user:string, password?:string, expectLoginFailure?:Boolean)
  {
    await this.enterUsername(user);
    await this.enterPassword();
    await this.clickLoginButton();
    if(expectLoginFailure)
    {
      await expect(this.errorLabel).toBeVisible();
    }
  }

  async loginOnlyWithValidUser(expectedUser:string)
  {
    if(await this.isUserValid(expectedUser))
    {
      this.attemptLoginProcess(expectedUser)
    }
    else
    {
      throw new Error(`The user '${expectedUser}' is not a valid account!`)
    }
  }

  async getErrorMessage()
  {
    return await this.errorLabel.textContent();
  }
}