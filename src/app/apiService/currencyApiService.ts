import { get, post, sendDelete } from "./httpService";
import { Currency } from "./model/currency.model";

export function getCurrencies():Promise<Currency[]>{

    return get<Currency[]>("Currency");
}

export function deleteCurrency(id:number):Promise<boolean>{
 
    return sendDelete(`Currency/${id}`);
}

export function addCurrency(currency: Currency):Promise<Currency>{

    return post<Currency>("Currency",currency);
}

export function checkIfCurrencyCodeIsAvailable(code:string):Promise<boolean>{

    return get<boolean>(`Currency/CheckIfCurrencyCodeExists?currencyCode=${code}`);
}