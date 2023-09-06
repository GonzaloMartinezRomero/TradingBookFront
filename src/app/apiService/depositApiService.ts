import { get, post, remove } from "./httpService";
import { Deposit } from "./model/deposit.model";
import { NewDeposit } from "./model/newDeposit.model";

export function getAllDeposits(){
    
    return get<Deposit[]>("Deposit");
}

export function addDeposit(deposit:NewDeposit){
    
    return post<any>("Deposit",deposit);
}

export function deleteDeposit(depositId: number){
    
    return remove(`Deposit/${depositId}`);
}