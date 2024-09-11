import { StockWatchSave } from "../domain/stockWatch/stock-watch-save.model";
import { StockWatch } from "../domain/stockWatch/stock-watch.model";
import { get, post, remove } from "./http-client.service";

const endpoint:string = "StockWatcher";

export function getStockWatchs():Promise<StockWatch[]>{

    return get<StockWatch[]>(endpoint);
}

export function deleteStockWatch(stockWatchId:number):Promise<boolean>{

    return remove(`${endpoint}/${stockWatchId}`);
}

export function addStockWatchReference(stockReference: StockWatchSave):Promise<number>{

    return post<number>(endpoint,stockReference);
}