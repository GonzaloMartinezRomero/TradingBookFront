import { Currency } from "../currency.model";
import { StockTick } from "../stockTick/stock-tick.model";


export interface Stock{
    id: number;
    stockTick:StockTick;
    price:number;
    currency:Currency;
    buyDate:string;
    amount:number;
    fee:number;
    deposit:number;   
    chartReferenceUrl: string;
}