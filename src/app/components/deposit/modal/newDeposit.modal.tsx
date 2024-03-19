"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { DepositPlatform } from "../../../domain/deposit/deposit-platform.model";
import { Currency } from "../../../domain/currency.model";
import { getAllDepositPlatforms } from "../../../services/deposit-platform.service";
import { getCurrencies } from "../../../services/currency.service";
import { NewDeposit } from "../../../domain/deposit/new-deposit.model";
import { addDeposit } from "../../../services/deposit.service";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";

interface Props {
  onClose: any,
  onCloseAndReload: any
}

export function NewDepositModal({ onClose, onCloseAndReload }: Props) {

  const [platforms, setPlatforms] = useState<DepositPlatform[]>();
  const [currencies, setCurrencies] = useState<Currency[]>();
  const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });

  const inputPlatform = useRef<HTMLSelectElement>(null);
  const inputCurrency = useRef<HTMLSelectElement>(null);
  const inputDeposit = useRef<HTMLInputElement>(null);
  const inputFee = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getAllDepositPlatforms().then(value => setPlatforms(value)).catch(err => setErrorModal({ isOpen: true, msg: err }));
    getCurrencies().then(value => setCurrencies(value)).catch(err => setErrorModal({ isOpen: true, msg: err }));
  },
    []);

  function newDeposit() {

    const newDepositParsed: NewDeposit =
    {
      deposit: (inputDeposit.current?.value ?? "0") as unknown as number,
      fee: (inputFee.current?.value ?? "0") as unknown as number,
      currencyId: (inputCurrency.current?.value ?? "0") as unknown as number,
      platformId: (inputPlatform.current?.value ?? "0") as unknown as number
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
          <div className="m-4">
            <h3 className="mb-4">Crypto Reference</h3>
            <div className="form-group row">
              <div className="col-6">
                <label className="row">Platform</label>
                <select className="row form-select" aria-label="Platform" ref={inputPlatform}>
                  <option selected>Select</option>
                  {
                    platforms?.map((platformAux, index) => {
                      return (<option value={platformAux.id}>{platformAux.name}</option>);
                    })
                  }
                </select>
              </div>
              <div className="col-6">
                <label className="row">Currency</label>
                <select className="row form-select" aria-label="Currency" ref={inputCurrency}>
                  <option selected>Select</option>
                  {
                    currencies?.map((currencyAux, index) => {
                      return (<option value={currencyAux.id}>{currencyAux.name}</option>);
                    })
                  }
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-6">
                <label className="row">Deposit</label>
                <input type="number" className="form-control row" placeholder="Deposit" defaultValue={0} ref={inputDeposit} />
              </div>
              <div className="col-6">
                <label className="row">Fee</label>
                <input type="number" className="form-control row" placeholder="Fee" defaultValue={0} ref={inputFee} />
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