import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CryptoCurrencyReference } from "../../../domain/crypto/crypto-currency.model";
import { CryptoWatchSave } from "../../../domain/crypto/crypto-watch-save.model";
import { addCryptoWatch } from "../../../services/crypto-watch.service";
import { getCryptoReference } from "../../../services/crypto.service";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";
import { DropDownInput, DropDownValue } from "../../util/dropdown.input.component";
import { NumberDecimalInput } from "../../util/number-decimal.input.component";
import { ButtonCustom, ButtonType } from "../../util/button.component";


interface Props{
    onClose: any,
    onCloseAndReload: any
}

export function CryptoWatchListModal({ onClose, onCloseAndReload }:Props) {
  
  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});
  const [cryptoCurrencyReferenceCollection,setCryptoCurrencyReferenceCollection] = useState<CryptoCurrencyReference[]>();

    const cryptoCurrencyOptions: DropDownValue[] | undefined = cryptoCurrencyReferenceCollection?.map((cryptoCurrencyAux) => { return { value: cryptoCurrencyAux.id, label: cryptoCurrencyAux.name } as DropDownValue });

    var cryptoCurrencyId: number = 0;
    var cryptoTarget: number = 0;
    

  useEffect(()=>{
    getCryptoReference().then(value=>setCryptoCurrencyReferenceCollection(value))
                                  .catch(err=>setErrorModal({isOpen:true,msg:err}));
  },[]);
  
  function addNewCryptoWatch(){

    const newCryptoWatch:CryptoWatchSave =
    {      
        cryptoReferenceId: cryptoCurrencyId,
        target: cryptoTarget
    }

    addCryptoWatch(newCryptoWatch).then(value=>onCloseAndReload()).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  return (
    <>
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    { createPortal(
       
        <div className="new-crypto-watch-modal">
            <div className="d-flex flex-row-reverse">
                <ButtonCustom btnType={ButtonType.Close} onClick={ onClose }/>
          </div>
          <h1>Add Crypto Watch</h1>
            <div className="m-4">
                <div className="form-group row" style={{ "textAlign":"left"}}>
            <div className="col-6">
                <label>Crypto Pair</label>
                <DropDownInput values={cryptoCurrencyOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => cryptoCurrencyId = valueSelected.value}></DropDownInput>
              </div>
              <div className="col-6">
                <label>Target</label>
                <NumberDecimalInput onChangeValue={(val: number) => { cryptoTarget = val; }}></NumberDecimalInput>
              </div>
            </div>          
          </div>       
          <div className="form-group row mt-2">            
                <div className="form-group col-12">
                <ButtonCustom btnType={ButtonType.Add} onClick={() => addNewCryptoWatch()} />              
            </div>
          </div>
        </div>,document.body)}
        </>
  );
}