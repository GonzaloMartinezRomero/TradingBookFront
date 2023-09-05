import { getCryptoById, sellCryptoCurrency, updateCryptoMarketLimit } from "@/app/apiService/cryptoApiService";
import { CryptoCurrency } from "@/app/apiService/model/crypto.model";
import { MarketLimit } from "@/app/apiService/model/marketLimit.model";
import { SellCrypto } from "@/app/apiService/model/sellCrypto.model";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ErrorMessageModal, ErrorModalProps } from "../../util/errorMessageModal";

interface Props{
    cryptoId: number,
    onClose: any,
    onCryptoUpdateAndClose: any
}

export function OperationCryptoModal({ cryptoId, onClose, onCryptoUpdateAndClose }:Props) {

  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});
  const [crypto, setCrypto] = useState<CryptoCurrency>();

  const inputReturnAmount = useRef<HTMLInputElement>(null);
  const inputReturnFee = useRef<HTMLInputElement>(null);
  const inputReturnPrice = useRef<HTMLInputElement>(null);

  const inputStopLoss = useRef<HTMLInputElement>(null);
  const inputSellLimit = useRef<HTMLInputElement>(null);
  
  useEffect(()=>{
    getCryptoById(cryptoId).then((value)=>{setCrypto(value)}).catch(err=>setErrorModal({isOpen:true,msg:err}));
  },
  []); 

  function sell(){

      const sellCryptoValue:SellCrypto =
      {        
        cryptoCurrencyId: cryptoId,
        returnAmount: inputReturnAmount.current?.value as unknown as number,
        returnFee: inputReturnFee.current?.value as unknown as number,         
        returnPrice: inputReturnPrice.current?.value as unknown as number,         
      };

      sellCryptoCurrency(sellCryptoValue).then(value=>onCryptoUpdateAndClose()).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function setMarketLimit(){

    const marketLimitValues: MarketLimit=
    {
      stockId:0,
      cryptoCurrencyId: cryptoId,
      sellLimit: inputSellLimit.current?.value as unknown as number,
      stopLoss: inputStopLoss.current?.value as unknown as number
    };

    updateCryptoMarketLimit(marketLimitValues).then(value=>onCryptoUpdateAndClose()).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  return (
    <>
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    {createPortal(
        <div className="operation-crypto-modal">
          <div className="d-flex flex-row-reverse">
            <button className="btn btn-secondary p-1 m-1" style={{ "width": "32px", "height": "33px" }} onClick={onClose}>
              <i className="bi-x" />
            </button>
          </div>
          <h3>Sell Crypto</h3>
          <div className="form-group row ms-3">
            <div className="col-6 ">
              <label className="row">Amount</label>
              <input type="text" className="form-control row" placeholder="Return" defaultValue={crypto?.returnAmount} ref={inputReturnAmount} disabled={crypto?.isSelled} />
            </div>
            <div className="col-6">
              <label className="row">Fee</label>
              <input type="text" className="form-control row" placeholder="Fee" defaultValue={crypto?.returnFee} ref={inputReturnFee} disabled={crypto?.isSelled}/>
            </div>
          </div>
          <div className="form-group row ms-3 mt-2">
            <div className="col-6 ">
              <label className="row">Crypto Price</label>
              <input type="text" className="form-control row" placeholder="Price" defaultValue={crypto?.returnPrice} ref={inputReturnPrice} disabled={crypto?.isSelled}/>
            </div>
          </div>
          <div className="form-group row mt-3">            
            <div className="form-group col-12">
              {!crypto?.isSelled && <button className="btn btn-success" 
                                           style={{ "width": "100px", "height": "40px" }} 
                                           onClick={()=>sell()}>
                                          Sell
                                    </button>}              

              {crypto?.isSelled && <button className="btn btn-success disabled" style={{ "width": "100px", "height": "40px" }}>Sell</button>}              
            </div>
          </div>

          <h3 className="mt-4">Market Limit</h3>
          <div className="form-group row ms-3">
            <div className="col-6">
              <label className="row">Stop Loss</label>
              <input type="text" className="form-control row" placeholder="Stop" defaultValue={crypto?.stopLoss} ref={inputStopLoss} disabled={crypto?.isSelled}/>
            </div>
            <div className="col-6">
              <label className="row">Sell Limit</label>
              <input type="text" className="form-control row" placeholder="Limit" defaultValue={crypto?.sellLimit} ref={inputSellLimit} disabled={crypto?.isSelled}/>
            </div>
          </div>
          <div className="form-group row mt-4">
            <div className="form-group col-12">
              <button className="btn btn-success" 
                      disabled={crypto?.isSelled}
                      style={{ "width": "100px", "height": "40px" }}
                      onClick={()=>setMarketLimit()}>
                        Update
              </button>
            </div>            
          </div>
        </div>,
      document.body)}
      </>
  );
}