import { getStockById, sellStock, updateStockMarketLimit } from "@/app/apiService/httpService";
import { MarketLimit } from "@/app/apiService/model/marketLimit.model";
import { SellStock } from "@/app/apiService/model/sellStock.model";
import { Stock } from "@/app/apiService/model/stock.model";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

interface MarketLimitInputValue{
  stockId: any;
  stopLoss:any;
  sellLimit:any;
}

export function OperationsStockModal({ stockId, onClose, onStockUpdateAndClose }:Props) {

  const [stock,setStock] = useState<Stock>();

  const inputReturn = useRef<HTMLInputElement>(null);
  const inputFee = useRef<HTMLInputElement>(null);
  const inputPrice = useRef<HTMLInputElement>(null);

  const inputStopLoss = useRef<HTMLInputElement>(null);
  const inputSellLimit = useRef<HTMLInputElement>(null);
  
  useEffect(()=>{
    getStockById(stockId).then(value=>setStock(value));
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

      sellStock(sellStockValue).then(value=>onStockUpdateAndClose());
  }

  function setMarketLimit(marketLimitInput: MarketLimitInputValue){

    const marketLimitValues: MarketLimit=
    {
      cryptoCurrencyId:0,
      stockId: marketLimitInput.stockId as number,
      sellLimit: marketLimitInput.sellLimit as number,
      stopLoss: marketLimitInput.stopLoss as number
    };

    updateStockMarketLimit(marketLimitValues).then(value=>onStockUpdateAndClose());
  }

  return (
    createPortal(
      <>
        <div className="operation-asset-modal">
          <div className="d-flex flex-row-reverse">
            <button className="btn btn-secondary p-1 m-1" style={{ "width": "32px", "height": "33px" }} onClick={onClose}>
              <i className="bi-x" />
            </button>
          </div>
          <h3>Sell {stock?.stockReference.name}</h3>
          <div className="form-group row ms-3">
            <div className="col-6 ">
              <label className="row">Return</label>
              <input type="text" className="form-control row" placeholder="Return" defaultValue={stock?.returnAmount} ref={inputReturn} disabled={stock?.isSelled} />
            </div>
            <div className="col-6">
              <label className="row">Fee</label>
              <input type="text" className="form-control row" placeholder="Fee" defaultValue={stock?.returnFee} ref={inputFee} disabled={stock?.isSelled}/>
            </div>
          </div>
          <div className="form-group row ms-3 mt-2">
            <div className="col-6 ">
              <label className="row">Stock Price</label>
              <input type="text" className="form-control row" placeholder="Price" defaultValue={stock?.returnStockPrice} ref={inputPrice} disabled={stock?.isSelled}/>
            </div>
          </div>
          <div className="form-group row mt-3">            
            <div className="form-group col-12">
              {!stock?.isSelled && <button className="btn btn-success" 
                                           style={{ "width": "100px", "height": "40px" }} 
                                           onClick={()=>sell({stockId:stock?.id,
                                                              return:inputReturn.current?.value,
                                                              returnFee:inputFee.current?.value,
                                                              returnStockPrice:inputPrice.current?.value})}>
                                          Sell
                                    </button>}              

              {stock?.isSelled && <button className="btn btn-success disabled" style={{ "width": "100px", "height": "40px" }}>Sell</button>}              
            </div>
          </div>

          <h3 className="mt-4">Market Limit</h3>
          <div className="form-group row ms-3">
            <div className="col-6">
              <label className="row">Stop Loss</label>
              <input type="text" className="form-control row" placeholder="Stop" defaultValue={stock?.stopLoss} ref={inputStopLoss} disabled={stock?.isSelled}/>
            </div>
            <div className="col-6">
              <label className="row">Sell Limit</label>
              <input type="text" className="form-control row" placeholder="Limit" defaultValue={stock?.sellLimit} ref={inputSellLimit} disabled={stock?.isSelled}/>
            </div>
          </div>
          <div className="form-group row mt-4">
            <div className="form-group col-12">
              <button className="btn btn-success" 
                      disabled={stock?.isSelled}
                      style={{ "width": "100px", "height": "40px" }}
                      onClick={()=>setMarketLimit(
                        {
                           stockId: stock?.id,
                           sellLimit: inputSellLimit.current?.value,
                           stopLoss: inputStopLoss.current?.value
                        })}>
                        Update
              </button>
            </div>            
          </div>
        </div>
      </>,
      document.body)
  );
}