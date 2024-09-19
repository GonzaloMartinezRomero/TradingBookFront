"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message.modal";
import { StockTick } from "../../../domain/stockTick/stock-tick.model";
import { Currency } from "../../../domain/currency.model";
import { DropDownInput, DropDownValue } from "../../util/dropdown.input.component";
import { getCurrencies } from "../../../services/currency.service";
import { StockWatchSave } from "../../../domain/stockWatch/stock-watch-save.model";
import { addStockWatchReference, getStockWatchById, updateStockWatch } from "../../../services/stock-watch.service";
import { ButtonCustom, ButtonType } from "../../util/button.component";
import { NumberDecimalInput } from "../../util/number-decimal.input.component";
import { getStockTicks } from "../../../services/stock-tick.service";


interface Props{
    onClose: any,
    onCloseAndReload: any,
    id?: number | null
}

export function StockWatchListModal({ onClose, onCloseAndReload, id }:Props) {
  
  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});

  const [currencyCollection,setCurrencyCollection] = useState<Currency[]>();
  const [stockReferenceCollection,setStockReferenceCollection] = useState<StockTick[]>();

    const stockTickOptions: DropDownValue[] | undefined = stockReferenceCollection?.map((val) => { return { value: val.id, label: val.name } as DropDownValue });
    const currencyOptions: DropDownValue[] | undefined = currencyCollection?.map((currencyAux) => { return { value: currencyAux.id, label: currencyAux.name } as DropDownValue });
    
    const [stockTarget, setStockTarget] = useState<number>(0);
    const [stockTickId, setStockTickId] = useState<number>(0);
    const [currencyId, setCurrencyId] = useState<number>(0);

  useEffect(()=>{
    getCurrencies().then(value=>setCurrencyCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
    getStockTicks().then(value => setStockReferenceCollection(value)).catch(err => setErrorModal({ isOpen: true, msg: err }));
      window.scrollTo(0, 0);

      if (id) {
          getStockWatchById(id).then(x =>
          {
              setStockTarget(x.target);
              setStockTickId(x.stockTickId);
              setCurrencyId(x.currencyId);

          }).catch(err => setErrorModal({ isOpen: true, msg: err }));
      }
  },
  []);
  
    function addStockWatch() {
        
        const newStockWatch:StockWatchSave =
        {
            currencyId: currencyId,
            stockTickId: stockTickId,
            target: stockTarget
        }

        addStockWatchReference(newStockWatch).then(value=>onCloseAndReload()).catch(err=>setErrorModal({isOpen:true,msg:err}));
    }

    function update() {

        if (id) {
            const updatedStockWatch: StockWatchSave =
            {
                currencyId: currencyId,
                stockTickId: stockTickId,
                target: stockTarget
            }

            updateStockWatch(id, updatedStockWatch).then(value => onCloseAndReload()).catch(err => setErrorModal({ isOpen: true, msg: err }));
        }   
    }

  return (
    <>
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    { createPortal(
       
        <div className="new-stock-watch-modal">
            <div className="d-flex flex-row-reverse">
                <ButtonCustom btnType={ButtonType.Close} onClick={onClose} />          
          </div>
            {id && <h1>Modify Stock Watch</h1> }
            {!id && <h1>Add Stock Watch</h1>}
            <div className="m-4">
                <div className="form-group row" style={{ "textAlign":"left"}}>
            <div className="col-7">
                <label>Reference</label>
                     {!id && <DropDownInput values={stockTickOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => setStockTickId(valueSelected.value)} ></DropDownInput>}
                     {id && <DropDownInput values={stockTickOptions} selectedValue={stockTickOptions?.find(x => x.value == stockTickId)} onChangeSelectedValue={(valueSelected: DropDownValue) => setStockTickId(valueSelected.value)} ></DropDownInput>}
              </div>
              <div className="col-5">
                 <label>Currency</label>
                        {!id && <DropDownInput values={currencyOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => setCurrencyId(valueSelected.value)} ></DropDownInput>}
                        {id && <DropDownInput values={currencyOptions} selectedValue={currencyOptions?.find(x => x.value == currencyId)} onChangeSelectedValue={(valueSelected: DropDownValue) => setCurrencyId(valueSelected.value)} ></DropDownInput>}  
              </div>        
                </div>          
                <div className="form-group row mt-3" style={{ "textAlign": "left" }}>
                    <div className="col-4">
                        <label>Target</label>
                        {!id && <NumberDecimalInput onChangeValue={(valueSelected: number) => { setStockTarget(valueSelected) }} />}
                        {id && <NumberDecimalInput initialValue={stockTarget} onChangeValue={(valueSelected: number) => { setStockTarget(valueSelected) }} />}
                    </div>
                </div>
          </div>       
          <div className="form-group row mt-2">            
            <div className="form-group col-12">
                    {!id && <ButtonCustom btnType={ButtonType.Add} onClick={() => { addStockWatch(); }} />} 
                    {id && <ButtonCustom btnType={ButtonType.Add} onClick={() => { update(); }} />}
            </div>
          </div>
        </div>,document.body)}
        </>
  );
}