import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ErrorMessageModal, ErrorModalProps } from "../../util/errorMessageModal";
import { Currency } from "../../../domain/currency.model";
import { StockReference } from "../../../domain/stocks/stock-reference.model";
import { getCurrencies } from "../../../services/currency.service";
import { getStockReferences } from "../../../services/stock.service";
import { StockWatchSave } from "../../../domain/stocks/stock-watch-save.model";
import { addStockWatchReference } from "../../../services/stock-watch.service";


interface Props{
    onClose: any,
    onCloseAndReload: any
}

export function StockWatchListModal({ onClose, onCloseAndReload }:Props) {
  
  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});

  const [currencyCollection,setCurrencyCollection] = useState<Currency[]>();
  const [stockReferenceCollection,setStockReferenceCollection] = useState<StockReference[]>();

  const inputTarget = useRef<HTMLInputElement>(null);
  const inputCurrency = useRef<HTMLSelectElement>(null);
  const inputStockReference = useRef<HTMLSelectElement>(null);

  useEffect(()=>{
    getCurrencies().then(value=>setCurrencyCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
    getStockReferences().then(value=>setStockReferenceCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
  },
  []);
  
  function addStockWatch(){

    const newStockWatch:StockWatchSave =
    {
      currencyId: (inputCurrency.current?.value ?? "0") as unknown as number,
      stockReferenceId:(inputStockReference.current?.value ?? "0") as unknown as number,
      target:(inputTarget.current?.value ?? "0") as unknown as number     
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

              <div className="col-4">
                <label className="row">Target</label>
                <input type="number" className="form-control row" placeholder="Target" defaultValue={0} ref={inputTarget} />
              </div>

                 
            </div>          
          </div>       
          <div className="form-group row mt-2">            
            <div className="form-group col-12">
              <button className="btn btn-success" style={{ "width": "130px", "height": "50px" }} onClick={()=>addStockWatch()}>Add</button>
            </div>
          </div>
        </div>,document.body)}
        </>
  );
}