export interface UpdateSelledStock{
    stockTickId: number;
    price: number;
    currencyId: number;
    amount: number;
    fee: number;
    returnStockPrice: number;
    returnFee: number;
    returnAmount: number;
    dividends: number;
}