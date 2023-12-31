import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ErrorMessageModal, ErrorModalProps } from "../../util/errorMessageModal";
import { CryptoCurrencyReference } from "../../../domain/crypto/crypto-currency.model";
import { checkIfCryptoRefIsAvailable, deleteCryptoCurrencyReference, getCryptoCurrenciesReference, saveCryptoCurrencyReference } from "../../../services/crypto.service";
import { InformationMessageModal, InformationModalProps } from "../../util/informationMessageModal";
import { Loading } from "@nextui-org/react";

interface Props{
    onClose: any    
}

export function CryptoReferenceModal({ onClose }:Props) {

    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [informationModal, setInformationModal] = useState<InformationModalProps>({ isOpen: false });
  const [cryptoCurrencyReferenceCollection,setCryptoCurrencyReferenceCollection] = useState<CryptoCurrencyReference[]>();
  const [isCryptoCodeAvailable,setIsCryptoCodeAvailable] = useState<boolean | undefined>(undefined);
  const inputName = useRef<HTMLInputElement>(null);
  const inputCode = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    updateCryptoCurrencies();
  },[]);


  function saveCryptoReference(){

    const name = inputName.current?.value as string;
    const code = inputCode.current?.value as string;

    const cryptoRef:CryptoCurrencyReference = {
      id:0,
      code:code,
      name:name
    };

      saveCryptoCurrencyReference(cryptoRef).then((value) =>
      {
          setInformationModal({ isOpen: true, msg: "Crypto added successfully!" });
          updateCryptoCurrencies();
      }).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function checkIfCodeIsAvailable(){
      setShowSpinner(true);
      setIsCryptoCodeAvailable(undefined);
      const code = inputCode.current?.value as string;
    checkIfCryptoRefIsAvailable(code).then(response=>setIsCryptoCodeAvailable(response))
        .catch(err => setErrorModal({ isOpen: true, msg: err }))
        .finally(() => setShowSpinner(false));
  }
   
  function updateCryptoCurrencies(){
    getCryptoCurrenciesReference().then(value=>setCryptoCurrencyReferenceCollection(value))
                                  .catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function deleteCryptoRef(id:number){
    deleteCryptoCurrencyReference(id).then((value)=>updateCryptoCurrencies())
                                    .catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  return (<>
      {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}
      {informationModal.isOpen && <InformationMessageModal msg={informationModal.msg} onClose={onClose} />}
    {createPortal(     
        <div className="new-crypto-modal">
          <div className="d-flex flex-row-reverse">
          <button className="btn btn-secondary p-1 m-1" style={{"width":"32px","height":"33px"}} onClick={onClose}>
            <i className="bi-x"/>
          </button>
          </div>
          <h2>Crypto Reference</h2>
          <div className="form-group row ms-4">
            <div className="col-10">
              <label className="row">Name</label>
              <input type="text" className="row form-control" placeholder="Name" ref={inputName} />              
            </div>
          </div>
          <div className="form-group row mt-2 ms-4">
            <div className="col-10">
              <label className="row">Code</label>
              <input type="text" className="row form-control" placeholder="Code" ref={inputCode} />              
            </div>
          </div>        
          <div className="form-group row mt-3 ms-1">
            <div className="col-5">
              <button className="btn btn-info row" onClick={()=>checkIfCodeIsAvailable()}>Check Availability</button>             
            </div>          
            <div className="col-1">
              {showSpinner && <div className="row"><Loading /></div>}
              {isCryptoCodeAvailable == true && <span className="row bi bi-file-earmark-check" style={{"fontSize":"35px"}} title="Available"/>}
              {isCryptoCodeAvailable == false &&  <span className="row bi bi-file-earmark-x" style={{"fontSize":"35px"}} title="No Available"/>}             
            </div>
          </div>         
          <div className="form-group row mt-3 mb-3">                        
            <div className="form-group col-12">
              <button className="btn btn-success" 
                      style={{"width":"100px","height":"40px"}}
                      onClick={()=>{saveCryptoReference();}}>                
                Add
                </button>
            </div>
          </div>
          <div className="m-1" style={{"maxHeight":"200px","overflowY":"auto"}}>                                  
            <table className="table table-bordered table-striped" >
              <thead>
                <tr className="table-secondary table-group-divider">
                  <th>Name</th>
                  <th>Code</th>
                  <th>Tool</th>
                </tr>
              </thead>
              <tbody style={{"opacity":"0.9"}}>
                {
                  cryptoCurrencyReferenceCollection?.map((value,index)=>{
                      return (
                        <tr>
                          <td>
                           <span>{value.name}</span>
                          </td>
                          <td>
                            <span>{value.code}</span>
                          </td>
                          <td>
                            <button className="btn btn-danger"  onClick={()=>{deleteCryptoRef(value.id)}} ><i className="bi bi-trash3"></i></button>
                          </td>
                        </tr>
                      );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>,
      document.body)}
      </>
  );
}