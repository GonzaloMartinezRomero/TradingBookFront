export interface CryptoCurrency{
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
    estimatedReturnPrice:number,
    recomendedAction: string,
    isSelled: boolean,
    returnPrice: number,
    returnDiffPricePercentage: number,
    sellDate: string,
    returnAmount: number,
    returnFee: number,
    returnAmountWithFee: number,
    returnEarn: number,
    estimatedEarn: number;
    returnDiffAmountEarnedPercentage: number,
    stopLoss: number,
    sellLimit: number
}