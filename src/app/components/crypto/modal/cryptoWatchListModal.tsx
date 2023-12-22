import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ErrorMessageModal, ErrorModalProps } from "../../util/errorMessageModal";
import { getCryptoCurrenciesReference } from "../../../services/crypto.service";
import { CryptoCurrencyReference } from "../../../domain/crypto/crypto-currency.model";
import { addCryptoWatch } from "../../../services/crypto-watch.service";
import { CryptoWatchSave } from "../../../domain/crypto/crypto-watch-save.model";

interface Props{
    onClose: any,
    onCloseAndReload: any
}

export function CryptoWatchListModal({ onClose, onCloseAndReload }:Props) {
  
  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});
  const [cryptoCurrencyReferenceCollection,setCryptoCurrencyReferenceCollection] = useState<CryptoCurrencyReference[]>();

  const inputTarget = useRef<HTMLInputElement>(null);  
  const inputCryptoReference = useRef<HTMLSelectElement>(null);

  useEffect(()=>{
    getCryptoCurrenciesReference().then(value=>setCryptoCurrencyReferenceCollection(value))
                                  .catch(err=>setErrorModal({isOpen:true,msg:err}));
  });
  
  function addNewCryptoWatch(){

    const newCryptoWatch:CryptoWatchSave =
    {      
      cryptoReferenceId:(inputCryptoReference.current?.value ?? "0") as unknown as number,
      target:(inputTarget.current?.value ?? "0") as unknown as number     
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
            <div className="form-group row">
            <div className="col-6">
                <label className="row">Reference</label>
                <select className="row form-select" aria-label="StockReference" ref={inputCryptoReference}>
                  <option selected>Select</option>
                  {
                    cryptoCurrencyReferenceCollection?.map((cryptoReference,index)=>
                    {
                      return (<option value={cryptoReference.id}>{cryptoReference.name}</option>);
                    })
                  }                  
                </select>
              </div>
              <div className="col-6">
                <label className="row">Target</label>
                <input type="number" className="form-control row" placeholder="Target" defaultValue={0} ref={inputTarget} />
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