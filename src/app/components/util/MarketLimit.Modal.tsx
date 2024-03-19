import { useState } from "react";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message-modal";
import { createPortal } from "react-dom";
import { DecimalInput } from "./decimal.input.component";

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
                        <button className="btn btn-secondary p-1 m-1" style={{ "width": "32px", "height": "33px" }} onClick={onClose}>
                            <i className="bi-x" />
                        </button>
                    </div>
                    <h3 className="mt-4">Market Limit</h3>
                    <div className="form-group row ms-3">
                        <div className="col-5" style={{ "textAlign": "left" }}>
                            <label>Stop Loss</label>
                            <DecimalInput placeHolder={"Stop Loss"} initialValue={stopLoss} onChangeValue={(stopLossInput:number) => marketLimitChanged.stopLoss=stopLossInput}></DecimalInput>
                        </div>
                        <div className="col-5 ms-4" style={{ "textAlign": "left" }}>
                            <label>Sell Limit</label>
                            <DecimalInput placeHolder={"Sell Limit"} initialValue={sellLimit} onChangeValue={(sellLimit: number) => marketLimitChanged.sellLimit = sellLimit}></DecimalInput>
                        </div>
                    </div>
                    <div className="form-group row mt-4">
                        <div className="form-group col-12">
                            <button className="btn btn-success"
                                style={{ "width": "100px", "height": "40px" }}
                                onClick={() => { onUpdateAndClose.call(marketLimitChanged, marketLimitChanged);}}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>, document.body)}
        </>
    );
}