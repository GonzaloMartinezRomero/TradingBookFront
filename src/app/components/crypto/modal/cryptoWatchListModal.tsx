import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CryptoCurrencyReference } from "../../../domain/crypto/crypto-currency.model";
import { CryptoWatchSave } from "../../../domain/crypto/crypto-watch-save.model";
import { addCryptoWatch } from "../../../services/crypto-watch.service";
import { getCryptoCurrenciesReference } from "../../../services/crypto.service";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";
import { DropDownInput, DropDownValue } from "../../util/dropdown.input.component";
import { DecimalInput } from "../../util/decimal.input.component";

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
    getCryptoCurrenciesReference().then(value=>setCryptoCurrencyReferenceCollection(value))
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
          <button className="btn btn-secondary p-1 m-1" style={{"width":"32px","height":"33px"}} onClick={onClose}>
            <i className="bi-x"/>
          </button>
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
                        <DecimalInput onChangeValue={(val: number) => { cryptoTarget = val; }}></DecimalInput>
              </div>
            </div>          
          </div>       
          <div className="form-group row mt-2">            
            <div className="form-group col-12">
              <button className="btn btn-success" style={{ "width": "130px", "height": "50px" }} onClick={()=>addNewCryptoWatch()}>Add</button>
            </div>
          </div>
        </div>,document.body)}
        </>
  );
}