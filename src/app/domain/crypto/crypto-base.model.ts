export interface CryptoBaseDto {
    id: number,
    cryptoCurrencyFrom: string,
    cryptoCurrencyTo: string,
    cryptoReference: string,
    amountInvest: number,
    feeInvest: number,
    cryptoPrice: number,
    deposit: number,
    buyDate: string,
    exchangedAmount: number
}