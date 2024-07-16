export interface CryptoActiveDto{
    id: number,
    cryptoCurrencyFrom: string,
    cryptoCurrencyTo: string,
    cryptoReference: string,
    amountInvest: number,
    feeInvest: number,
    cryptoPrice: number,
    buyDate: string,
    deposit:number
    exchangedAmount: number,
    currentPrice?: number,
    currentDiffPercentage?: number,
    estimatedReturnPrice: number,
    estimatedEarn: number,
    recomendedAction: string,
    stopLoss: number,
    sellLimit: number
}