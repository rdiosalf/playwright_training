import { Locator, Page } from "@playwright/test";
import { it } from "node:test";

interface Country {
    name: string;
    capital: string;
    coin: string;
    lang: string;
}


export class TableUtils {// Elementos de la página de login

  private readonly containerTable: Locator;
    private allRows: Locator[];
    private countries: Country[] = []; // Array de países inicializado

    constructor(private page: Page) {
        this.containerTable = page.locator("xpath=" + "//table[@id='countries']");
        this.allRows = [];
    }



   // Método de inicialización asíncrona que debe ser llamado después del constructor
    async initialize(): Promise<void> {
        await this.getAllRows();
        await this.generateDataModel();
    }

    private async getAllRows(): Promise<void> {
        this.allRows = await this.containerTable.locator("xpath=.//tr").all();
    }



    getRowCount(): number {
        return this.allRows.length
    }

    async printAllRows() {
        for (let row of this.allRows) {//imprime el texto de cada fila 
            console.log('---' + await row.innerText())
        }

    }

    printRowInfo(item: number) {
        if (item <= 1 || item > this.allRows.length) {
            console.log("No es posible obtener datos del pais en posicio " + item)
        } else {
            const rowItem = this.allRows.at(item)
            const countryName =  rowItem?.locator('xpath=.//td[2]').innerText()
            const countryCapital =  rowItem?.locator('xpath=.//td[3]').innerText()
            const coin =  rowItem?.locator('xpath=.//td[4]').innerText()
            const lang =  rowItem?.locator('xpath=.//td[5]').innerText()

            console.log("Datos pais en posicion "+item+"\n" + countryName, countryCapital, coin, lang)
        }


    }

      private async generateDataModel(): Promise<void> {
        console.log("Generando modelo de datos de países...");
        
        for (let row of this.allRows) {
            // Saltamos la primera fila si es un header
            const isHeaderRow = await row.locator('th').count() > 0;
            if (isHeaderRow) continue;

            const country: Country = {
                name: await row.locator('xpath=.//td[2]').innerText(),
                capital: await row.locator('xpath=.//td[3]').innerText(),
                coin: await row.locator('xpath=.//td[4]').innerText(),
                lang: await row.locator('xpath=.//td[5]').innerText()
            };
            
            this.countries.push(country);
        }
        
        console.log(`Se han cargado ${this.countries.length} países`);
    }



   

getCountriesWhereSpeak(lang:string):Country[]{
    //busqueda de uno determinado
const countriesWherePeopleSpeakPortuguese = this.countries.filter(object => object.lang === lang)
console.log("--------------------\nPaises habla portuguesa " + countriesWherePeopleSpeakPortuguese)
console.log("Paises habla portuguesa (cantidad) " + countriesWherePeopleSpeakPortuguese.length)
return countriesWherePeopleSpeakPortuguese
}

getCountriesWhereCapital(capital:string):Country[]{
    return this.countries.filter(obj => obj.capital.toLowerCase().includes(capital.toLowerCase()))
}






}