import { useState } from "react";

import { createPortal } from "react-dom";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message.modal";
import { ButtonCustom, ButtonType } from "../../util/button.component";
import { NumberDecimalInput } from "../../util/number-decimal.input.component";
import { addDividend } from "../../../services/stock.service";


interface Props {
    onClose: any,
    onUpdateAndClose: any,
    stockId: number,
}

export function DividendModal({ onClose, onUpdateAndClose, stockId }: Props) {
    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
    const [amount, setAmount] = useState<number>(0);

    function updateDividend() {
        addDividend(stockId, amount).then(x => onUpdateAndClose()).catch(err => setErrorModal({ isOpen: true, msg: err }));
    }

    return (
        <>
            {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}
            {createPortal(
                <div className="dividend-modal">
                    <div className="d-flex flex-row-reverse">
                        <ButtonCustom btnType={ButtonType.Close} onClick={onClose}/>                        
                    </div>
                    <h3 className="mt-4">Add Dividends</h3>
                    <div className="form-group row ms-3">
                        <div className="col-5" >
                            <label>Dividend Amount</label>
                            <NumberDecimalInput placeHolder={"Amount"} initialValue={amount} onChangeValue={(x: number) => setAmount(x)}></NumberDecimalInput>
                        </div>
                    </div>
                    <div className="form-group row mt-4">
                        <div className="form-group col-12">
                            <ButtonCustom btnType={ButtonType.Update} onClick={() => { updateDividend(); }} />    
                        </div>
                    </div>
                </div>, document.body)}
        </>
    );
}