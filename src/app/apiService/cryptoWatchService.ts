import { get, post, remove } from "./httpService";
import { CryptoWatch } from "./model/cryptoWatch.model";
import { CryptoWatchSave } from "./model/cryptoWatchSave.model";

const endpoint:string = "CryptoWatcher";

export function getCryptoWatchs():Promise<CryptoWatch[]>{

    return get<CryptoWatch[]>(endpoint);
}

export function deleteCryptokWatch(cryptoWatchId:number):Promise<boolean>{

    return remove(`${endpoint}/${cryptoWatchId}`);
}

export function addCryptoWatch(cryptoWatchSave: CryptoWatchSave):Promise<number>{

    return post<number>(endpoint,cryptoWatchSave);
}