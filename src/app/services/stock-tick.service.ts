import { StockTick } from "../domain/stockTick/stock-tick.model";
import { get, patch, post, remove } from "./http-client.service";

const endpoint: string = "StockTick";

export function getStockTicks(): Promise<StockTick[]>{

    return get<StockTick[]>(endpoint);
}

export function saveStockTick(stockTick:StockTick): Promise<number> {

    return post<number>(endpoint, stockTick);
}

export function isStockTickAvailable(tick: string): Promise<boolean> {

    var queryParam: string = `${endpoint}/isAvailable?tick=${tick}`;

    return get<boolean>(queryParam);
}

export function updateStockTick(stockTick: StockTick): Promise<number> {

    var queryParam: string = `${endpoint}/${stockTick.id}`;

    return patch<number>(queryParam, stockTick);
}

export function deleteStockTick(stockTickId: number): Promise<any> {

    var queryParam: string = `${endpoint}/${stockTickId}`;

    return remove(queryParam);
}

