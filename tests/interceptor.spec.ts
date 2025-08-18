import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';



test('inicio sesion success sin dos imagens ', async ({ page }) => {

await page.on("request",req => {
  console.log("Request made with url: " + req.url());
});

/* Request made with url: https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b0.jpg
Request made with url: https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c2599ac5.jpg
 */

await page.route ('https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b0.jpg', route => {
  console.log("Intercepted request for bike-light-1200x1500.37c 843b0.jpg");
  route.abort();        // Abort the request
});



await page.route ('https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c2599ac5.jpg', route => {
  console.log("Intercepted request for bike-light-1200x1500.37c 843b0.jpg");
  route.abort();        // Abort the request
});



  await page.goto('https://saucedemo.com/');

  // Login con usuario estándar
  const loginPage = new LoginPage(page);
  await loginPage.taskExecutLogin('standard_user','secret_sauce');
  await loginPage.successLogin()

  await page.screenshot({ path: 'screenshots/sindosimagenes.png' }); // Captura de pantalla sin dos imagenes

});





test('inicio sesion success sin ninguna imagen  ', async ({ page }) => {


await page.route ('**/*.{png,jpg,jpeg,svg}', route => {
  console.log("Intercepted request for bike-light-1200x1500.37c 843b0.jpg");
  route.abort();        // Abort the request
});

await page.route ('https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c2599ac5.jpg', route => {
  console.log("Intercepted request for bike-light-1200x1500.37c 843b0.jpg");
  route.abort();        // Abort the request
});



  await page.goto('https://saucedemo.com/');

  // Login con usuario estándar
  const loginPage = new LoginPage(page);
  await loginPage.taskExecutLogin('standard_user','secret_sauce');
  await loginPage.successLogin()

  await page.screenshot({ path: 'screenshots/sinimagenes.png' }); // Captura de pantalla sin dos imagenes

});
