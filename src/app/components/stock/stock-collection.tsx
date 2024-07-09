import { Switch } from '@nextui-org/react';
import { useState } from "react";

import { CurrencyModal } from "../modal/currency-modal";

import { ErrorMessageModal, ErrorModalProps } from '../modal/error-message-modal';
import { StockActive } from './stock-active';

import { NewStockModal } from './modal/new-stock-modal';
import { StockReferenceModal } from './modal/stock-reference-modal';
import { StockSelled } from './stock-selled';
import { StockWatchList } from './watch-list/stock-watch-list';
import { Deposit } from '../deposit/deposit';
import { DepositType } from '../../domain/deposit/deposit-type';

export function StockCollection() {

    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
    const [showSelledStocks, setShowSelledStocks] = useState(false);
    const [openNewStockReferenceModal, setOpenNewStockReferenceModal] = useState(false);
    const [openStockModal, setOpenNewStockModal] = useState(false);
    const [openNewCurrencyModal, setOpenNewCurrencyModal] = useState(false);

    return (
        <>
            {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}
            {openStockModal && <NewStockModal onClose={() => setOpenNewStockModal(false)}
                onCloseAndReload={() => {
                    setOpenNewStockModal(false);
                }} />}

            {openNewStockReferenceModal && <StockReferenceModal onClose={() => setOpenNewStockReferenceModal(false)} />}
            {openNewCurrencyModal && <CurrencyModal onClose={() => setOpenNewCurrencyModal(false)} />}
            <div className="ms-2">
                <h2 className="mt-4">Stocks</h2>
                <div className="row container-separator" />
                <div className="row mt-3 mb-3 ">
                    <div className="col-1">
                        <button type="button" className="btn btn-success" style={{ "width": "120px" }} onClick={() => setOpenNewStockModal(true)}>
                            <span className="me-1">Stock</span>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                    </div>
                    <div className="col-1 ">
                        <button type="button" className="btn btn-success" style={{ "width": "120px" }} onClick={() => setOpenNewStockReferenceModal(true)}>
                            <span className="me-1">Stock Ref</span>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                    </div>
                    <div className="col-1">
                        <button type="button" className="btn btn-success" style={{ "width": "120px" }} onClick={() => { setOpenNewCurrencyModal(true); }}>
                            <span className="me-1">Currency</span>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                    </div>
                    <div className="col-1" style={{ "width": "80px" }}>
                        <Switch checked={false} size={"lg"} about="" className="mt-1" onChange={(ev) => { setShowSelledStocks(!showSelledStocks) }} />
                    </div>
                    <div className="col-1">
                        <p>Switch to Closed Stocks</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-11 mt-1">
                        {showSelledStocks && <StockSelled />}
                        {!showSelledStocks && <StockActive />}
                    </div>
                </div>
                <div className="row me-1">
                    <div className="col-6">
                        <h2 className="mt-4">Watch List</h2>
                        <div className="row container-separator" />
                        <StockWatchList></StockWatchList>
                    </div>
                    <div className="col-5 ms-3">
                        <h2 className="mt-4">Deposits</h2>
                        <div className="row container-separator" />
                        <Deposit depositType={DepositType.Stock} ></Deposit>
                    </div>
                    </div>
            </div>
        </>);
}