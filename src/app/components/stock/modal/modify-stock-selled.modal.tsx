"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Currency } from "../../../domain/currency.model";

import { getCurrencies } from "../../../services/currency.service";

import { StockTick } from "../../../domain/stockTick/stock-tick.model";

import { UpdateSelledStock } from "../../../domain/stocks/update-selled-stock.model";
import { getStockTicks } from "../../../services/stock-tick.service";
import { getStockById, updateSelledStock } from "../../../services/stock.service";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message.modal";
import { ButtonCustom, ButtonType } from "../../util/button.component";
import { DropDownInput, DropDownValue } from "../../util/dropdown.input.component";
import { NumberDecimalInput } from "../../util/number-decimal.input.component";

interface Props{
    onClose: any,
    onCloseAndReload: any,
    stockId:number
}

export function ModifyStockSelledModal({ onClose, onCloseAndReload, stockId }: Props) {
  
  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});
  const [currencyCollection,setCurrencyCollection] = useState<Currency[]>();
  const [stockReferenceCollection, setStockReferenceCollection] = useState<StockTick[]>();
    const [stockInput, setStockInput] = useState<UpdateSelledStock>({} as UpdateSelledStock);  
  const stockOptions: DropDownValue[] | undefined = stockReferenceCollection?.map((stockAux) => { return { value: stockAux.id, label: stockAux.name } as DropDownValue });
  const currencyOptions: DropDownValue[] | undefined = currencyCollection?.map((currencyAux) => { return { value: currencyAux.id, label: currencyAux.name } as DropDownValue });
 
  useEffect(()=>{
    getCurrencies().then(value=>setCurrencyCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
    getStockTicks().then(value => setStockReferenceCollection(value)).catch(err => setErrorModal({ isOpen: true, msg: err }));
      getStockById(stockId).then(x =>
      {
          const stockInputAux: UpdateSelledStock =
          {
              amount: x.amount,
              currencyId: x.currencyId,
              fee: x.fee,
              price: x.price,
              stockTickId: x.stockTickId,
              returnAmount: x.returnAmount,
              returnFee: x.returnFee,
              returnStockPrice: x.returnStockPrice,
              dividends: x.dividends
          };

          setStockInput(stockInputAux);

      }).catch(err => setErrorModal({ isOpen: true, msg: err }));
  },
  []);
  
    function update() {
        updateSelledStock(stockId, stockInput).then(value => onCloseAndReload()).catch(err => setErrorModal({ isOpen: true, msg: err }));
  }

  return (
    <>
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    { createPortal(
       
        <div className="add-stock-modal">
            <div className="d-flex flex-row-reverse">
                <ButtonCustom btnType={ButtonType.Close} onClick={onClose} />
          </div>
          <h1>Modify Stock Selled</h1>
          <div className="m-4">
                <h3 className="mb-4">Stock Tick</h3>
                <div className="row" style={{ "textAlign": "left" }}>
                    <div className="col-4">           
                        <label>Tick</label>
                        <DropDownInput values={stockOptions}
                            selectedValue={stockOptions?.find(x => x.value == stockInput.stockTickId)}
                            onChangeSelectedValue={(valueSelected: DropDownValue) =>
                            { const aux = { ...stockInput }; aux.stockTickId = valueSelected.value; setStockInput(aux) }} ></DropDownInput>
                </div>
                    <div className="col-4">                      
                            <label>Price</label>
                        <NumberDecimalInput initialValue={stockInput.price}
                            onChangeValue={(valueSelected: number) =>
                            { const aux = stockInput; aux.price = valueSelected; setStockInput(aux) }} />
              </div>
                    <div className="col-4">
                            <label>Currency</label>
                        <DropDownInput values={currencyOptions}
                            selectedValue={currencyOptions?.find(x => x.value == stockInput.currencyId)}
                            onChangeSelectedValue={(valueSelected: DropDownValue) =>
                            { const aux = { ...stockInput }; aux.currencyId = valueSelected.value; setStockInput(aux) }} ></DropDownInput>
                    </div>
            </div>
          </div>
          <div className="m-4">
            <h3 className="mb-3">Invest</h3>
                <div className="form-group row" style={{ "textAlign": "left" }}>
                    <div className="col-4">
                            <label>Amount</label>
                        <NumberDecimalInput initialValue={stockInput.amount}
                            onChangeValue={(valueSelected: number) => { const aux = stockInput; aux.amount = valueSelected; setStockInput(aux) }} />
                       
              </div>              
                    <div className="col-4">
                        <label>Fee</label>
                        <NumberDecimalInput initialValue={stockInput.fee}
                            onChangeValue={(valueSelected: number) => { const aux = stockInput; aux.fee = valueSelected; setStockInput(aux) }} />
                    </div>
                    <div className="col-4">
                        <label>Dividends</label>
                        <NumberDecimalInput initialValue={stockInput.dividends}
                            onChangeValue={(valueSelected: number) => { const aux = stockInput; aux.dividends = valueSelected; setStockInput(aux) }} />
                    </div>
            </div>
            </div>
            <div className="m-4">
                <div className="form-group row" style={{ "textAlign": "left" }}>
                    <div className="col-4">
                        <label>Return Stock Price</label>
                        <NumberDecimalInput initialValue={stockInput.returnStockPrice}
                            onChangeValue={(valueSelected: number) => { const aux = { ...stockInput }; aux.returnStockPrice = valueSelected; setStockInput(aux) }} />

                    </div>
                    <div className="col-4">
                        <label>Return Fee</label>
                        <NumberDecimalInput initialValue={stockInput.returnFee}
                            onChangeValue={(valueSelected: number) => { const aux = { ...stockInput }; aux.returnFee = valueSelected; setStockInput(aux) }} />
                    </div>
                    <div className="col-4">
                        <label>Return Amount</label>
                        <NumberDecimalInput initialValue={stockInput.returnAmount}
                            onChangeValue={(valueSelected: number) => { const aux = { ...stockInput }; aux.returnAmount = valueSelected; setStockInput(aux) }} />
                    </div>
                </div>
            </div>
            <ButtonCustom btnType={ButtonType.Update} onClick={() => update()} />
        </div>,document.body)}
        </>
  );
}