"use client";

import { Switch } from '@nextui-org/react';
import { useState } from "react";

import { StockActive } from './stock-active';

import { CurrencyModal } from '../currency/currency.modal';
import { Deposit } from '../deposit/deposit.component';
import { ErrorMessageModal, ErrorModalProps } from '../modal/error-message.modal';
import { StockTickModal } from '../stockTick/stock-tick.modal';
import { StockWatchList } from '../stockWatch/stock-watch-list.component';
import { ButtonCustom, ButtonType } from '../util/button.component';
import { NewStockModal } from './modal/new-stock.modal';
import { StockSelled } from './stock-selled';

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

            {openNewStockReferenceModal && <StockTickModal onClose={() => setOpenNewStockReferenceModal(false)} />}
            {openNewCurrencyModal && <CurrencyModal onClose={() => setOpenNewCurrencyModal(false)} />}
            <div className="ms-2">
                <h2 className="mt-4">Stocks</h2>
                <div className="row container-separator" />
                <div className="row mt-3 mb-3 ">
                    <div className="col-1">
                        <ButtonCustom btnType={ButtonType.Add} text={'Stock'} onClick={() => { setOpenNewStockModal(true); }} />
                    </div>
                    <div className="col-1 ">
                        <ButtonCustom btnType={ButtonType.Add} text={'Stock Ref'} onClick={() => { setOpenNewStockReferenceModal(true); }} />                        
                    </div>
                    <div className="col-1">
                        <ButtonCustom btnType={ButtonType.Add} text={'Currency'} onClick={() => { setOpenNewCurrencyModal(true); }} />
                    </div>
                    <div className="col-1" style={{ "width": "80px" }}>
                        <Switch checked={false} size={"lg"} about="" className="mt-1" onChange={(ev) => { setShowSelledStocks(!showSelledStocks) }} />
                    </div>
                    <div className="col-1">
                        <p>Switch to Closed Stocks</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-1 me-3">
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
                        <Deposit></Deposit>
                    </div>
                </div>
            </div>
        </>);
}