export interface NewCrypto {
    currencyFromId: number;
    currencyToId: number;
    cryptoReferenceId: number;
    cryptoPrice: number;    
    amountInvest: number;
    feeInvest: number;
    exchangedAmount:number;
    stopLoss: number;
    sellLimit: number;
}