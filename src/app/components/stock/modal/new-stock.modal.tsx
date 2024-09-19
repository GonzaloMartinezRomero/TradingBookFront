"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Currency } from "../../../domain/currency.model";
import { NewStock } from "../../../domain/stocks/new-stock.model";

import { getCurrencies } from "../../../services/currency.service";

import { DropDownInput, DropDownValue } from "../../util/dropdown.input.component";
import { NumberDecimalInput } from "../../util/number-decimal.input.component";
import { ButtonCustom, ButtonType } from "../../util/button.component";
import { StockTick } from "../../../domain/stockTick/stock-tick.model";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message.modal";
import { getStockTicks } from "../../../services/stock-tick.service";
import { getStockById, saveStock } from "../../../services/stock.service";

interface Props{
    onClose: any,
    onCloseAndReload: any,
    stockId?:number
}

export function NewStockModal({ onClose, onCloseAndReload, stockId }: Props) {
  
  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});
  const [currencyCollection,setCurrencyCollection] = useState<Currency[]>();
  const [stockReferenceCollection,setStockReferenceCollection] = useState<StockTick[]>();

  const stockInput: NewStock = {} as NewStock;
  
  const stockOptions: DropDownValue[] | undefined = stockReferenceCollection?.map((stockAux) => { return { value: stockAux.id, label: stockAux.name } as DropDownValue });
  const currencyOptions: DropDownValue[] | undefined = currencyCollection?.map((currencyAux) => { return { value: currencyAux.id, label: currencyAux.name } as DropDownValue });
 
  useEffect(()=>{
    getCurrencies().then(value=>setCurrencyCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
      getStockTicks().then(value => setStockReferenceCollection(value)).catch(err => setErrorModal({ isOpen: true, msg: err }));

      if (stockId) {
          getStockById(stockId).then(x => { }).catch(err => setErrorModal({ isOpen: true, msg: err }));
      }
  },
  []);
  
  function addStock(){      
    saveStock(stockInput).then(value=>onCloseAndReload()).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  return (
    <>
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    { createPortal(
       
        <div className="add-stock-modal">
            <div className="d-flex flex-row-reverse">
                <ButtonCustom btnType={ButtonType.Close} onClick={onClose} />
          </div>
          <h1>New Stock</h1>
          <div className="m-4">
                <h3 className="mb-4">Stock Tick</h3>
                <div className="row" style={{ "textAlign": "left" }}>
                    <div className="col-4">           
                        <label>Tick</label>
                        <DropDownInput values={stockOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => stockInput.stockTickId = valueSelected.value}></DropDownInput>
                </div>
                    <div className="col-4">                      
                            <label>Price</label>
                        <NumberDecimalInput onChangeValue={(value: number) => { stockInput.price = value; }} />                                                         
              </div>
                    <div className="col-4">
                            <label>Currency</label>
                        <DropDownInput values={currencyOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => stockInput.currencyId = valueSelected.value}></DropDownInput>
                        </div>
            </div>
                <div className="form-group row mt-3" style={{"textAlign":"left"} }>
                    <div className="col-4">
                       
                            <label>Stop Loss</label>
                        <NumberDecimalInput onChangeValue={(value: number) => { stockInput.stopLoss = value; }} />                  
                        
                </div>
                    <div className="col-4">
                     
                            <label>Sell Limit</label>
                        <NumberDecimalInput onChangeValue={(value: number) => { stockInput.sellLimit = value; }} />    
                        
                  </div>
              </div>
          </div>
          <div className="m-4">
            <h3 className="mb-3">Invest</h3>
                <div className="form-group row" style={{ "textAlign": "left" }}>
                    <div className="col-4">
                      
                            <label>Amount</label>
                        <NumberDecimalInput onChangeValue={(value: number) => { stockInput.amount = value; }} />                    
                       
              </div>              
                    <div className="col-4">
                      
                            <label>Fee</label>
                        <NumberDecimalInput onChangeValue={(value: number) => { stockInput.fee = value; }} />       
                       
              </div>
            </div>
          </div>
            <ButtonCustom btnType={ButtonType.Add} onClick={() => addStock()} />
        </div>,document.body)}
        </>
  );
}