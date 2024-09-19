import { Currency } from "../currency.model";
import { StockTick } from "../stockTick/stock-tick.model";


export interface StockActiveDto {
    id: number;
    stockTick: StockTick;
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
    dividends: number;
    chartReferenceUrl: string;
}