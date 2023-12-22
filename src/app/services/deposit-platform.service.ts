import { DepositPlatform } from "../domain/deposit/deposit-platform.model";
import { NewDepositPlatform } from "../domain/deposit/new-deposit-platform.model";
import { get, post, remove } from "./http-client.service";

export function getAllDepositPlatforms(){
    
    return get<DepositPlatform[]>("DepositPlatform");
}

export function addDepositPlatform(depositPlatform:NewDepositPlatform){
    
    return post<any>("DepositPlatform",depositPlatform);
}

export function deleteDepositPlatform(depositPlatformId: number){
    
    return remove(`DepositPlatform/${depositPlatformId}`);
}