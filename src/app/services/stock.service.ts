import { MarketLimit } from "../domain/market-limit.model";
import { NewStock } from "../domain/stocks/new-stock.model";
import { SellStock } from "../domain/stocks/sell-stock.model";
import { StockReference } from "../domain/stocks/stock-reference.model";
import { Stock } from "../domain/stocks/stock.model";
import { get, patch, post, remove } from "./http-client.service";

export function getStockReferences():Promise<StockReference[]>{

    return get<StockReference[]>("StockReference");
}

export function deleteStock(stockId:number):Promise<boolean>{

    return remove(`Stock/${stockId}`);
}

export function addStockReference(stockReference: StockReference):Promise<StockReference>{

    return post<StockReference>("StockReference",stockReference);
}

export function deleteStockReference(id:number): Promise<boolean>{
 
    return remove(`StockReference/${id}`);
}

export function saveStock(newStock:NewStock):Promise<any>{

    return post<any>("Stock",newStock);
}

export function getStocks():Promise<Stock[]>{

    return get<Stock[]>("Stock");
}

export function getStockById(id:number):Promise<Stock>{

    return get<Stock>(`Stock/${id}`);
}

export function sellStock(sellStock:SellStock):Promise<any>{

    return patch<any>("Stock/Sell",sellStock);
}

export function updateStockMarketLimit(marketLimit:MarketLimit):Promise<any>{

    return patch<any>("Stock/MarketLimit",marketLimit);
}

export function checkIfStockCodeIsAvailable(code:string):Promise<boolean>{

    return get<boolean>(`StockReference/CheckIfStockIsAvailable?referenceCode=${code}`);
}
