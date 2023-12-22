import { CryptoWatchSave } from "../domain/crypto/crypto-watch-save.model";
import { CryptoWatch } from "../domain/crypto/crypto-watch.model";
import { get, post, remove } from "./http-client.service";

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