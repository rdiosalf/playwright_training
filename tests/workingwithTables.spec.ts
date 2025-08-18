import { test, expect, Locator } from '@playwright/test';
import { TableUtils } from './utils/TableUtils';

//cosmocode.io/automation-practice-webtable
test("test de una web table", async ({ page }) => {


await page.goto('https://cosmocode.io/automation-practice-webtable/');    
const tableContaier = await page.locator("xpath=" + "//table[@id='countries']");

//busqueda no en todo el dom sino dentro del container
const rows = await tableContaier.locator("xpath=.//tr").all()
const rowCount =  rows.length
console.log('Total de filas en la table rowCount',rowCount);
for (let row of rows ){//imprime el texto de cada fila 
   console.log('---'+await row.innerText())
}
console.log("---------------------------")



//extraccion primer dato 
const row1= rows.at(1)
const countryName =await row1?.locator('xpath=.//td[2]').innerText()
const countryCapital =await row1?.locator('xpath=.//td[3]').innerText()
const coin =await row1?.locator('xpath=.//td[4]').innerText()
const lang =await row1?.locator('xpath=.//td[5]').innerText()

console.log("Datos pais "+countryName,countryCapital,coin,lang)
console.log("---------------------------")
//creando interface de representacion minima que es el pais 
interface Country{
  name:string
  capital:string
  coin:string
  lang:string
  //amount:number
}

const countries:Country[]=[]//inicializado a vacio 
console.log("Aqui lista de paises aun no tiene valor "+countries)

for (let row of rows){
  //creacion de un objeto del itfz con valores en bucle
  let country:Country={
    name: await row.locator('xpath=.//td[2]').innerText(),
    capital: await row.locator('xpath=.//td[3]').innerText(),
    coin: await row.locator('xpath=.//td[4]').innerText(),
    lang: await row.locator('xpath=.//td[5]').innerText()
  } //tendre una lista de objetos de ese tipo itf por cada uno de los countries
  //en el bucle doy valor la constante countries de tipo 
  // Country[] que puse arriba inicialmente vacia, es decir voy rellenando la lista
  countries.push(country)
}

console.log("Aqui la lista de paises ya tiene valor ")

for(let infoEachCountry of countries){
  console.log(infoEachCountry);
}

//busqueda de uno determinado
const countriesWherePeopleSpeakPortuguese = countries.filter(object => object.lang==="Portuguese");
console.log("--------------------\nPaises habla portuguesa "+countriesWherePeopleSpeakPortuguese);
console.log("Paises habla portuguesa (cantidad) "+countriesWherePeopleSpeakPortuguese.length);

});

//cosmocode.io/automation-practice-webtable
// Ejemplo de test más específico
test("Verificar países que hablan portugues", async ({ page }) => {
    await page.goto('https://cosmocode.io/automation-practice-webtable/');
    
    const tableUtils = new TableUtils(page);
    await tableUtils.initialize();
    
    const portuguesespeakingCountries = tableUtils.getCountriesWhereSpeak("Portuguese");
    
    // Verificaciones con expect
    expect(portuguesespeakingCountries.length).toBeGreaterThan(0);
    expect(portuguesespeakingCountries.some(country => country.name === "Portugal")).toBe(true);
});