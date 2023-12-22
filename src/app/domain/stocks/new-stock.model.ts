export interface NewStock{
    stockReferenceId: number;
    price: number;
    currencyId: number;
    amount: number;
    fee: number;
    stopLoss: number;
    sellLimit: number;
}