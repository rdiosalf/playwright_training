import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
// Elementos de la página de login
  private readonly userNameTextbox:Locator;   
  private readonly passTextbox:Locator;   
  private readonly buttonLogin:Locator;   
  private readonly iconCartLogged:Locator;   


  //localizacion
  constructor(private page: Page) {
    this.userNameTextbox = page.getByRole('textbox', { name: 'Username' })
    this.passTextbox = page.getByPlaceholder('Password')
    this.buttonLogin = page.getByRole('button', { name: 'Login' }) 
    //this.iconCartLogged = page.locator('xpath=//a[contains(@class=\'shopping_cart_link\')]')
    this.iconCartLogged = page.locator('.shopping_cart_link')
  }




  //interaccion
  //metodo para relleno de usuario
  async fillUserName(userName: string) {
    await this.userNameTextbox.fill(userName);
  }

  async fillStandarUserName() {
    this.fillUserName('standard_user');
  }

  async fillStandarPass() {
    this.fillPassword('secret_sauce');
  }

  async fillPassword(password: string) {
    await this.passTextbox.fill(password);
  } 

  async clickLoginButton() {
    await this.buttonLogin.click();
  } 

  //obtener titulo de la pagina una vez logueado y comprobar que es visible y contenga la palabra Products
 async successLogin() {
  await expect(this.iconCartLogged).toBeVisible();
    console.log('Login realizado con éxito');
   }

 async taskExecutLogin(userName: string, password: string) {
  await this.fillUserName(userName);
  this.page.pause();
  await this.fillPassword(password);
  this.page.pause();
  await this.clickLoginButton();
  this.page.pause();
  ;
 }
}