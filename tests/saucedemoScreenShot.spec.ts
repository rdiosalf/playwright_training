import { test, expect, Locator } from '@playwright/test';

test('compra de un elemento con capturas de pantalla', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

 //Ingreso usuario y contraseña para un usuario estandar standar_user y clave secret_sauce
 //veo una serie de elementos y compruebo el listdo de elementos no está vacio
 //selecciono el primer elemento que contenga un botón de añadir al carrito
 //ir al carrito y validar que el elemento que añadí está en el carrito
 //y que el precio es correcto 
 //da al boton de checkout y aparece un formulario 
 //relleno el formulario con datos de prueba
  //finalizo la compra y valido que el mensaje de finalización es correcto

  // Login con usuario estándar
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.screenshot({ path: 'screenshots/login.png' }); // Captura de pantalla del login
  await page.screenshot({ path: 'screenshots/loginfull.png',fullPage:true }); // Captura de pantalla del login a fullpage

  await page.click('#login-button');

  // Verificar que hay productos listados
  const productList = page.locator('.inventory_item');
  await expect(productList).not.toHaveCount(0);

  await page.screenshot({ path: 'screenshots/list.png' }); // Captura de pantalla de listado
  await page.screenshot({ path: 'screenshots/listfull.png',fullPage:true }); 

  // Seleccionar primer producto y obtener su información
  const firstProduct = page.locator('.inventory_item').first();
  const productName = await firstProduct.locator('.inventory_item_name').textContent();
  const productPrice = await firstProduct.locator('.inventory_item_price').textContent();
  await firstProduct.locator('button[id^="add-to-cart"]').click();


  await page.screenshot({ path: 'screenshots/productInCart.png' }); 

  // Ir al carrito
  await page.click('.shopping_cart_link');

  // Verificar que el producto está en el carrito con el precio correcto
  const cartItem = page.locator('.cart_item');
  await expect(cartItem.locator('.inventory_item_name')).toHaveText(productName || '');
  await expect(cartItem.locator('.inventory_item_price')).toHaveText(productPrice || '');
   await page.screenshot({ path: 'screenshots/productInCart2.png' }); 


  // Proceder al checkout
  await page.click('#checkout');

  // Rellenar formulario de información
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  // Finalizar compra
  await page.click('#finish');

  // Verificar mensaje de éxito
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
   await page.screenshot({ path: 'screenshots/success.png' }); 

});

test('compra de un elemento con capturas de pantalla incluidos en reporte', async ({ page }, testInfo) => {
  await page.goto('https://saucedemo.com/');

 //Ingreso usuario y contraseña para un usuario estandar standar_user y clave secret_sauce
 //veo una serie de elementos y compruebo el listdo de elementos no está vacio
 //selecciono el primer elemento que contenga un botón de añadir al carrito
 //ir al carrito y validar que el elemento que añadí está en el carrito
 //y que el precio es correcto 
 //da al boton de checkout y aparece un formulario 
 //relleno el formulario con datos de prueba
  //finalizo la compra y valido que el mensaje de finalización es correcto

  // Login con usuario estándar
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');

  await testInfo.attach('login screenshot', {
    body: await page.screenshot(),
    contentType: 'image/png'
  });

  await page.click('#login-button');

  // Verificar que hay productos listados
  const productList = page.locator('.inventory_item');
  await expect(productList).not.toHaveCount(0);


  // Seleccionar primer producto y obtener su información
  const firstProduct = page.locator('.inventory_item').first();
  const productName = await firstProduct.locator('.inventory_item_name').textContent();
  const productPrice = await firstProduct.locator('.inventory_item_price').textContent();
  await firstProduct.locator('button[id^="add-to-cart"]').click();



  // Ir al carrito
  await page.click('.shopping_cart_link');

  // Verificar que el producto está en el carrito con el precio correcto
  const cartItem = page.locator('.cart_item');
  await expect(cartItem.locator('.inventory_item_name')).toHaveText(productName || '');
  await expect(cartItem.locator('.inventory_item_price')).toHaveText(productPrice || '');


  // Proceder al checkout
  await page.click('#checkout');

  // Rellenar formulario de información
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  // Finalizar compra
  await page.click('#finish');

  // Verificar mensaje de éxito
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

  await testInfo.attach('success screenshot', {
    body: await page.screenshot(),
    contentType: 'image/png'
  });

});

test('compra de un elemento con error y capturando pantalla en el error ', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

 //Ingreso usuario y contraseña para un usuario estandar standar_user y clave secret_sauce
 //veo una serie de elementos y compruebo el listdo de elementos no está vacio
 //selecciono el primer elemento que contenga un botón de añadir al carrito
 //ir al carrito y validar que el elemento que añadí está en el carrito
 //y que el precio es correcto 
 //da al boton de checkout y aparece un formulario 
 //relleno el formulario con datos de prueba
  //finalizo la compra y valido que el mensaje de finalización es correcto

  // Login con usuario estándar
  await page.fill('#user-name', 'fñajdñjñfañjfañ');
  await page.fill('#password', 'secret_sauce');

  await page.click('#login-button');

  // Verificar que hay productos listados
  const productList = page.locator('.inventory_item');
  await expect(productList).not.toHaveCount(0);


  // Seleccionar primer producto y obtener su información
  const firstProduct = page.locator('.inventory_item').first();
  const productName = await firstProduct.locator('.inventory_item_name').textContent();
  const productPrice = await firstProduct.locator('.inventory_item_price').textContent();
  await firstProduct.locator('button[id^="add-to-cart"]').click();



  // Ir al carrito
  await page.click('.shopping_cart_link');

  // Verificar que el producto está en el carrito con el precio correcto
  const cartItem = page.locator('.cart_item');
  await expect(cartItem.locator('.inventory_item_name')).toHaveText(productName || '');
  await expect(cartItem.locator('.inventory_item_price')).toHaveText(productPrice || '');


  // Proceder al checkout
  await page.click('#checkout');

  // Rellenar formulario de información
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  // Finalizar compra
  await page.click('#finish');

  // Verificar mensaje de éxito
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
   await page.screenshot({ path: 'screenshots/success.png' }); 

});

