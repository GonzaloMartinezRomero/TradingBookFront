"use client";

import { useEffect, useState } from "react";


import { getSelledStocks } from "../../services/stock.service";



import { DateFormat } from "../util/date.component";
import { TextFormat } from "../util/text.component";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message.modal";
import { MonetaryAmount } from "../util/monetary-amount.component";
import { PercentageIndicator } from "../util/percentage-indicator.component";
import { StockChartLink } from "../util/reference-url.component";
import { StockSelledDto } from "../../domain/stocks/stock-selled-dto.model";

export function StockSelled() {

    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
    const [stockCollection, setStockCollection] = useState<StockSelledDto[]>([]);

    useEffect(() => {      
        updateStocks();
    },[]);

    function updateStocks() {
        getSelledStocks().then(value => setStockCollection(value)).catch(err => setErrorModal({ isOpen: true, msg: err }));
    }

    return (
        <>
            {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}

            <table className="mt-1 table-header text-center" style={{ "width": "100%" }}>
                <thead>
                    <tr className="table-success">
                        <th colSpan={4} style={{ "borderRight": "1px solid black" }}>INFORMATION</th>
                        <th colSpan={3} style={{ "borderRight": "1px solid black" }}>INVEST</th>
                        <th colSpan={8} style={{ "borderRight": "1px solid black" }}>RETURN</th>
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
                        <th>Earn</th>
                        <th>Diff-Amount</th>
                        <th style={{ "borderLeft": "1px solid black" }}>Chart</th>
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
                                         <MonetaryAmount amount={value.returnEarn} />
                                    </td>
                                    <td>
                                         <PercentageIndicator amount={value.returnDiffAmount} />
                                    </td>
                                    <td style={{ "borderLeft": "1px solid black" }}>
                                         <StockChartLink url={value.chartReferenceUrl} />
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