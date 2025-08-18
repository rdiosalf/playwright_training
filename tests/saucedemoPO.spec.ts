import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';


test('navigate to saucedemo using env file', async ({ page }) => {
  //await page.goto('https://saucedemo.com/');
  await page.goto(process.env.URL); 
  console.log('valor de la variable texto en el entorno', process.env.texto); 
  //await page.pause(); // Pausa para inspeccionar la página
  await expect(page).toHaveTitle(/Swag Labs/); // Verificar que el

});

test('login ok con usuario standar', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

  // Login con usuario estándar
  const loginPage = new LoginPage(page);
/*   await loginPage.fillUserName('standard_user');
  await loginPage.fillPassword('secret_sauce'); 
  await loginPage.clickLoginButton(); */
  await loginPage.taskExecutLogin('standard_user','secret_sauce');
  await loginPage.successLogin()
  

});

test('login nok con usuario standar pass incorrecta', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

  // Login con usuario estándar
  const loginPage = new LoginPage(page);
  await loginPage.fillUserName('standard_user');
  await loginPage.fillPassword('xxxxx'); 
  await loginPage.clickLoginButton();
  //verificar que se ha iniciado sesión incorrectamente
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  console.log('Login fallido con éxito');

});

test ('login co usuario locekd out', async ({ page }) => {
  await page.goto('https://saucedemo.com/');    
  const loginPage = new LoginPage(page);
  await loginPage.fillUserName('locked_out_user');
  await loginPage.fillPassword('secret_sauce');
  await loginPage.clickLoginButton();
  //verificar que se ha iniciado sesión incorrectamente
  await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
  console.log('Login con usuario bloqueado realizado con éxito');
});


test('compra random con arquitectura PAGE OBJECT y comprobación de que lo comprado es lo mismo q lo clicado', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

  // Login con usuario estándar
  const loginPage = new LoginPage(page);
  await loginPage.fillUserName('standard_user');
  await loginPage.fillPassword('secret_sauce'); 
  await loginPage.clickLoginButton();

  // Verificar que hay productos listados
 //no funciona porque es <div class="inventory_item" const productList = page.getByTestId('inventory_item');
 //por css
  const productList = await page.locator('#inventory_container .inventory_item').all(); //me está dando la lista 

  const randomIndex = Math.floor(Math.random() * productList.length);
  const randomProduct = productList[randomIndex];
  const productName = await randomProduct.locator('.inventory_item_name').textContent();
  const productPrice = await randomProduct.locator('.inventory_item_price').textContent();
  const productDescription = await randomProduct.locator('.inventory_item_desc').innerText();//diferencia textcontent es que este devuelve el texto tal cual se renderiza en la pantalla
  //si el texto está oculto innerText no lo devuelve!! 
  console.log('Producto seleccionado:', productName, 'Precio:', productPrice, 'Descripción:', productDescription);    

  await randomProduct.getByRole('button', { name: 'Add to cart' }).click();

  // Ir al carrito el Role no es representativo de un botón, es un enlace
  await page.locator('a.shopping_cart_link').click();

  //await page.pause(); // Pausa para inspeccionar el producto seleccionado de segundos


  //comprobacion de que esta el boton checkout en carrito
 await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

  const actualProductName = await page.locator('.inventory_item_name').textContent();
  const actualProductPrice = await page.locator('.inventory_item_price').textContent();
  const actualProductDescription = await page.locator('.inventory_item_desc').innerText();

  //asercion de lo que era es lo que se ha comprado  - toEqual mejor para comparar en profundidad tipos primitivos
  expect(actualProductName).toEqual(productName); // Asegurarse de que no sea null o undefined
  //expect(actualProductName).toBe(productName);
  expect(actualProductPrice).toEqual(productPrice);
  expect(actualProductDescription).toEqual(productDescription);

  //click en checkout
  await page.getByRole('button', { name: 'Checkout' }).click();

  //login para el checkout 
  await page.getByRole('textbox', { name: 'First Name' }).fill('comprador1');
  await page.getByRole('textbox', { name:  'Last Name' }).fill('comprador1apellido  ');
  await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');

//  page.pause(); // Pausa para inspeccionar el formulario de checkout

  await page.getByRole('button', { name: 'Continue' }).click();

  //await page.pause(); // Pausa para inspeccionar la página de confirmación de compra

  await page.getByRole('button', { name: 'Finish' }).click();

  //page.pause(); // Pausa para inspeccionar la página de finalización de compra

  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
  console.log('Compra finalizada con éxito');



  

});