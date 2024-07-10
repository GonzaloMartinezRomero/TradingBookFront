"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CryptoCurrencyReference } from "../../../domain/crypto/crypto-currency.model";
import { Currency } from "../../../domain/currency.model";
import { getCryptoCurrenciesReference, saveCrypto } from "../../../services/crypto.service";
import { getCurrencies } from "../../../services/currency.service";
import { NewCrypto } from "../../../domain/crypto/new-crypto.model";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";
import { DropDownInput, DropDownValue } from "../../util/dropdown.input.component";
import { NumberDecimalInput } from "../../util/number-decimal.input.component";


interface Props{
    onClose: any,
    onCloseAndReload: any
}

export function NewCryptoModal({ onClose, onCloseAndReload }:Props) {
  
  const [cryptoCurrencyReferenceCollection, setCryptoCurrencyReferenceCollection] = useState<CryptoCurrencyReference[]>(); 
  const [currencies,setCurrencies] = useState<Currency[]>();
    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });

    const currencyOptions: DropDownValue[] | undefined = currencies?.map((currencyAux) => { return { value: currencyAux.id, label: currencyAux.name } as DropDownValue });
    const cryptoCurrencyOptions: DropDownValue[] | undefined = cryptoCurrencyReferenceCollection?.map((cryptoCurrencyAux) => { return { value: cryptoCurrencyAux.id, label: cryptoCurrencyAux.name } as DropDownValue });

  const newCrypto: NewCrypto = {} as NewCrypto;

  useEffect(()=>{
    getCryptoCurrenciesReference().then(value=>setCryptoCurrencyReferenceCollection(value));    
    getCurrencies().then(value=>setCurrencies(value));
  },
  []);
  
  function addCrypto(){
      
      saveCrypto(newCrypto).then(value=>{onCloseAndReload();})
                               .catch(err=>setErrorModal({isOpen:true,msg:err}));
  }
  return (
    <>
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    {createPortal(      
        <div className="add-crypto-modal">
        <div className="d-flex flex-row-reverse">
          <button className="btn btn-secondary p-1 m-1" style={{"width":"32px","height":"33px"}} onClick={onClose}>
            <i className="bi-x"/>
          </button>
          </div>
          <h1>New Crypto</h1>
          <div className="m-4">
            <h3 className="mb-4">Crypto Reference</h3>
                <div className="row" style={{ "textAlign": "left" }}>
            <div className="col-4">
               <label>Currency From</label>
               <DropDownInput values={currencyOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => newCrypto.currencyFromId = valueSelected.value}></DropDownInput>
              </div>
              <div className="col-4">
                    <label>Currency To</label>
                    <DropDownInput values={currencyOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => newCrypto.currencyToId = valueSelected.value}></DropDownInput>
              </div>
              <div className="col-4">
                    <label>Pair</label>
                    <DropDownInput values={cryptoCurrencyOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => newCrypto.cryptoReferenceId = valueSelected.value}></DropDownInput>
              </div>
            </div>
                <div className="row mt-3" style={{ "textAlign": "left" }}>
            <div className="col-4">
                        <label>Crypto Price</label>
                        <NumberDecimalInput onChangeValue={(value: number) => { newCrypto.cryptoPrice = value; }} />    
                
              </div>    
              <div className="col-4">
                        <label>Exchange Amount</label>
                        <NumberDecimalInput onChangeValue={(value: number) => { newCrypto.exchangedAmount = value; }} />    
                  
                </div>               
              </div>
                <div className="row mt-3" style={{ "textAlign": "left" }}>
              <div className="col-4">
                  <label>Stop Loss</label>
                        <NumberDecimalInput onChangeValue={(value: number) => { newCrypto.stopLoss = value; }} />    
                </div>
                <div className="col-4">
                  <label>Sell Limit</label>
                        <NumberDecimalInput onChangeValue={(value: number) => { newCrypto.sellLimit = value; }} />   
                  </div>
              </div>
          </div>
          <div className="m-4">
            <h3 className="mb-2">Invest</h3>
                <div className="row" style={{ "textAlign": "left" }}>
              <div className="col-4">
                <label>Amount</label>
                        <NumberDecimalInput onChangeValue={(value: number) => { newCrypto.amountInvest = value; }} />   
              </div>              
              <div className="col-4">
                <label>Fee</label>
                        <NumberDecimalInput onChangeValue={(value: number) => { newCrypto.feeInvest = value; }} />   
              </div>
            </div>
          </div>
            <div className="row mt-2" style={{ "textAlign": "center" }}>
                <div className="col-12">
                    <button className="btn btn-success" style={{ "width": "130px", "height": "50px" }} onClick={() => addCrypto()}>Add</button>            
                </div>
          </div>
        </div>
      ,
      document.body)}
    </>
  );
}