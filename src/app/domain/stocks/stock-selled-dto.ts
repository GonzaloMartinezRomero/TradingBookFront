import { Currency } from "../currency.model";
import { StockReference } from "./stock-reference.model";

export interface StockSelledDto {
    id: number;
    stockReference: StockReference;
    price: number;
    currency: Currency;
    buyDate: string;
    amount: number;
    fee: number;
    deposit: number;
    sellDate: string;
    returnStockPrice: number;
    returnStockDiffPricePercentaje: number;
    returnFee: number;
    returnAmount: number;
    returnEarn: number;
    returnDiffAmount: number;
    returnAmountWithFee: number;
    chartReferenceUrl: string;
}