export interface CryptoSelledDto {
    id: number,
    cryptoCurrencyFrom: string,
    cryptoCurrencyTo: string,
    cryptoReference: string,
    amountInvest: number,
    feeInvest: number,
    cryptoPrice: number,
    deposit: number,
    buyDate: string,
    exchangedAmount: number,    
    returnPrice: number,
    returnDiffPricePercentage: number,
    sellDate: string,
    returnAmount: number,
    returnFee: number,
    returnAmountWithFee: number,
    returnEarn: number,
    estimatedEarn: number;
    returnDiffAmountEarnedPercentage: number,
}