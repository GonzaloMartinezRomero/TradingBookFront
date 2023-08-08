export interface NewCrypto{
    cryptoCurrencyReferenceFromId: number;
    cryptoCurrencyReferenceToId: number;
    cryptoPrice: number;    
    amountInvest: number;
    feeInvest: number;
    exchangedAmount:number;
    stopLoss: number;
    sellLimit: number;
}