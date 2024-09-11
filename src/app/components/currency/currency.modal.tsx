"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Currency } from "../../domain/currency.model";
import { addCurrency, checkIfCurrencyCodeIsAvailable, deleteCurrency, getCurrencies } from "../../services/currency.service";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message.modal";
import { ButtonCustom, ButtonType } from "../util/button.component";
import { TextInput } from "../util/text.input.component";
import { InformationMessageModal, InformationModalProps } from "../modal/information-message.modal";


interface Props{
    onClose: any    
}

export function CurrencyModal({ onClose }:Props) {
  
    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
    const [informationModal, setInformationModal] = useState<InformationModalProps>({ isOpen: false });

  const [currencyCollection,setCurrencyCollection] = useState<Currency[]>();
  const [isCurrencyCodeAvailable,setIsCurrencyCodeAvailable] = useState<boolean | undefined>(undefined);

    const [inputName, setInputName] = useState<string>('');
    const [inputCode, setInputCode] = useState<string>('');

    console.log("INPUT CODE");
    console.log(inputCode);

    useEffect(() => {       
    loadCurrencies();
  },[]);

  function checkIfCurrencyIsAvailable(){
      checkIfCurrencyCodeIsAvailable(inputCode).then(response => setIsCurrencyCodeAvailable(response))
                                               .catch(err => setErrorModal({ isOpen: true, msg: err }));
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
  
    const currency:Currency = {
      id:0,
      code: inputCode,
      name:inputName
    };

      addCurrency(currency).then(x =>
      {   
          loadCurrencies();
          setInformationModal({ isOpen:true });
      }).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function loadCurrencies(){
    getCurrencies().then(value=>setCurrencyCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  return (<>
      {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}
      {informationModal.isOpen && <InformationMessageModal msg={'Currency added successfuly'} onClose={() => setInformationModal({ isOpen:false })} />}
  {createPortal(      
      <div className="currency-modal">
          <div className="d-flex flex-row-reverse">
              <ButtonCustom btnType={ButtonType.Close} onClick={onClose} />
          </div>
          <h2>Currency</h2>
          <div className="form-group row ms-4">
            <div className="col-10">
                  <label className="row">Name</label>
                  <TextInput placeHolder={'Name'} initialValue={''} onChangeValue={(x: string) => setInputName(x)} ></TextInput>        
            </div>
          </div>
          <div className="form-group row mt-2 ms-4">
            <div className="col-10">
                  <label className="row">Code</label>
                  <TextInput placeHolder={'Code'} initialValue={''} onChangeValue={(x: string) => setInputCode(x) } ></TextInput>
            </div>
          </div>    
          <div className="form-group row mt-3 ms-1">
              <div className="col-5">
                  <ButtonCustom btnType={ButtonType.Info} text={'Check'} onClick={() => { checkIfCurrencyIsAvailable() }} />                
            </div>          
            <div className="col-5">
              {isCurrencyCodeAvailable === undefined &&  <span className="row bi bi-question-square" style={{"fontSize":"35px"}} title="No Checked"/>}
              {isCurrencyCodeAvailable == true && <span className="row bi bi-file-earmark-check" style={{"fontSize":"35px"}} title="Available"/>}
              {isCurrencyCodeAvailable == false &&  <span className="row bi bi-file-earmark-x" style={{"fontSize":"35px"}} title="No Available"/>}             
            </div>
          </div>          
          <div className="form-group row mt-3 mb-3">                        
              <div className="form-group col-12">
                  <ButtonCustom btnType={ButtonType.Add} onClick={() => { addNewCurrency(); }} />                
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
                                    <ButtonCustom btnType={ButtonType.Delete} onClick={() => { deleteCurrencyById(value.id); }} />                            
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