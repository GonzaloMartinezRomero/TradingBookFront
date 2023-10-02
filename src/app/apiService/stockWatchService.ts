import { get, post, remove } from "./httpService";
import { StockWatch } from "./model/stockWatch.model";
import { StockWatchSave } from "./model/stockWatchSave.model";

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