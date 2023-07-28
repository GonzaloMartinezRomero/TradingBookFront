import { Currency } from "./currency.model";
import { StockReference } from "./stockReference.model";

export interface Stock{
    id: number;
    stockReference:StockReference;
    price:number;
    currency:Currency;
    buyDate:string;
    amount:number;
    fee:number;
    deposit:number;
    currentPrice:number;
    percentajeDiff: number;
    recomendedAction: string;
    stopLoss: number;
    sellLimit: number;
    isSelled: boolean;
    sellDate: string;
    returnStockPrice: number;
    returnStockDiffPricePercentaje: number;
    returnFee: number;
    returnAmount: number;
    returnEarn: number;
    returnDiffAmount: number;
    returnAmountWithFee: number;
}