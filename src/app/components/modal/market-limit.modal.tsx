import { useState } from "react";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message-modal";
import { createPortal } from "react-dom";
import { NumberDecimalInput } from "../util/number-decimal.input.component";
import { ButtonCustom, ButtonType } from "../util/button.component";


export interface MarketLimitModalValue {    
    stopLoss: number;
    sellLimit: number;
}

interface Props {
    stopLoss: number,    
    sellLimit: number,
    onClose: any,
    onUpdateAndClose: (marketLimitValue: MarketLimitModalValue) => void
}

export function MarketLimitModal({ onClose, stopLoss, sellLimit, onUpdateAndClose }: Props) {
    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });

    const marketLimitChanged: MarketLimitModalValue = { stopLoss: stopLoss, sellLimit: sellLimit } as MarketLimitModalValue;
    
    return (
        <>
            {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}
            {createPortal(
                <div className="market-limit-modal">
                    <div className="d-flex flex-row-reverse">
                        <ButtonCustom btnType={ButtonType.Close} onClick={onClose}/>                        
                    </div>
                    <h3 className="mt-4">Market Limit</h3>
                    <div className="form-group row ms-3">
                        <div className="col-5" style={{ "textAlign": "left" }}>
                            <label>Stop Loss</label>
                            <NumberDecimalInput placeHolder={"Stop Loss"} initialValue={stopLoss} onChangeValue={(stopLossInput:number) => marketLimitChanged.stopLoss=stopLossInput}></NumberDecimalInput>
                        </div>
                        <div className="col-5 ms-4" style={{ "textAlign": "left" }}>
                            <label>Sell Limit</label>
                            <NumberDecimalInput placeHolder={"Sell Limit"} initialValue={sellLimit} onChangeValue={(sellLimit: number) => marketLimitChanged.sellLimit = sellLimit}></NumberDecimalInput>
                        </div>
                    </div>
                    <div className="form-group row mt-4">
                        <div className="form-group col-12">
                            <ButtonCustom btnType={ButtonType.Update} onClick={() => { onUpdateAndClose.call(marketLimitChanged, marketLimitChanged); }} />    
                        </div>
                    </div>
                </div>, document.body)}
        </>
    );
}