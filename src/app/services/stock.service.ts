import { MarketLimit } from "../domain/market-limit.model";
import { StockTick } from "../domain/stockTick/stock-tick.model";
import { NewStock } from "../domain/stocks/new-stock.model";
import { SellStock } from "../domain/stocks/sell-stock.model";
import { StockActiveDto } from "../domain/stocks/stock-active-dto.model";
import { StockSelledDto } from "../domain/stocks/stock-selled-dto.model";

import { Stock } from "../domain/stocks/stock.model";
import { get, patch, post, remove } from "./http-client.service";

export function getStockTicks():Promise<StockTick[]>{

    return get<StockTick[]>("StockTick");
}

export function deleteStock(stockId:number):Promise<boolean>{

    return remove(`Stock/${stockId}`);
}

export function addStockReference(stockReference: StockTick):Promise<StockTick>{

    return post<StockTick>("StockReference",stockReference);
}

export function deleteStockReference(id:number): Promise<boolean>{
 
    return remove(`StockReference/${id}`);
}

export function saveStock(newStock:NewStock):Promise<any>{

    return post<any>("Stock",newStock);
}

export function getActiveStocks(): Promise<StockActiveDto[]>{

    return get<StockActiveDto[]>("Stock/Active");
}

export function getSelledStocks(): Promise<StockSelledDto[]> {

    return get<StockSelledDto[]>("Stock/Selled");
}

export function getStockById(id: number): Promise<Stock>{

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
