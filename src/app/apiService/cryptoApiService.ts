import { get, patch, post, sendDelete } from "./httpService";
import { Amount } from "./model/amount.model";
import { CryptoCurrency } from "./model/crypto.model";
import { CryptoCurrencyReference } from "./model/cryptoCurrency.model";
import { MarketLimit } from "./model/marketLimit.model";
import { NewCrypto } from "./model/newCrypto.model";
import { SellCrypto } from "./model/sellCrypto.model";

export function getCryptoTotalEurEarned():Promise<Amount>{

    return get<Amount>(`CryptoCurrency/TotalEurEarned`);
}

export function getCryptos():Promise<CryptoCurrency[]>{

    return get<CryptoCurrency[]>("CryptoCurrency");
}

export function getCryptoById(id:number):Promise<CryptoCurrency>{

    return get<CryptoCurrency>(`CryptoCurrency/${id}`);
}

export function saveCrypto(newCrypto:NewCrypto):Promise<any>{

    return post<any>(`CryptoCurrency`,newCrypto);
}

export function deleteCrypto(id:number):Promise<boolean>{
 
    return sendDelete(`CryptoCurrency/${id}`);
}

export function deleteCryptoCurrencyReference(id:number):Promise<boolean>{
 
    return sendDelete(`CryptoCurrencyReference/${id}`);
}

export function sellCryptoCurrency(sellCrypto:SellCrypto):Promise<any>{

    return patch<any>("CryptoCurrency/Sell",sellCrypto);
}

export function checkIfCryptoRefIsAvailable(code:string):Promise<boolean>{

    return get<boolean>(`CryptoCurrencyReference/CheckIfReferenceExists?referenceCode=${code}`);
}

export function updateCryptoMarketLimit(marketLimit:MarketLimit):Promise<any>{

    return patch<any>("CryptoCurrency/MarketLimit",marketLimit);
}

export function saveCryptoCurrencyReference(cryptoReference:CryptoCurrencyReference):Promise<any>{

    return post<any>(`CryptoCurrencyReference`,cryptoReference);
}

export function getCryptoCurrenciesReference():Promise<CryptoCurrencyReference[]>{

    return get<CryptoCurrencyReference[]>(`CryptoCurrencyReference`);
}