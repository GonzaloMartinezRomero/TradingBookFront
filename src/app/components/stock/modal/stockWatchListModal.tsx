import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Currency } from "../../../domain/currency.model";
import { StockReference } from "../../../domain/stocks/stock-reference.model";
import { getCurrencies } from "../../../services/currency.service";
import { getStockReferences } from "../../../services/stock.service";
import { StockWatchSave } from "../../../domain/stocks/stock-watch-save.model";
import { addStockWatchReference } from "../../../services/stock-watch.service";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";
import { DropDownInput, DropDownValue } from "../../util/dropdown.input.component";
import { DecimalInput } from "../../util/decimal.input.component";


interface Props{
    onClose: any,
    onCloseAndReload: any
}

export function StockWatchListModal({ onClose, onCloseAndReload }:Props) {
  
  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});

  const [currencyCollection,setCurrencyCollection] = useState<Currency[]>();
  const [stockReferenceCollection,setStockReferenceCollection] = useState<StockReference[]>();

    const stockReferenceOptions: DropDownValue[] | undefined = stockReferenceCollection?.map((val) => { return { value: val.id, label: val.name } as DropDownValue });
    const currencyOptions: DropDownValue[] | undefined = currencyCollection?.map((currencyAux) => { return { value: currencyAux.id, label: currencyAux.name } as DropDownValue });
    
    var stockTarget: number = 0;
    var stockReferenceId: number = 0;
    var currencyId: number = 0;

  useEffect(()=>{
    getCurrencies().then(value=>setCurrencyCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
    getStockReferences().then(value=>setStockReferenceCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
  },
  []);
  
  function addStockWatch(){

    const newStockWatch:StockWatchSave =
    {
        currencyId: currencyId,
        stockReferenceId: stockReferenceId,
        target: stockTarget
    }

    addStockWatchReference(newStockWatch).then(value=>onCloseAndReload()).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  return (
    <>
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    { createPortal(
       
        <div className="new-stock-watch-modal">
        <div className="d-flex flex-row-reverse">
          <button className="btn btn-secondary p-1 m-1" style={{"width":"32px","height":"33px"}} onClick={onClose}>
            <i className="bi-x"/>
          </button>
          </div>
          <h1>Add Stock Watch</h1>
            <div className="m-4">
                <div className="form-group row" style={{ "textAlign":"left"}}>
            <div className="col-7">
                 <label>Reference</label>
                 <DropDownInput values={stockReferenceOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => stockReferenceId = valueSelected.value} ></DropDownInput>
              </div>
              <div className="col-5">
                 <label>Currency</label>
                 <DropDownInput values={currencyOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => currencyId = valueSelected.value} ></DropDownInput>
              </div>        
                </div>          
                <div className="form-group row mt-3" style={{ "textAlign": "left" }}>
                    <div className="col-4">
                        <label>Target</label>
                        <DecimalInput onChangeValue={(value: number) => { stockTarget = value; }} />
                    </div>
                </div>
          </div>       
          <div className="form-group row mt-2">            
            <div className="form-group col-12">
              <button className="btn btn-success" style={{ "width": "100px", "height": "50px" }} onClick={()=>addStockWatch()}>Add</button>
            </div>
          </div>
        </div>,document.body)}
        </>
  );
}