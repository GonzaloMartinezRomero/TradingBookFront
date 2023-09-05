import { get, post } from "./httpService";
import { Amount } from "./model/amount.model";

export function getDeposit(){

    return get<Amount>("Deposit/TotalDeposit");
}

export function addAmountToDeposit(amount:number){
    
    return post<any>(`https://localhost:7267/Deposit/AddDeposit?amount=${amount}`,null);
}