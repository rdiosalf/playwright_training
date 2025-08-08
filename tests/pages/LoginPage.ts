import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async isLoginSuccessful() {
    return await this.page.isVisible('.inventory_list');
  }

  async getErrorMessage() {
    return await this.page.textContent('.error-message-container.error');
  }
}