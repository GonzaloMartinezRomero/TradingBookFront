"use client";
import { CryptoCurrencyReference } from "@/app/apiService/model/cryptoCurrency.model";
import { Currency } from "@/app/apiService/model/currency.model";
import { NewCrypto } from "@/app/apiService/model/newCrypto.model";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ErrorMessageModal, ErrorModalProps } from "../../util/errorMessageModal";
import { getCryptoCurrenciesReference, saveCrypto } from "@/app/apiService/cryptoApiService";
import { getCurrencies } from "@/app/apiService/currencyApiService";

interface Props{
    onClose: any,
    onCloseAndReload: any
}

export function NewCryptoModal({ onClose, onCloseAndReload }:Props) {
  
  const [cryptoCurrencyReferenceCollection, setCryptoCurrencyReferenceCollection] = useState<CryptoCurrencyReference[]>(); 
  const [currencies,setCurrencies] = useState<Currency[]>();
  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});

  const inputCurrencyFrom = useRef<HTMLSelectElement>(null);
  const inputCurrencyTo = useRef<HTMLSelectElement>(null);  
  const inputCryptoReference = useRef<HTMLSelectElement>(null);  
  const inputPrice = useRef<HTMLInputElement>(null);
  const inputStopLoss = useRef<HTMLInputElement>(null);
  const inputSellLimit = useRef<HTMLInputElement>(null);
  const inputAmount = useRef<HTMLInputElement>(null);
  const inputFee = useRef<HTMLInputElement>(null);  
  const inputExchangedAmount = useRef<HTMLInputElement>(null);  
  

  useEffect(()=>{
    getCryptoCurrenciesReference().then(value=>setCryptoCurrencyReferenceCollection(value));    
    getCurrencies().then(value=>setCurrencies(value));
  },
  []);
  
  function addCrypto(){

    const newCryptoParsed: NewCrypto =
    {      
      currencyFromId:(inputCurrencyFrom.current?.value ?? "0") as unknown as number,
      currencyToId:(inputCurrencyTo.current?.value ?? "0") as unknown as number,
      cryptoReferenceId:(inputCryptoReference.current?.value ?? "0") as unknown as number,
      cryptoPrice: (inputPrice.current?.value ?? "0") as unknown as number,
      sellLimit: (inputSellLimit.current?.value ?? "0") as unknown as number,
      stopLoss: (inputStopLoss.current?.value ?? "0") as unknown as number,
      amountInvest: (inputAmount.current?.value ?? "0") as unknown as number,
      feeInvest: (inputFee.current?.value ?? "0") as unknown as number,           
      exchangedAmount: (inputExchangedAmount.current?.value ?? "0") as unknown as number,            
    }

    saveCrypto(newCryptoParsed).then(value=>{onCloseAndReload();})
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
            <div className="form-group row">
            <div className="col-4">
                <label className="row">Currency From</label>
                <select className="row form-select" aria-label="CurrencyFrom" ref={inputCurrencyFrom}>
                  <option selected>Select</option>
                  {
                    currencies?.map((currencyAux,index)=>
                    {
                      return (<option value={currencyAux.id}>{currencyAux.name}</option>);
                    })
                  }                  
                </select>
              </div>
              <div className="col-4">
                <label className="row">Currency To</label>
                <select className="row form-select" aria-label="CurrencyTo" ref={inputCurrencyTo}>
                  <option selected>Select</option>
                  {
                    currencies?.map((currencyAux,index)=>
                    {
                      return (<option value={currencyAux.id}>{currencyAux.name}</option>);
                    })
                  }                  
                </select>
              </div>
              <div className="col-4">
                <label className="row">Pair</label>
                <select className="row form-select" aria-label="Pair" ref={inputCryptoReference}>
                  <option selected>Select</option>
                  {
                    cryptoCurrencyReferenceCollection?.map((stockReference,index)=>
                    {
                      return (<option value={stockReference.id}>{stockReference.name}</option>);
                    })
                  }                  
                </select>
              </div>
            </div>
            <div className="form-group row mt-3">
            <div className="col-4">
                <label className="row">Crypto Price</label>
                <input type="number" className="form-control row" placeholder="CryptoPrice" defaultValue={0} ref={inputPrice} />
              </div>    
              <div className="col-4">
                  <label className="row">Exchange Amount</label>
                  <input type="number" className="form-control row" placeholder="Amount" defaultValue={0} ref={inputExchangedAmount}/>
                </div>               
              </div>
              <div className="form-group row mt-3">
              <div className="col-4">
                  <label className="row">Stop Loss</label>
                  <input type="number" className="form-control row" placeholder="Stop" defaultValue={0} ref={inputStopLoss}/>
                </div>
                <div className="col-4">
                  <label className="row">Sell Limit</label>
                  <input type="number" className="form-control row" placeholder="Limit" defaultValue={0} ref={inputSellLimit}/>
                  </div>
              </div>
          </div>
          <div className="m-4">
            <h3 className="mb-2">Invest</h3>
            <div className="form-group row">
              <div className="col-4">
                <label className="row">Amount</label>
                <input type="number" className="form-control row" placeholder="Amount" defaultValue={0} ref={inputAmount}/>
              </div>              
              <div className="col-4">
                <label className="row">Fee</label>
                <input type="number" className="form-control row" placeholder="Fee" defaultValue={0} ref={inputFee}/>
              </div>
            </div>
          </div>
          <div className="form-group row mt-2">            
            <div className="form-group col-12">
              <button className="btn btn-success" style={{ "width": "130px", "height": "50px" }} onClick={()=>addCrypto()}>Add</button>
            </div>
          </div>
        </div>
      ,
      document.body)}
    </>
  );
}