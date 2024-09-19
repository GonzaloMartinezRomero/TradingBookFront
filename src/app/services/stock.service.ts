import { MarketLimit } from "../domain/market-limit.model";
import { NewStock } from "../domain/stocks/new-stock.model";
import { SellStock } from "../domain/stocks/sell-stock.model";
import { StockActiveDto } from "../domain/stocks/stock-active-dto.model";
import { StockFind } from "../domain/stocks/stock-find.model";
import { StockSelledDto } from "../domain/stocks/stock-selled-dto.model";
import { UpdateActiveStock } from "../domain/stocks/update-active-stock.model";
import { UpdateSelledStock } from "../domain/stocks/update-selled-stock.model";

import { get, patch, post, remove } from "./http-client.service";


const endpoint: string = "Stock";

export function deleteStock(stockId:number):Promise<boolean>{

    return remove(`${endpoint}/${stockId}`);
}

export function saveStock(newStock:NewStock):Promise<any>{

    return post<any>(endpoint, newStock);
}

export function updateActiveStock(stockId:number, updatedStock: UpdateActiveStock): Promise<number> {

    return patch<number>(`${endpoint}/Active/${stockId}`, updatedStock);
}

export function updateSelledStock(stockId: number, updatedStock: UpdateSelledStock): Promise<number> {

    return patch<number>(`${endpoint}/Selled/${stockId}`, updatedStock);
}

export function getActiveStocks(): Promise<StockActiveDto[]>{

    return get<StockActiveDto[]>(`${endpoint}/Active`);
}

export function getSelledStocks(): Promise<StockSelledDto[]> {

    return get<StockSelledDto[]>(`${endpoint}/Selled`);
}

export function getStockById(id: number): Promise<StockFind>{

    return get<StockFind>(`${endpoint}/${id}`);
}

export function sellStock(sellStock:SellStock):Promise<any>{

    return patch<any>(`${endpoint}/Sell`,sellStock);
}

export function updateStockMarketLimit(marketLimit:MarketLimit):Promise<any>{

    return patch<any>(`${endpoint}/MarketLimit`,marketLimit);
}

export function addDividend(stockId:number, amount:number): Promise<any> {

    var amountObj = { "amount": amount };

    return patch<any>(`${endpoint}/${stockId}/Dividend`, amountObj);
}