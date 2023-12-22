export interface StockWatch{
    id:number;
    stock: string,
    currency: string,
    target: number,
    current: number,
    diff: number,
    recomendedAction: string,
    chartReferenceUrl: string
}