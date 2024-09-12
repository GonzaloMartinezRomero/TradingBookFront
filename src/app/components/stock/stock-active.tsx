"use client";

import { useEffect, useState } from "react";

import { deleteStock, getActiveStocks, updateStockMarketLimit } from "../../services/stock.service";

import { MarketLimit } from '../../domain/market-limit.model';

import { DateFormat } from "../util/date.component";

import { TextFormat } from "../util/text.component";

import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message.modal";
import { YesNoMessageModal } from "../modal/yes-no-message.modal";
import { ButtonCustom, ButtonType } from "../util/button.component";
import { MarketOperation } from "../util/market-operation.component";
import { MonetaryAmount } from "../util/monetary-amount.component";
import { PercentageIndicator } from "../util/percentage-indicator.component";
import { StockChartLink } from "../util/reference-url.component";
import { MarketLimitModal, MarketLimitModalValue } from "./modal/market-limit.modal";
import { SellStockModal } from "./modal/sell-stock.modal";
import { StockActiveDto } from "../../domain/stocks/stock-active-dto.model";
import { StockMarketLimitProps } from "../../domain/stocks/stock-market-limit-props.model";

interface StockOperationModalProps {
    isOpen: boolean;
    stockId: number;
}

export function StockActive() {
    
    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
    const [openSellStockModal, setSellStockModal] = useState<StockOperationModalProps>({ isOpen: false, stockId: 0 });
    const [openMarketLimits, setOpenMarketLimits] = useState<StockMarketLimitProps>({ isOpen: false });
    const [stockCollection, setStockCollection] = useState<StockActiveDto[]>([]);
    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState<StockOperationModalProps>({ isOpen: false, stockId: 0 });

    useEffect(() => { updateStocks(); });

    function updateStocks() {

        getActiveStocks().then(value =>
        {
            if (stockCollection.length !== value.length)
                setStockCollection(value);

        }).catch(err => setErrorModal({ isOpen: true, msg: err }));
    }

    function deleteSelectedStock(stockId: number) {
        deleteStock(stockId).then(x => updateStocks()).catch(err => setErrorModal({ isOpen: true, msg: err }));
    }       

    return (
        <>
            {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}
         
            {openDeleteConfirmationModal.isOpen && <YesNoMessageModal msg="Do you want remove this stock?"
                onYesResponse={() => {
                    deleteSelectedStock(openDeleteConfirmationModal.stockId);
                    setOpenDeleteConfirmationModal({ isOpen: false, stockId: 0 })
                }}
                onNoResponse={() => { setOpenDeleteConfirmationModal({ isOpen: false, stockId: 0 }) }} />}

            {openSellStockModal.isOpen && <SellStockModal stockId={openSellStockModal.stockId}
                onClose={() => setSellStockModal({ isOpen: false, stockId: 0 })}
                onStockUpdateAndClose={() => {
                    setSellStockModal({ isOpen: false, stockId: 0 });
                    updateStocks();
                }} />}

            {openMarketLimits.isOpen && <MarketLimitModal stopLoss={openMarketLimits.stopLoss ?? 0}
                sellLimit={openMarketLimits.sellLimit ?? 0}
                onClose={() => setOpenMarketLimits({ isOpen: false })}
                onUpdateAndClose={(marketLimit: MarketLimitModalValue) => {
                    updateStockMarketLimit({ stockId: openMarketLimits.stockId, sellLimit: marketLimit.sellLimit, stopLoss: marketLimit.stopLoss } as MarketLimit)
                        .then(() => {
                            setOpenMarketLimits({ isOpen: false });
                            updateStocks();
                        });
                }} />}
                          
               
            <table className="mt-1 table-header text-center" style={{ "width": "100%" }}>
                <thead>
                    <tr className="table-success">
                        <th colSpan={4} style={{ "borderRight": "1px solid black" }}>BUY INFORMATION</th>
                        <th colSpan={3} style={{ "borderRight": "1px solid black" }}>INVEST</th>
                        {
                             <th colSpan={4} style={{ "borderRight": "1px solid black" }}>CURRENT STATE</th>
                        }
                        {
                            <th colSpan={3} style={{ "borderRight": "1px solid black" }}>STATUS</th>
                        }
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
                        <th>Estimated Return</th>
                        <th>Estimated Earn</th>
                        <th>Stop Loss</th>
                        <th>Sell Limit</th>
                        <th>Action</th>
                        <th>Chart</th>
                        <th>Market</th>
                        <th>Sell</th>
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
                                         <DateFormat date={value.buyDate}/>
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
                                             <MonetaryAmount amount={value.currentPrice} />
                                         </td>
                                         <td>
                                             <PercentageIndicator amount={value.percentajeDiff} />
                                         </td>
                                         <td>
                                             <MonetaryAmount amount={value.estimatedReturnPrice} />
                                         </td>
                                         <td>
                                            <MonetaryAmount amount={value.estimatedEarn} />
                                         </td>
                                         <td>
                                             <MonetaryAmount amount={value.stopLoss} />
                                         </td>
                                         <td>
                                            <MonetaryAmount amount={value.sellLimit} />
                                         </td>
                                         <td>
                                             <MarketOperation operation={value.recomendedAction} />
                                         </td>
                                         <td>
                                             <StockChartLink url={value.chartReferenceUrl} />
                                         </td>
                                     <td>
                                         <ButtonCustom btnType={ButtonType.Market} onClick={() => {
                                             setOpenMarketLimits({ isOpen: true, stockId: value.id, sellLimit: value.sellLimit, stopLoss: value.stopLoss });
                                         } }/> 
                                     </td>
                                     <td>
                                         <ButtonCustom btnType={ButtonType.Sell} onClick={() => {
                                             setSellStockModal({ isOpen: true, stockId: value.id });
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
                        }
                    )
                    }
                </tbody>
            </table>
        </>
    );
}