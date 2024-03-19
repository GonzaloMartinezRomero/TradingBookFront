import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CryptoCurrency } from "../../../domain/crypto/crypto.model";
import { getCryptoById, sellCryptoCurrency, updateCryptoMarketLimit } from "../../../services/crypto.service";
import { SellCrypto } from "../../../domain/crypto/sell-crypto.model";
import { MarketLimit } from "../../../domain/market-limit.model";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";

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
        </div>,
      document.body)}
      </>
  );
}