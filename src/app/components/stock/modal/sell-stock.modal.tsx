'use client'

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SellStock } from "../../../domain/stocks/sell-stock.model";
import { Stock } from "../../../domain/stocks/stock.model";
import { getStockById, sellStock } from "../../../services/stock.service";
import { ButtonCustom, ButtonType } from "../../util/button.component";
import { NumberDecimalInput } from "../../util/number-decimal.input.component";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message.modal";

interface Props{
    stockId: number,
    onClose: any,
    onStockUpdateAndClose: any
}

interface SellStockInputValue{
  stockId: any;
  return: any;
  returnFee: any;
  returnStockPrice: any;
}

export function SellStockModal({ stockId, onClose, onStockUpdateAndClose }:Props) {

  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});

  const [stock,setStock] = useState<Stock>();

  var inputReturn: number = 0;
  var inputFee:number = 0;
  var inputPrice:number = 0;
    
  useEffect(()=>{
    getStockById(stockId).then(value=>setStock(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
  },
  []); 

  function sell(stockSellInputValue:SellStockInputValue){

      const sellStockValue:SellStock =
      {
         stockId: stockSellInputValue.stockId as number,
         return: stockSellInputValue.return as number,
         returnFee: stockSellInputValue.returnFee as number,
         returnStockPrice: stockSellInputValue.returnStockPrice as number 
      };

      sellStock(sellStockValue).then(value=>onStockUpdateAndClose()).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  return (
    <>
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    { createPortal(
        <div className="sell-stock-modal">
            <div className="d-flex flex-row-reverse">
                <ButtonCustom btnType={ButtonType.Close} onClick={onClose} />   
            </div>
            <h3>Sell {stock?.stockTick.name}</h3>
          <div className="form-group row ms-3">
            <div className="col-6 ">
                    <label className="row">Return</label>
                    <NumberDecimalInput onChangeValue={(val: number) => { inputReturn = val; }}></NumberDecimalInput>
            </div>
            <div className="col-6">
                    <label className="row">Fee</label>
                    <NumberDecimalInput onChangeValue={(val: number) => { inputFee = val; }}></NumberDecimalInput>
            </div>
          </div>
          <div className="form-group row ms-3 mt-2">
            <div className="col-6 ">
                    <label className="row">Stock Price</label>
                    <NumberDecimalInput onChangeValue={(val: number) => { inputPrice = val; }}></NumberDecimalInput>
            </div>
          </div>
          <div className="form-group row mt-3">            
                <div className="form-group col-12">
                    <ButtonCustom btnType={ButtonType.Update} text={'Sell'} onClick={() => sell({
                        stockId: stock?.id,
                        return: inputReturn,
                        returnFee: inputFee,
                        returnStockPrice: inputPrice
                    })} />   
            </div>
          </div>       
        </div>, document.body)}
      </>
  );
}