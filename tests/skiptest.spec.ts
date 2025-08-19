import { test, expect, Locator } from '@playwright/test';


test('skip test with a condition', async ({ page }) => {
  if(process.env.SKIP_TEST === 'true') {
    test.skip()
  } else {
  await page.goto(process.env.URL); 
  console.log('valor de la variable texto en el entorno', process.env.texto); 
  console.log('valor de la variable skip_test en el entorno', process.env.SKIP_TEST); 
  //await page.pause(); // Pausa para inspeccionar la página
  await expect(page).toHaveTitle(/Swag Labs/); // Verificar que el
  }

});

