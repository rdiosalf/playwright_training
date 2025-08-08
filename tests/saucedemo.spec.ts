import { test, expect, Locator } from '@playwright/test';

test('compra de un elemento', async ({ page }) => {
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
});



test('compra de primer elemento usando placeholder y role', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

  // Login con usuario estándar
  await page.getByPlaceholder('Username').fill('standard_user');
  //vale igual page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verificar que hay productos listados
 //no funciona porque es <div class="inventory_item" const productList = page.getByTestId('inventory_item');
 //por css
  const productList = page.locator('.inventory_item');
  console.log('Lista de productos:', await productList.count());
  //mejor locator('#inventory_container .inventory_item'); el primero busca por id y el segundo es de toda la jerarquia aquel con clase inventory_item

  
  
  await expect(productList).not.toHaveCount(0);
  console.log('Lista de productos:', await productList.count());

  // Seleccionar primer producto y obtener su información
  const firstProduct = page.locator('.inventory_item').first();
  const productName = await firstProduct.locator('.inventory_item_name').textContent();
  console.log('Nombre del primer producto:', productName);
  const productPrice = await firstProduct.locator('.inventory_item_price').textContent();
  console.log('Precio del primer producto:', productPrice);


  const buttonFirstAvailable = page.locator('.inventory_item').first().getByRole('button', { name: 'Add to cart' });
  await expect(buttonFirstAvailable).toBeVisible();
  await firstProduct.getByRole('button', { name: 'Add to cart' }).click();

  // Ir al carrito
  await page.locator('.shopping_cart_link').click();

  // Verificar que hay un producto en el carrito --- todo comparar lo que se metio y lo que tengo 
  await expect(page.getByTestId('cart_item')).toBeVisible
  const productCartName =  await page.locator('.inventory_item_name').textContent();
  console.log('Nombre del producto en el carrito:', productCartName);
  const productPiceCart = await page.locator('.inventory_item_price').textContent();
  console.log('Precio del producto en el carrito:', productPiceCart);


  // Proceder al checkout
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Rellenar formulario de información
  await page.getByPlaceholder('First Name').fill('Test');
  await page.getByPlaceholder('Last Name').fill('User');
  await page.getByPlaceholder('Zip/Postal Code').fill('12345');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Finalizar compra
  await page.getByRole('button', { name: 'Finish' }).click();

  // Verificar mensaje de éxito
  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
});


test('compra random y comprobación de que lo comprado es lo mismo q lo clicado', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

  // Login con usuario estándar
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

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