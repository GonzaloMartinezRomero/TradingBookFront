import { useEffect, useState } from "react";
import { MonetaryAmount } from "../util/monetaryAmount";
import { PercentageIndicator } from "../util/percentageIndicator";
import { getSelledCryptos } from "../../services/crypto.service";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message-modal";
import { CryptoSelledDto } from "../../domain/crypto/crypto-selled.model";
import { DateFormat } from "../util/date.component";
import { TextFormat } from "../util/text.component";

export function CryptoSelled() {

    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
    const [cryptoCollection, setCryptoCollection] = useState<CryptoSelledDto[]>([]);
    
    useEffect(() => {
        updateCryptoCollection();
    }, []);

    function updateCryptoCollection() {
        getSelledCryptos().then(value => setCryptoCollection(value))
            .catch(err => setErrorModal({ isOpen: true, msg: err }));
    }

    return (
        <>
            {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}
            <div className="row">
                <div className="col mt-1">
                    <table className="mt-1 table-header" style={{ "width": "85%" }}>
                        <thead>
                            <tr className="table-success">
                                <th colSpan={4} className="text-center" style={{ "borderRight": "1px solid black" }}>EXCHANGE FROM</th>
                                <th colSpan={5} className="text-center" style={{ "borderRight": "1px solid black" }}>EXCHANGE TO</th>
                                <th colSpan={8} className="text-center">RETURN</th>
                            </tr>
                            <tr className="text-center table-secondary table-group-divider" style={{ "fontStyle": "oblique" }}>
                                <th>From</th>
                                <th>Amount</th>
                                <th>Fee</th>
                                <th style={{ "borderRight": "1px solid black" }}>Deposit</th>
                                <th>To</th>
                                <th>Pair</th>
                                <th>Price</th>
                                <th>Amount</th>
                                <th style={{ "borderRight": "1px solid black" }}>Date</th>
                                <th>Price</th>
                                <th>%</th>
                                <th>Date</th>
                                <th>Return</th>
                                <th>Fee</th>
                                <th>AmountWithFee</th>
                                <th>Earn</th>
                                <th>DiffAmount</th>
                            </tr>
                        </thead>
                        <tbody className="text-center table-items">
                            {cryptoCollection.map((value, index) => {
                                return (<>
                                    <tr>
                                        <td>
                                            <TextFormat text={value.cryptoCurrencyFrom} />
                                        </td>
                                        <td>
                                            <MonetaryAmount amount={value.amountInvest} />
                                        </td>
                                        <td>
                                            <MonetaryAmount amount={value.feeInvest} />
                                        </td>
                                        <td >
                                            <MonetaryAmount amount={value.deposit} />
                                        </td>
                                        <td style={{ "borderLeft": "1px solid black" }}>
                                            <TextFormat text={value.cryptoCurrencyTo} />                                            
                                        </td>
                                        <td>
                                            <TextFormat text={value.cryptoReference} />                
                                        </td>
                                        <td>
                                            <MonetaryAmount amount={value.cryptoPrice} />
                                        </td>
                                        <td>
                                            <MonetaryAmount amount={value.exchangedAmount} />
                                        </td>
                                        <td>
                                            <DateFormat date={value.buyDate} />
                                        </td>
                                        <td style={{ "borderLeft": "1px solid black" }}>
                                            <MonetaryAmount amount={value.returnPrice} />
                                        </td>
                                        <td>
                                            <PercentageIndicator amount={value.returnDiffPricePercentage} />
                                        </td>
                                        <td>
                                            <DateFormat date={value.sellDate} />
                                        </td>
                                        <td>
                                            <MonetaryAmount amount={value.returnAmount} />
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
                                            <PercentageIndicator amount={value.returnDiffAmountEarnedPercentage} />
                                        </td>
                                    </tr>
                                </>); })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}