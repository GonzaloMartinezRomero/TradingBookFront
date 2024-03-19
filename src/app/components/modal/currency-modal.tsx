import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ErrorMessageModal, ErrorModalProps } from "./error-message-modal";
import { Currency } from "../../domain/currency.model";
import { addCurrency, checkIfCurrencyCodeIsAvailable, deleteCurrency, getCurrencies } from "../../services/currency.service";


interface Props{
    onClose: any    
}

export function CurrencyModal({ onClose }:Props) {
  
  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});

  const [currencyCollection,setCurrencyCollection] = useState<Currency[]>();
  const [isCurrencyCodeAvailable,setIsCurrencyCodeAvailable] = useState<boolean | undefined>(undefined);

  const inputName = useRef<HTMLInputElement>(null);
  const inputCode = useRef<HTMLInputElement>(null);

    useEffect(() => {       
    loadCurrencies();
  },[]);

  function checkIfCurrencyIsAvailable(){
    const code = inputCode.current?.value as string;

    checkIfCurrencyCodeIsAvailable(code).then(response=>setIsCurrencyCodeAvailable(response)).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function deleteCurrencyById(id:number){
    
    deleteCurrency(id).then(x=>{
      
        const currencyCollectionAux: Currency[] = [];

        currencyCollection?.forEach(value=>{
          if(value.id !== id)
          currencyCollectionAux.push(value);
        })

        setCurrencyCollection(currencyCollectionAux);
    })
    .catch(err=>setErrorModal({isOpen:true,msg:err}));
  }
  
  function addNewCurrency(){

    const name = inputName.current?.value as string;
    const code = inputCode.current?.value as string;

    const currency:Currency = {
      id:0,
      code:code,
      name:name
    };

    addCurrency(currency).then(x=>{loadCurrencies();})
                         .catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function loadCurrencies(){
    getCurrencies().then(value=>setCurrencyCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  return (<>
  {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
  {createPortal(      
      <div className="currency-modal">
          <div className="d-flex flex-row-reverse">
          <button className="btn btn-secondary p-1 m-1" style={{"width":"32px","height":"33px"}} onClick={onClose}>
            <i className="bi-x"/>
          </button>
          </div>
          <h2>Currency</h2>
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
              <button className="btn btn-info row" onClick={()=>checkIfCurrencyIsAvailable()}>Check Availability</button>             
            </div>          
            <div className="col-5">
              {isCurrencyCodeAvailable === undefined &&  <span className="row bi bi-question-square" style={{"fontSize":"35px"}} title="No Checked"/>}
              {isCurrencyCodeAvailable == true && <span className="row bi bi-file-earmark-check" style={{"fontSize":"35px"}} title="Available"/>}
              {isCurrencyCodeAvailable == false &&  <span className="row bi bi-file-earmark-x" style={{"fontSize":"35px"}} title="No Available"/>}             
            </div>
          </div>          
          <div className="form-group row mt-3 mb-3">                        
            <div className="form-group col-12">
              <button className="btn btn-success" style={{"width":"100px","height":"40px"}} onClick={()=>{addNewCurrency()}}>Add</button>
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
                  currencyCollection?.map((value,index)=>{

                        return (
                          <tr>
                            <td>
                            <span>{value.name}</span>
                            </td>
                            <td>
                            <span>{value.code}</span>
                            </td>
                            <td>
                            <button className="btn btn-danger" 
                              onClick={()=>{deleteCurrencyById(value.id)}}><i className="bi bi-trash3"></i></button>
                            </td>
                          </tr>);
                  })
                }
              </tbody>
            </table>
          </div>
        </div>, document.body)}
      </>
  );
}