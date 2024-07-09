"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Currency } from "../../../domain/currency.model";
import { NewDeposit } from "../../../domain/deposit/new-deposit.model";
import { getCurrencies } from "../../../services/currency.service";
import { addDeposit } from "../../../services/deposit.service";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";
import { DropDownInput, DropDownValue } from "../../util/dropdown.input.component";

interface Props {
  onClose: any,
  onCloseAndReload: any
  platformDestinyId: number
}

export function NewDepositModal({ onClose, onCloseAndReload, platformDestinyId }: Props) {
     
  const [currencies, setCurrencies] = useState<Currency[]>();
  const currencyOptions: DropDownValue[] | undefined = currencies?.map((currencyAux) => { return { value: currencyAux.id, label: currencyAux.name } as DropDownValue });

  const[errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
   
  var currencySelectedId: number = 0;
  const inputDeposit = useRef<HTMLInputElement>(null);
  const inputFee = useRef<HTMLInputElement>(null);

  useEffect(() => {    
      getCurrencies().then(value => setCurrencies(value)).catch(err => setErrorModal({ isOpen: true, msg: err }));
      window.scrollTo(0, 0);
  },[]);

  function newDeposit() {

    const newDepositParsed: NewDeposit =
    {
      deposit: (inputDeposit.current?.value ?? "0") as unknown as number,
      fee: (inputFee.current?.value ?? "0") as unknown as number,
      currencyId: currencySelectedId,
      platformId: platformDestinyId
    }

    addDeposit(newDepositParsed).then(value => onCloseAndReload())
      .catch(err => setErrorModal({ isOpen: true, msg: err }));
  }

  return (
    <>
      {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}
      {createPortal(
        <div className="add-deposit-modal">
          <div className="d-flex flex-row-reverse">
            <button className="btn btn-secondary p-1 m-1" style={{ "width": "32px", "height": "33px" }} onClick={onClose}>
              <i className="bi-x" />
            </button>
          </div>
          <h1>New Deposit</h1>
          <div className="m-3">         
                <div className="form-group row">
                    <div className="col-6">
                        <label className="row ms-1">Deposit</label>
                        <input type="number" className="form-control" placeholder="Deposit" defaultValue={0} ref={inputDeposit} />
                    </div>
                    <div className="col-6">
                          <label className="row ms-1">Fee</label>
                        <input type="number" className="form-control" placeholder="Fee" defaultValue={0} ref={inputFee} />
                    </div>
                </div>
                <div className="row">            
              <div className="col-6">
                   <label className="row ms-1">Currency</label>
                   <DropDownInput values={currencyOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => currencySelectedId = valueSelected.value} ></DropDownInput>
              </div>
            </div>          
          </div>
          <div className="form-group row mt-2">
            <div className="form-group col-12">
              <button className="btn btn-success" style={{ "width": "130px", "height": "50px" }} onClick={() => newDeposit()}>Add</button>
            </div>
          </div>
        </div>
        ,
        document.body)}
    </>
  );
}