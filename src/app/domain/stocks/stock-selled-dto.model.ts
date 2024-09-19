import { Currency } from "../currency.model";
import { StockTick } from "../stockTick/stock-tick.model";


export interface StockSelledDto {
    id: number;
    stockTick: StockTick;
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
    dividends: number;
    chartReferenceUrl: string;
}