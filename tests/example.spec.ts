import { test, expect, Locator } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});



/**
 * va a la pagina de mercadolibre y hace 
 */

test('mi primer test partiendo del ejemplo', async ({ page }) => {
  await page.goto('https://mercadolibre.com.co');

  await expect(page).toHaveTitle(/Mercado Libre/);  

  await page.locator('input[id=\'cb1-edit\']').fill('Iphone');
 // await page.waitForTimeout(3000);
  await page.keyboard.press('Enter');
  //  //ol[contains(@class,\'ui-search-layout\')]
  // await page.waitForTimeout(5000); visibilidad de la lista de resultados
  await expect(page.locator('//ol[contains(@class,\'ui-search-layout\')]')).toBeVisible();
  page.pause()


  //obteniendo los textos con xpath y lo almacenamos en un array constante
  const titulos_xpath= await page.locator('//ol[contains(@class,\'ui-search-layout\')]//a[contains(@class,\'poly-component__title\')]').allInnerTexts()
  console.log(titulos_xpath);

  for(let i = 0; i < titulos_xpath.length; i++) {
    console.log(`Titulo obtenido ${i + 1}: ${titulos_xpath[i]}`);
  }
  console.log("Total de titulos obtenidos: " + titulos_xpath.length);

  //usando selector css 
  const selectorCss = "ol.ui-search-layout a.poly-component__title"
  let titulos_elements:Locator = page.locator(selectorCss);
  let listado_titulos:string[] = await titulos_elements.allTextContents();
  console.log("Listado de titulos obtenidos con selector css: ", listado_titulos);

  for(let i = 0; i < listado_titulos.length; i++) {
    console.log(`Titulo obtenido con selector css ${i + 1}: ${listado_titulos[i]}`);
  }
  console.log("Total de titulos obtenidos con selector css: " + listado_titulos.length);

  console.log("Finalizando el test...comparativa de titulos obtenidos con xpath y selector css"+ titulos_xpath.length+"--- "+listado_titulos.length);
  


  //await page.locator('input[id=\'cb1-edit\']').press('Enter');

  /* // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible(); */
});


test('analisis pagina Alten', async ({ page }) => {
  await page.goto('https://www.alten.es');

  await expect(page).toHaveTitle(/Home - ALTEN Spain/);  


  
});