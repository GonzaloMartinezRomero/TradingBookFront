import { MarketLimit } from "../domain/market-limit.model";
import { NewStock } from "../domain/stocks/new-stock.model";
import { SellStock } from "../domain/stocks/sell-stock.model";
import { StockActiveDto } from "../domain/stocks/stock-active-dto.model";
import { StockSelledDto } from "../domain/stocks/stock-selled-dto.model";

import { Stock } from "../domain/stocks/stock.model";
import { get, patch, post, remove } from "./http-client.service";


const endpoint: string = "Stock";

export function deleteStock(stockId:number):Promise<boolean>{

    return remove(`${endpoint}/${stockId}`);
}

export function saveStock(newStock:NewStock):Promise<any>{

    return post<any>(endpoint, newStock);
}

export function getActiveStocks(): Promise<StockActiveDto[]>{

    return get<StockActiveDto[]>(`${endpoint}/Active`);
}

export function getSelledStocks(): Promise<StockSelledDto[]> {

    return get<StockSelledDto[]>(`${endpoint}/Selled`);
}

export function getStockById(id: number): Promise<Stock>{

    return get<Stock>(`${endpoint}/${id}`);
}

export function sellStock(sellStock:SellStock):Promise<any>{

    return patch<any>(`${endpoint}/Sell`,sellStock);
}

export function updateStockMarketLimit(marketLimit:MarketLimit):Promise<any>{

    return patch<any>(`${endpoint}/MarketLimit`,marketLimit);
}