import { CryptoActiveDto } from "../domain/crypto/crypto-active.model";
import { CryptoBaseDto } from "../domain/crypto/crypto-base.model";
import { CryptoCurrencyReference } from "../domain/crypto/crypto-currency.model";
import { CryptoSelledDto } from "../domain/crypto/crypto-selled.model";
import { NewCrypto } from "../domain/crypto/new-crypto.model";
import { SellCryptoDto } from "../domain/crypto/sell-crypto.model";
import { MarketLimit } from "../domain/market-limit.model";
import { get, patch, post, remove } from "./http-client.service";

export function getActiveCryptos():Promise<CryptoActiveDto[]>{

    return get<CryptoActiveDto[]>("Crypto/Active");
}

export function getSelledCryptos(): Promise<CryptoSelledDto[]> {

    return get<CryptoSelledDto[]>("Crypto/Selled");
}


export function getCryptoById(id: number): Promise<CryptoBaseDto>{

    return get<CryptoBaseDto>(`Crypto/${id}`);
}

export function saveCrypto(newCrypto:NewCrypto):Promise<any>{

    return post<any>(`Crypto`,newCrypto);
}

export function deleteCrypto(id:number):Promise<boolean>{
 
    return remove(`Crypto/${id}`);
}

export function deleteCryptoReference(id:number):Promise<boolean>{
 
    return remove(`CryptoReference/${id}`);
}

export function sellCrypto(sellCrypto:SellCryptoDto):Promise<any>{

    return patch<any>("Crypto/Sell",sellCrypto);
}

export function checkIfCryptoRefIsAvailable(code:string):Promise<boolean>{

    return get<boolean>(`CryptoReference/CheckIfReferenceIsAvailable?referenceCode=${code}`);
}

export function updateCryptoMarketLimit(marketLimit:MarketLimit):Promise<any>{

    return patch<any>("Crypto/MarketLimit",marketLimit);
}

export function saveCryptoReference(cryptoReference:CryptoCurrencyReference):Promise<any>{

    return post<any>(`CryptoReference`,cryptoReference);
}

export function getCryptoReference():Promise<CryptoCurrencyReference[]>{

    return get<CryptoCurrencyReference[]>(`CryptoReference`);
}