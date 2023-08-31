import { checkIfCryptoRefIsAvailable, deleteCryptoCurrencyReference, getCryptoCurrenciesReference, saveCryptoCurrencyReference } from "@/app/apiService/httpService";
import { CryptoCurrencyReference } from "@/app/apiService/model/cryptoCurrency.model";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props{
    onClose: any    
}

export function CryptoReferenceModal({ onClose }:Props) {

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

    saveCryptoCurrencyReference(cryptoRef).then((value)=>updateCryptoCurrencies());
  }

  function checkIfCodeIsAvailable(){
    const code = inputCode.current?.value as string;
    checkIfCryptoRefIsAvailable(code).then(response=>{      
      setIsCryptoCodeAvailable(response);
    });
  }
   
  function updateCryptoCurrencies(){
    getCryptoCurrenciesReference().then(value=>{setCryptoCurrencyReferenceCollection(value);});
  }

  function deleteCryptoRef(id:number){
    deleteCryptoCurrencyReference(id).then((value)=>updateCryptoCurrencies());
  }

  return (
    createPortal(
      <>
        <div className="new-asset-modal">
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
            <div className="col-5">
              {isCryptoCodeAvailable === undefined &&  <span className="row bi bi-question-square" style={{"fontSize":"35px"}} title="No Checked"/>}
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
        </div>
      </>,
      document.body)
  );
}