
import { DepositType } from "../domain/deposit/deposit-type.model";
import { Deposit } from "../domain/deposit/deposit.model";
import { NewDeposit } from "../domain/deposit/new-deposit.model";
import { get, post, remove } from "./http-client.service";

export function getDeposits(depositType: DepositType):Promise<Deposit[]> {

    switch (depositType) {
        case DepositType.Stock:
            return get<Deposit[]>("Deposit?platformId=1");
         
        case DepositType.Crypto:
            return get<Deposit[]>("Deposit?platformId=2");
            
        default:
            return new Promise<Deposit[]>(() => []);
    }
}

export function addDeposit(deposit:NewDeposit){
    
    return post<any>("Deposit",deposit);
}

export function deleteDeposit(depositId: number){
    
    return remove(`Deposit/${depositId}`);
}