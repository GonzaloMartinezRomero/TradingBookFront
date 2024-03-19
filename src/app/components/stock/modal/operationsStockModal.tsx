import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SellStock } from "../../../domain/stocks/sell-stock.model";
import { Stock } from "../../../domain/stocks/stock.model";
import { getStockById, sellStock } from "../../../services/stock.service";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";

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

export function OperationsStockModal({ stockId, onClose, onStockUpdateAndClose }:Props) {

  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});

  const [stock,setStock] = useState<Stock>();

  const inputReturn = useRef<HTMLInputElement>(null);
  const inputFee = useRef<HTMLInputElement>(null);
  const inputPrice = useRef<HTMLInputElement>(null);
    
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
        <div className="operation-stock-modal">
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
        </div>, document.body)}
      </>
  );
}