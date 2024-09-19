export interface StockFind {
    id: number;
    stockTickId: number;
    currencyId: number;
    price: number;
    amount: number;
    fee: number;
    deposit: number;
    returnStockPrice: number;
    returnFee: number;
    returnAmount: number;
    dividends: number;
}