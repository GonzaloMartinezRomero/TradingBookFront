"use client";

import { useEffect, useState } from "react";

import { deleteStock, getSelledStocks } from "../../services/stock.service";

import { StockSelledDto } from "../../domain/stocks/stock-selled-dto.model";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message.modal";
import { DateFormat } from "../util/date.component";
import { MonetaryAmount } from "../util/monetary-amount.component";
import { PercentageIndicator } from "../util/percentage-indicator.component";
import { StockChartLink } from "../util/reference-url.component";
import { TextFormat } from "../util/text.component";
import { ButtonCustom, ButtonType } from "../util/button.component";
import { YesNoMessageModal } from "../modal/yes-no-message.modal";
import { ModifyStockSelledModal } from "./modal/modify-stock-selled.modal";



interface StockGenericModalProps {
    isOpen: boolean;
    stockId: number;
}

export function StockSelled() {

    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
    const [stockCollection, setStockCollection] = useState<StockSelledDto[]>([]);
    const [openUpdateStockModal, setOpenUpdateStockModal] = useState<StockGenericModalProps>({ isOpen: false, stockId: 0 });
    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState<StockGenericModalProps>({ isOpen: false, stockId: 0 });

    useEffect(() => { updateStocks(); }, []);

    function updateStocks() {
        getSelledStocks().then(value => setStockCollection(value)).catch(err => setErrorModal({ isOpen: true, msg: err }));
    }

    function deleteSelectedStock(stockId: number) {
        deleteStock(stockId).then(x => updateStocks()).catch(err => setErrorModal({ isOpen: true, msg: err }));
    }  

    return (
        <>
            {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}

            {openUpdateStockModal.isOpen && <ModifyStockSelledModal
                onClose={() => setOpenUpdateStockModal({ isOpen: false, stockId: 0 })}
                onCloseAndReload={() => {
                    setOpenUpdateStockModal({ isOpen: false, stockId: 0 });
                    updateStocks();
                }}
                stockId={openUpdateStockModal.stockId} />}

            {openDeleteConfirmationModal.isOpen && <YesNoMessageModal msg="Do you want remove this stock?"
                onYesResponse={() => {
                    deleteSelectedStock(openDeleteConfirmationModal.stockId);
                    setOpenDeleteConfirmationModal({ isOpen: false, stockId: 0 })
                }}
                onNoResponse={() => { setOpenDeleteConfirmationModal({ isOpen: false, stockId: 0 }) }} />}

            <table className="mt-1 table-header text-center" style={{ "width": "100%" }}>
                <thead>
                    <tr className="table-success">
                        <th colSpan={4} style={{ "borderRight": "1px solid black" }}>INFORMATION</th>
                        <th colSpan={3} style={{ "borderRight": "1px solid black" }}>INVEST</th>
                        <th colSpan={9} style={{ "borderRight": "1px solid black" }}>RETURN</th>
                    </tr>
                    <tr className=" table-group-divider" style={{ "fontStyle": "oblique" }}>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Currency</th>
                        <th style={{ "borderRight": "1px solid black" }}>Date</th>
                        <th>Amount</th>
                        <th>Fee</th>
                        <th>Deposit</th>
                        <th style={{ "borderLeft": "1px solid black" }}>Price</th>
                        <th>%</th>
                        <th>Sell Date</th>
                        <th>Return</th>
                        <th>Fee</th>
                        <th>AmountWithFee</th>
                        <th>Dividends</th>
                        <th>Earn</th>
                        <th>Diff-Amount</th>
                        <th style={{ "borderLeft": "1px solid black" }}>Chart</th>
                        <th>Modify</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {stockCollection !== undefined && stockCollection?.map((value, index) => {
                        return (
                            <>
                                <tr className="table-items">
                                    <td>
                                        <TextFormat text={value.stockTick?.name} />                                        
                                    </td>
                                    <td>
                                        <MonetaryAmount amount={value.price} />
                                    </td>
                                    <td>
                                        <TextFormat text={value.currency?.code} />                                        
                                    </td>
                                    <td style={{ "borderRight": "1px solid black" }}>
                                        <DateFormat date= {value.buyDate}/>
                                    </td>
                                    <td>
                                        <MonetaryAmount amount={value.amount} />
                                    </td>
                                    <td>
                                        <MonetaryAmount amount={value.fee} />
                                    </td>
                                    <td>
                                        <MonetaryAmount amount={value.deposit} />
                                    </td>                                  
                                    <td style={{ "borderLeft": "1px solid black" }}>
                                        <MonetaryAmount amount={value.returnStockPrice}/>
                                    </td>
                                    <td>
                                       <PercentageIndicator amount={value.returnStockDiffPricePercentaje} />
                                    </td>
                                    <td>
                                        <DateFormat date={value.sellDate} />
                                    </td>
                                    <td>
                                         <MonetaryAmount amount={value.returnAmount}/>
                                    </td>
                                    <td>
                                        <MonetaryAmount amount={value.returnFee} />
                                    </td>
                                    <td>
                                       <MonetaryAmount amount={value.returnAmountWithFee} />
                                    </td>
                                    <td>
                                        <MonetaryAmount amount={value.dividends} />
                                    </td>
                                    <td>
                                         <MonetaryAmount amount={value.returnEarn} />
                                    </td>
                                    <td>
                                         <PercentageIndicator amount={value.returnDiffAmount} />
                                    </td>
                                    <td style={{ "borderLeft": "1px solid black" }}>
                                         <StockChartLink url={value.chartReferenceUrl} />
                                    </td>   
                                    <td>
                                        <ButtonCustom btnType={ButtonType.Modify} onClick={() => {
                                            setOpenUpdateStockModal({ isOpen: true, stockId: value.id });
                                        }} />
                                    </td>
                                    <td>
                                        <ButtonCustom btnType={ButtonType.Delete} onClick={() => {
                                            setOpenDeleteConfirmationModal({ isOpen: true, stockId: value.id });
                                        }} />
                                    </td>
                                </tr>
                            </>
                        );
                    })
                    }
                </tbody>
            </table>

        </>
    );
}