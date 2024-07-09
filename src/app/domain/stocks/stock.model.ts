import { Currency } from "../currency.model";
import { StockReference } from "./stock-reference.model";

export interface Stock{
    id: number;
    stockReference:StockReference;
    price:number;
    currency:Currency;
    buyDate:string;
    amount:number;
    fee:number;
    deposit:number;   
    chartReferenceUrl: string;
}