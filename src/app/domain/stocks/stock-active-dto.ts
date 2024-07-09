import { Currency } from "../currency.model";
import { StockReference } from "./stock-reference.model";

export interface StockActiveDto {
    id: number;
    stockReference: StockReference;
    price: number;
    currency: Currency;
    buyDate: string;
    amount: number;
    fee: number;
    deposit: number;
    currentPrice: number;
    percentajeDiff: number;
    estimatedReturnPrice: number;
    estimatedEarn: number;
    recomendedAction: string;
    stopLoss: number;
    sellLimit: number;    
    sellDate: string;
    chartReferenceUrl: string;
}