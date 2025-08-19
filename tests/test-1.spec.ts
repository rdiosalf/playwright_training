import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.alten.es/');
  await page.getByRole('button', { name: 'Cookies : Aceptar' }).click();
  await page.getByRole('button', { name: '', exact: true }).click();
  await page.locator('#header-toolbar-2').getByRole('textbox').fill('consultoria');
  await page.locator('#header-toolbar-2').getByRole('textbox').press('Enter');
  //await page.getByRole('button', { name: 'Todos los resultados' }).click();
});