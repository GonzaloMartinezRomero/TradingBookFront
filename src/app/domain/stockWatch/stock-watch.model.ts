export interface StockWatch{
    id:number;
    stock: string,
    stockTickId:number,
    currency: string,
    currencyId:number,
    target: number,
    current: number,
    diff: number,
    recomendedAction: string,
    chartReferenceUrl: string
}