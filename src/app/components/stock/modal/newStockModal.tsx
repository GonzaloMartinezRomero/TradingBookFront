import { getCurrencies } from "@/app/apiService/currencyApiService";
import { Currency } from "@/app/apiService/model/currency.model";
import { NewStock } from "@/app/apiService/model/newStock.model";
import { StockReference } from "@/app/apiService/model/stockReference.model";
import { getStockReferences, saveStock } from "@/app/apiService/stockApiService";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ErrorMessageModal, ErrorModalProps } from "../../util/errorMessageModal";

interface Props{
    onClose: any,
    onCloseAndReload: any
}

export function NewStockModal({ onClose, onCloseAndReload }:Props) {
  
  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});

  const [currencyCollection,setCurrencyCollection] = useState<Currency[]>();
  const [stockReferenceCollection,setStockReferenceCollection] = useState<StockReference[]>();

  const inputPrice = useRef<HTMLInputElement>(null);
  const inputStopLoss = useRef<HTMLInputElement>(null);
  const inputSellLimit = useRef<HTMLInputElement>(null);
  const inputAmount = useRef<HTMLInputElement>(null);
  const inputFee = useRef<HTMLInputElement>(null);
  const inputCurrency = useRef<HTMLSelectElement>(null);
  const inputStockReference = useRef<HTMLSelectElement>(null);

  useEffect(()=>{
    getCurrencies().then(value=>setCurrencyCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
    getStockReferences().then(value=>setStockReferenceCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
  },
  []);
  
  function addStock(){

    const newStock:NewStock =
    {
      currencyId: (inputCurrency.current?.value ?? "0") as unknown as number,
      stockReferenceId:(inputStockReference.current?.value ?? "0") as unknown as number,
      amount: (inputAmount.current?.value ?? "0") as unknown as number,
      fee: (inputFee.current?.value ?? "0") as unknown as number,
      price: (inputPrice.current?.value ?? "0") as unknown as number,
      sellLimit: (inputSellLimit.current?.value ?? "0") as unknown as number,
      stopLoss: (inputStopLoss.current?.value ?? "0") as unknown as number,
    }

    saveStock(newStock).then(value=>onCloseAndReload()).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  return (
    <>
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    { createPortal(
       
        <div className="add-stock-modal">
        <div className="d-flex flex-row-reverse">
          <button className="btn btn-secondary p-1 m-1" style={{"width":"32px","height":"33px"}} onClick={onClose}>
            <i className="bi-x"/>
          </button>
          </div>
          <h1>New Stock</h1>
          <div className="m-4">
            <h3 className="mb-4">Stock Reference</h3>
            <div className="form-group row">
            <div className="col-4">
                <label className="row">Reference</label>
                <select className="row form-select" aria-label="StockReference" ref={inputStockReference}>
                  <option selected>Select</option>
                  {
                    stockReferenceCollection?.map((stockReference,index)=>
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

              <div className="col-4">
                <label className="row">Currency</label>
                <select className="row form-select" aria-label="Currency" ref={inputCurrency}>
                  <option selected>Select</option>
                  {
                    currencyCollection?.map((currencyAux,index)=>
                    {
                      return (<option value={currencyAux.id}>{currencyAux.name}</option>);
                    })
                  }         
                </select>
              </div>            
            </div>
            <div className="form-group row mt-3">
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
              <button className="btn btn-success" style={{ "width": "130px", "height": "50px" }} onClick={()=>addStock()}>Add</button>
            </div>
          </div>
        </div>,document.body)}
        </>
  );
}