import { useState } from "react";
import { CryptoActiveDto } from "../../domain/crypto/crypto-active.model";
import { MarketLimit } from "../../domain/market-limit.model";
import { deleteCrypto, getActiveCryptos, updateCryptoMarketLimit } from "../../services/crypto.service";
import { CurrencyModal } from "../modal/currency-modal";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message-modal";
import { MarketLimitModal, MarketLimitModalValue } from "../modal/market-limit.modal";
import { YesNoMessageModal } from "../modal/yes-no-message-modal";
import { ButtonCustom, ButtonType } from "../util/button.component";
import { DateFormat } from "../util/date.component";
import { MarketOperation } from "../util/marketOperation";
import { MonetaryAmount } from "../util/monetaryAmount";
import { PercentageIndicator } from "../util/percentageIndicator";
import { TextFormat } from "../util/text.component";
import { SellCryptoModal } from "./modal/sell-crypto.modal";

interface OperationModalProps {
    isOpen: boolean;
    cryptoId: number;
}

interface CryptoMarketLimitProps {
    isOpen: boolean;
    cryptoId?: number;
    stopLoss?: number;
    sellLimit?: number;
}

export function CryptoActive() {

    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
    const [cryptoCollection, setCryptoCollection] = useState<CryptoActiveDto[]>([]);        
    const [openMarketLimits, setOpenMarketLimits] = useState<CryptoMarketLimitProps>({ isOpen: false });
    const [openDeleteModal, setOpenDeleteModal] = useState<OperationModalProps>({ isOpen: false, cryptoId: 0 });
    const [openCryptoRefModal, setOpenCryptoRefModal] = useState(false);
    const [openOperationCrypto, setOpenOperationCrypto] = useState<OperationModalProps>({ isOpen: false, cryptoId: 0 })
    const [openNewCurrencyModal, setOpenNewCurrencyModal] = useState(false);    


    function updateCryptoCollection() {
        getActiveCryptos().then(value => setCryptoCollection(value))
            .catch(err => setErrorModal({ isOpen: true, msg: err }));
    }

    function deleteSelectedCrypto(id: number) {

        deleteCrypto(id).then(value => updateCryptoCollection())
            .catch(err => setErrorModal({ isOpen: true, msg: err }));
    }

    return (
        <>
            {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}            

            {openDeleteModal.isOpen && <YesNoMessageModal msg="Do you want remove this crypto?"
                onYesResponse={() => {
                    deleteSelectedCrypto(openDeleteModal.cryptoId);
                    setOpenDeleteModal({ isOpen: false, cryptoId: 0 });
                }}
                onNoResponse={() => { setOpenDeleteModal({ isOpen: false, cryptoId: 0 }) }} />}

            {openOperationCrypto.isOpen && <SellCryptoModal cryptoId={openOperationCrypto.cryptoId}
                onClose={() => { setOpenOperationCrypto({ isOpen: false, cryptoId: 0 }) }}
                onCryptoUpdateAndClose={() => {
                    setOpenOperationCrypto({ isOpen: false, cryptoId: 0 });
                    updateCryptoCollection();
                }} />}

            {openNewCurrencyModal && <CurrencyModal onClose={() => setOpenNewCurrencyModal(false)} />}

            {openMarketLimits.isOpen && <MarketLimitModal stopLoss={openMarketLimits.stopLoss ?? 0}
                sellLimit={openMarketLimits.sellLimit ?? 0}
                onClose={() => setOpenMarketLimits({ isOpen: false })}
                onUpdateAndClose={(marketLimit: MarketLimitModalValue) => {
                    updateCryptoMarketLimit({ cryptoCurrencyId: openMarketLimits.cryptoId, sellLimit: marketLimit.sellLimit, stopLoss: marketLimit.stopLoss } as MarketLimit)
                        .then(() => {
                            setOpenMarketLimits({ isOpen: false });
                            updateCryptoCollection();
                        });
                }} />}

            <div className="row">
                <div className="col mt-1">
                    <table className="mt-1 table-header" style={{ "width": "85%" }}>
                        <thead>
                            <tr className="table-success">
                                <th colSpan={4} className="text-center" style={{ "borderRight": "1px solid black" }}>EXCHANGE FROM</th>
                                <th colSpan={5} className="text-center" style={{ "borderRight": "1px solid black" }}>EXCHANGE TO</th>
                                <th colSpan={4} className="text-center" style={{ "borderRight": "1px solid black" }}>CURRENT STATE</th>
                                <th colSpan={3} className="text-center" style={{ "borderRight": "1px solid black" }}>STATUS</th>
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
                                <th>Estimated Return</th>
                                <th>Estimated Earn</th>
                                <th style={{ "borderLeft": "1px solid black" }}>Stop Loss</th>
                                <th>Sell Limit</th>
                                <th style={{ "borderRight": "1px solid black" }}>Action</th>
                                <th>Config</th>
                                <th>Market</th>
                                <th>Sell</th>
                            </tr>
                        </thead>
                        <tbody className="text-center table-items">
                            {cryptoCollection.map((value, index) =>
                            {
                                return (<>
                                    <tr>
                                        <td>
                                            {value.cryptoCurrencyFrom}
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
                                            <MonetaryAmount amount={value.currentPrice}/>
                                        </td>
                                        <td>
                                            <PercentageIndicator amount={value.currentDiffPercentage}/>
                                        </td>
                                        <td>
                                            <MonetaryAmount amount={value.estimatedReturnPrice}/>
                                        </td>
                                        <td>
                                            <MonetaryAmount amount={value.estimatedEarn}/>
                                        </td>
                                        <td style={{ "borderLeft": "1px solid black" }}>
                                           <MonetaryAmount amount={value.stopLoss} />
                                        </td>
                                        <td>
                                           <MonetaryAmount amount={value.sellLimit} />
                                        </td>
                                        <td>
                                            <MarketOperation operation={value.recomendedAction} />
                                        </td>
                                        <td style={{ "borderLeft": "1px solid black" }}>
                                            <ButtonCustom btnType={ButtonType.Market} onClick={() => {
                                                setOpenMarketLimits({ isOpen: true, cryptoId: value.id, sellLimit: value.sellLimit, stopLoss: value.stopLoss });
                                            }} />                                             
                                        </td>
                                        <td>
                                            <ButtonCustom btnType={ButtonType.Sell} onClick={() => {
                                                setOpenOperationCrypto({ isOpen: true, cryptoId: value.id });
                                            }} /> 
                                        </td>
                                        <td>
                                            <ButtonCustom btnType={ButtonType.Delete} onClick={() => {
                                                setOpenDeleteModal({ isOpen: true, cryptoId: value.id });
                                            }} /> 
                                        </td>
                                    </tr>
                                </>);
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}