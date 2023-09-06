import { get, post, remove } from "./httpService";
import { DepositPlatform } from "./model/depositPlatform.model";
import { NewDepositPlatform } from "./model/newDepositPlatform.model";

export function getAllDepositPlatforms(){
    
    return get<DepositPlatform[]>("DepositPlatform");
}

export function addDepositPlatform(depositPlatform:NewDepositPlatform){
    
    return post<any>("DepositPlatform",depositPlatform);
}

export function deleteDepositPlatform(depositPlatformId: number){
    
    return remove(`DepositPlatform/${depositPlatformId}`);
}