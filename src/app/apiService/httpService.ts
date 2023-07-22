import { Currency } from "./model/currency.model";
import { MarketLimit } from "./model/marketLimit.model";
import { NewStock } from "./model/newStock.model";
import { SellStock } from "./model/sellStock.model";
import { Stock } from "./model/stock.model";
import { StockReference } from "./model/stockReference.model";

export async function getCurrencies(){

    const response = await fetch("https://localhost:7267/Currency");

    const value:Currency[] = await response.json();

    return value;
}

export async function getStockReferences(){

    const response = await fetch("https://localhost:7267/StockReference");

    const value:StockReference[] = await response.json();

    return value;
}

export async function addStockReference(stockReference: StockReference){

    const response = await fetch(`https://localhost:7267/StockReference`,{
        method:'POST',
        body: JSON.stringify(stockReference),
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    const value:StockReference = await response.json();

    return value;
}

export async function deleteStockReference(id:number){
 
    const response = await fetch(`https://localhost:7267/StockReference/${id}`,{
        method:'DELETE',        
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    return response.status;
}

export async function saveStock(newStock:NewStock){

    const response = await fetch(`https://localhost:7267/Stock`,{
        method:'POST',
        body: JSON.stringify(newStock),
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    const value:any = await response.json();

    return value;
}

export async function getStocks(){

    const response = await fetch("https://localhost:7267/Stock");

    const value:Stock[] = await response.json();

    return value;
}

export async function getStockById(id:number){

    const response = await fetch(`https://localhost:7267/Stock/${id}`);

    const value:Stock = await response.json();

    return value;
}

export async function sellStock(sellStock:SellStock){

    const response = await fetch(`https://localhost:7267/Stock/Sell`,{
        method:'PATCH',
        body: JSON.stringify(sellStock),
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    const value:any = await response.json();

    return value;
}

export async function updateMarketLimit(marketLimit:MarketLimit){

    const response = await fetch(`https://localhost:7267/Stock/MarketLimit`,{
        method:'PATCH',
        body: JSON.stringify(marketLimit),
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    const value:any = await response.json();

    return value;
}