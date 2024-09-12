"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Currency } from "../../../domain/currency.model";
import { NewDeposit } from "../../../domain/deposit/new-deposit.model";
import { getCurrencies } from "../../../services/currency.service";
import { addDeposit } from "../../../services/deposit.service";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message.modal";
import { DropDownInput, DropDownValue } from "../../util/dropdown.input.component";
import { NumberDecimalInput } from "../../util/number-decimal.input.component";
import { ButtonCustom, ButtonType } from "../../util/button.component";
import { DepositType } from "../../../domain/deposit/deposit-type.model";

interface Props {
  onClose: any,
  onCloseAndReload: any
}

export function NewDepositModal({ onClose, onCloseAndReload }: Props) {
     
  const [currencies, setCurrencies] = useState<Currency[]>();
    const currencyOptions: DropDownValue[] | undefined = currencies?.map((currencyAux) => { return { value: currencyAux.id, label: currencyAux.name } as DropDownValue });
    const depositTypeOptions: DropDownValue[] = [{ value: DepositType.Invest, label: DepositType[DepositType.Invest] },
                                                 { value: DepositType.Dividend, label: DepositType[DepositType.Dividend] }]

  const[errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
   
  var currencySelectedId: number = 0;
  var inputDeposit: number = 0;
  var inputFee: number = 0;
  var depositTypeId: number = 0;

  useEffect(() => {    
      getCurrencies().then(value => setCurrencies(value)).catch(err => setErrorModal({ isOpen: true, msg: err }));
      window.scrollTo(0, 0);
  },[]);

  function newDeposit() {

    const newDepositParsed: NewDeposit =
    {
        deposit: inputDeposit,
        fee: inputFee,
        currencyId: currencySelectedId,
        depositTypeId: depositTypeId
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
               <ButtonCustom btnType={ButtonType.Close} onClick={onClose} />
          </div>
          <h1>New Deposit</h1>
          <div className="m-3">         
                <div className="form-group row">
                      <div className="col-6">
                          <label className="row ms-1">Deposit Type</label>
                          <DropDownInput values={depositTypeOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => depositTypeId = valueSelected.value} ></DropDownInput>
                      </div>
                      <div className="col-6">
                          <label className="row ms-1">Deposit</label>
                          <NumberDecimalInput onChangeValue={(val: number) => { inputDeposit = val; }}></NumberDecimalInput>
                    </div>
                   
                </div>
                  <div className="row">            
                      <div className="col-6">
                          <label className="row ms-1">Fee</label>
                          <NumberDecimalInput onChangeValue={(val: number) => { inputFee = val; }}></NumberDecimalInput>
                      </div>
              <div className="col-6">
                   <label className="row ms-1">Currency</label>
                   <DropDownInput values={currencyOptions} onChangeSelectedValue={(valueSelected: DropDownValue) => currencySelectedId = valueSelected.value} ></DropDownInput>
              </div>
            </div>          
          </div>
          <div className="form-group row mt-2">
                  <div className="form-group col-12">
                      <ButtonCustom btnType={ButtonType.Add} onClick={() => newDeposit()}/>
                  </div>
          </div>
        </div>
        ,
        document.body)}
    </>
  );
}