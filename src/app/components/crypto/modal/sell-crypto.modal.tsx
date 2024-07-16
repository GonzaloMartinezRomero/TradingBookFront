import { useState } from "react";
import { createPortal } from "react-dom";

import { SellCryptoDto } from "../../../domain/crypto/sell-crypto.model";
import { sellCrypto } from "../../../services/crypto.service";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";
import { ButtonCustom, ButtonType } from "../../util/button.component";
import { NumberDecimalInput } from "../../util/number-decimal.input.component";

interface Props{
    cryptoId: number,
    onClose: any,
    onCryptoUpdateAndClose: any
}

export function SellCryptoModal({ cryptoId, onClose, onCryptoUpdateAndClose }:Props) {

  const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });  

  var inputReturnAmount: number = 0;
  var inputReturnFee: number = 0;
  var inputReturnPrice: number = 0;

  function sell(){

      const sellCryptoValue:SellCryptoDto =
      {        
        cryptoCurrencyId: cryptoId,
        returnAmount: inputReturnAmount,
        returnFee: inputReturnFee,         
        returnPrice: inputReturnPrice,         
      };

      sellCrypto(sellCryptoValue).then(value=>onCryptoUpdateAndClose()).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }
  
  return (
    <>
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    {createPortal(
        <div className="sell-crypto-modal">
            <div className="d-flex flex-row-reverse">
                <ButtonCustom btnType={ButtonType.Close} onClick={onClose}/>
          </div>
          <h3>Sell Crypto</h3>
          <div className="form-group row ms-3">
            <div className="col-6 ">
                <label className="row">Amount</label>
                <NumberDecimalInput onChangeValue={(val: number) => { inputReturnAmount = val; }}></NumberDecimalInput>
            </div>
            <div className="col-6">
                <label className="row">Fee</label>
                <NumberDecimalInput onChangeValue={(val: number) => { inputReturnFee = val; }}></NumberDecimalInput>              
            </div>
          </div>
          <div className="form-group row ms-3 mt-2">
            <div className="col-6 ">
              <label className="row">Crypto Price</label>
              <NumberDecimalInput onChangeValue={(val: number) => { inputReturnPrice = val; }}></NumberDecimalInput>        
            </div>
          </div>
          <div className="form-group row mt-3">            
                <div className="form-group col-12">
                <ButtonCustom btnType={ButtonType.Update} text={'Sell'} onClick={() => sell()} />  
            </div>
          </div>
        </div>,
      document.body)}
      </>
  );
}