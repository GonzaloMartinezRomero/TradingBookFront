
import { Deposit } from "../domain/deposit/deposit.model";
import { NewDeposit } from "../domain/deposit/new-deposit.model";
import { get, post, remove } from "./http-client.service";

export function getDeposits():Promise<Deposit[]> {

    return get<Deposit[]>("Deposit");
}

export function addDeposit(deposit:NewDeposit){
    
    return post<any>("Deposit",deposit);
}

export function deleteDeposit(depositId: number){
    
    return remove(`Deposit/${depositId}`);
}