"use client";
import { getCryptoCurrenciesReference, saveCrypto } from "@/app/apiService/httpService";
import { CryptoCurrencyReference } from "@/app/apiService/model/cryptoCurrency.model";
import { NewCrypto } from "@/app/apiService/model/newCrypto.model";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props{
    onClose: any,
    onCloseAndReload: any
}

export function NewCryptoModal({ onClose, onCloseAndReload }:Props) {
  
  const [cryptoCurrencyReferenceCollection, setCryptoCurrencyReferenceCollection] = useState<CryptoCurrencyReference[]>(); 

  const inputCryptoReferenceFrom = useRef<HTMLSelectElement>(null);
  const inputCryptoReferenceTo = useRef<HTMLSelectElement>(null);  
  const inputPrice = useRef<HTMLInputElement>(null);
  const inputStopLoss = useRef<HTMLInputElement>(null);
  const inputSellLimit = useRef<HTMLInputElement>(null);
  const inputAmount = useRef<HTMLInputElement>(null);
  const inputFee = useRef<HTMLInputElement>(null);  
  const inputExchangedAmount = useRef<HTMLInputElement>(null);  
  

  useEffect(()=>{
    getCryptoCurrenciesReference().then(value=>setCryptoCurrencyReferenceCollection(value));    
  },
  []);
  
  function addCrypto(){

    const newCryptoParsed:NewCrypto =
    {      
      cryptoCurrencyReferenceFromId:(inputCryptoReferenceFrom.current?.value ?? "0") as unknown as number,
      cryptoCurrencyReferenceToId:(inputCryptoReferenceTo.current?.value ?? "0") as unknown as number,
      cryptoPrice: (inputPrice.current?.value ?? "0") as unknown as number,
      sellLimit: (inputSellLimit.current?.value ?? "0") as unknown as number,
      stopLoss: (inputStopLoss.current?.value ?? "0") as unknown as number,
      amountInvest: (inputAmount.current?.value ?? "0") as unknown as number,
      feeInvest: (inputFee.current?.value ?? "0") as unknown as number,           
      exchangedAmount: (inputExchangedAmount.current?.value ?? "0") as unknown as number,            
    }

    saveCrypto(newCryptoParsed).then(value=>{onCloseAndReload();});
  }

  return (
    createPortal(
      <>
        <div className="add-invest-modal">
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
                <label className="row">Reference From</label>
                <select className="row form-select" aria-label="StockReference" ref={inputCryptoReferenceFrom}>
                  <option selected>Select</option>
                  {
                    cryptoCurrencyReferenceCollection?.map((stockReference,index)=>
                    {
                      return (<option value={stockReference.id}>{stockReference.name}</option>);
                    })
                  }                  
                </select>
              </div>
              <div className="col-4">
                <label className="row">Reference To</label>
                <select className="row form-select" aria-label="StockReference" ref={inputCryptoReferenceTo}>
                  <option selected>Select</option>
                  {
                    cryptoCurrencyReferenceCollection?.map((stockReference,index)=>
                    {
                      return (<option value={stockReference.id}>{stockReference.name}</option>);
                    })
                  }                  
                </select>
              </div>
              <div className="col-4">
                <label className="row">Price</label>
                <input type="number" className="form-control row" placeholder="Price" ref={inputPrice} />
              </div>          
            </div>
            <div className="form-group row mt-3">
              <div className="col-4">
                  <label className="row">Exchange Amount</label>
                  <input type="number" className="form-control row" placeholder="Amount" ref={inputExchangedAmount}/>
                </div>
                <div className="col-4">
                  <label className="row">Stop Loss</label>
                  <input type="number" className="form-control row" placeholder="Stop" ref={inputStopLoss}/>
                </div>
                <div className="col-4">
                  <label className="row">Sell Limit</label>
                  <input type="number" className="form-control row" placeholder="Limit" ref={inputSellLimit}/>
                  </div>
              </div>
          </div>
          <div className="m-4">
            <h3 className="mb-4">Invest</h3>
            <div className="form-group row">
              <div className="col-4">
                <label className="row">Amount</label>
                <input type="number" className="form-control row" placeholder="Amount" ref={inputAmount}/>
              </div>              
              <div className="col-4">
                <label className="row">Fee</label>
                <input type="number" className="form-control row" placeholder="Fee" ref={inputFee}/>
              </div>
            </div>
          </div>
          <div className="form-group row mt-2">            
            <div className="form-group col-12">
              <button className="btn btn-success" style={{ "width": "130px", "height": "50px" }} onClick={()=>addCrypto()}>Add</button>
            </div>
          </div>
        </div>
      </>,
      document.body)
  );
}