import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Currency } from "../../../domain/currency.model";
import { NewStock } from "../../../domain/stocks/new-stock.model";
import { StockReference } from "../../../domain/stocks/stock-reference.model";
import { getCurrencies } from "../../../services/currency.service";
import { getStockReferences, saveStock } from "../../../services/stock.service";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";
import { DecimalInput } from "../../util/decimal.input.component";
import { DropDownInput, DropDownValue } from "../../util/dropdown.input.component";

interface Props{
    onClose: any,
    onCloseAndReload: any
}

export function NewStockModal({ onClose, onCloseAndReload }:Props) {
  
  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});
  const [currencyCollection,setCurrencyCollection] = useState<Currency[]>();
  const [stockReferenceCollection,setStockReferenceCollection] = useState<StockReference[]>();

  const newStock: NewStock = {} as NewStock;
  
  const stockOptions: DropDownValue[] | undefined = stockReferenceCollection?.map((stockAux) => { return { value: stockAux.id, label: stockAux.name } as DropDownValue });
  const currencyOptions: DropDownValue[] | undefined = currencyCollection?.map((currencyAux) => { return { value: currencyAux.id, label: currencyAux.name } as DropDownValue });
 
  useEffect(()=>{
    getCurrencies().then(value=>setCurrencyCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
    getStockReferences().then(value=>setStockReferenceCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
  },
  []);
  
  function addStock(){
      
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
                <div className="row" style={{ "textAlign": "left" }}>
                    <div className="col-4">           
                        <label>Reference</label>
                        <DropDownInput values={stockOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => newStock.stockReferenceId = valueSelected.value}></DropDownInput>
                </div>
                    <div className="col-4">                      
                            <label>Price</label>
                            <DecimalInput onChangeValue={(value: number) => { newStock.price = value; }} />                                                         
              </div>
                    <div className="col-4">
                            <label>Currency</label>
                        <DropDownInput values={currencyOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => newStock.currencyId = valueSelected.value}></DropDownInput>
                        </div>
            </div>
                <div className="form-group row mt-3" style={{"textAlign":"left"} }>
                    <div className="col-4">
                       
                            <label>Stop Loss</label>
                        <DecimalInput onChangeValue={(value: number) => { newStock.stopLoss = value; }} />                  
                        
                </div>
                    <div className="col-4">
                     
                            <label>Sell Limit</label>
                        <DecimalInput onChangeValue={(value: number) => { newStock.sellLimit = value; }} />    
                        
                  </div>
              </div>
          </div>
          <div className="m-4">
            <h3 className="mb-3">Invest</h3>
                <div className="form-group row" style={{ "textAlign": "left" }}>
                    <div className="col-4">
                      
                            <label>Amount</label>
                        <DecimalInput onChangeValue={(value: number) => { newStock.amount = value; }} />                    
                       
              </div>              
                    <div className="col-4">
                      
                            <label>Fee</label>
                        <DecimalInput onChangeValue={(value: number) => { newStock.fee = value; }} />       
                       
              </div>
            </div>
          </div>
          <button className="btn btn-success" style={{ "width": "130px", "height": "50px" }} onClick={()=>addStock()}>Add</button>
        </div>,document.body)}
        </>
  );
}