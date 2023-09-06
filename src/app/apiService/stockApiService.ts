import { get, patch, post, remove } from "./httpService";
import { MarketLimit } from "./model/marketLimit.model";
import { NewStock } from "./model/newStock.model";
import { SellStock } from "./model/sellStock.model";
import { Stock } from "./model/stock.model";
import { StockReference } from "./model/stockReference.model";

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

    return get<boolean>(`StockReference/CheckIfStockExists?referenceCode=${code}`);
}
