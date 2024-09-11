import { Currency } from "../domain/currency.model";
import { get, post, remove } from "./http-client.service";
export function getCurrencies():Promise<Currency[]>{

    return get<Currency[]>("Currency");
}

export function deleteCurrency(id:number):Promise<boolean>{
 
    return remove(`Currency/${id}`);
}

export function addCurrency(currency: Currency):Promise<Currency>{

    return post<Currency>("Currency",currency);
}

export function checkIfCurrencyCodeIsAvailable(code:string):Promise<boolean>{

    return get<boolean>(`Currency/IsAvailable?currencyCode=${code}`);
}