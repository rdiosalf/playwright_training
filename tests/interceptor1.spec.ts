import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';



test('inicio interceptor demoqa books ', async ({ page }) => {
//request de llamada a mostrar los libros https://demoqa.com/BookStore/v1/Books
/*

de la inspeccion de chrome 

Request URL
https://demoqa.com/BookStore/v1/Books
Request Method
GET
Status Code
304 Not Modified
Remote Address
176.58.101.124:443
Referrer Policy
strict-origin-when-cross-origin


*/
await page.route ("https://demoqa.com/BookStore/v1/Books", route => {
  route.fulfill({
    status: 304,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }, 
    body: 
    `{
    "books": [
        {
            "isbn": "9781449325862",
            "title": "titulo de libro cambiado",
            "subTitle": "A Working Introduction",
            "author": "Richard E. Silverman",
            "publish_date": "2020-06-04T08:48:39.000Z",
            "publisher": "O'Reilly Media",
            "pages": 0,
            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
        }
    ]
}`
  })      //modify the request
});






  await page.goto('https://demoqa.com/books');


  await page.screenshot({ path: 'screenshots/librdespues.png' }); //libro después

});


