import { Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";


import { CollapsableContainer } from "../util/collapsable.container.component";

import { MarketOperation } from "../util/marketOperation";
import { MonetaryAmount } from "../util/monetaryAmount";
import { PercentageIndicator } from "../util/percentageIndicator";

import { CryptoWatchList } from "./cryptoWatchList";
import { CryptoReferenceModal } from "./modal/cryptoReference.modal";
import { NewCryptoModal } from "./modal/newCrypto.modal";
import { OperationCryptoModal } from "./modal/operationsCrypto.modal";
import { deleteCrypto, getCryptos, updateCryptoMarketLimit } from "../../services/crypto.service";
import { CryptoCurrency } from "../../domain/crypto/crypto.model";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message-modal";
import { YesNoMessageModal } from "../modal/yes-no-message-modal";
import { CurrencyModal } from "../modal/currency-modal";
import { MarketLimitModal, MarketLimitModalValue } from "../util/MarketLimit.Modal";
import { MarketLimit } from "../../domain/market-limit.model";

interface OperationModalProps{
    isOpen:boolean;
    cryptoId:number;
}

interface CryptoMarketLimitProps {
    isOpen: boolean;
    cryptoId?: number;
    stopLoss?: number;
    sellLimit?: number;
}

export function CryptoCollection(){

const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});    
const [cryptoCollection, setCryptoCollection] = useState<CryptoCurrency[]>();
const [showClosedCryptos, setShowClosedCryptos] = useState<boolean>(false);
const [openCryptoModal, setOpenNewCryptoModal] = useState(false);
const [openMarketLimits, setOpenMarketLimits] = useState<CryptoMarketLimitProps>({ isOpen: false });
const [openDeleteModal, setOpenDeleteModal] = useState<OperationModalProps>({isOpen:false,cryptoId:0});
const [openCryptoRefModal, setOpenCryptoRefModal] = useState(false);
const [openOperationCrypto, setOpenOperationCrypto] = useState<OperationModalProps>({isOpen:false, cryptoId:0})
const [openNewCurrencyModal, setOpenNewCurrencyModal] = useState(false);    
    
useEffect(()=>{
    updateCryptoCollection();    
},[]);

function updateCryptoCollection(){
    getCryptos().then(value=>setCryptoCollection(value))
                .catch(err=>setErrorModal({isOpen:true,msg:err}));
}

function deleteSelectedCrypto(id:number){

    deleteCrypto(id).then(value=>updateCryptoCollection())
                    .catch(err=>setErrorModal({isOpen:true,msg:err}));
}

return(
    <>        
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    {openCryptoModal && <NewCryptoModal  onClose={()=>setOpenNewCryptoModal(false)} 
                                         onCloseAndReload={()=>{
                                                                    setOpenNewCryptoModal(false);
                                                                    updateCryptoCollection();
                                                                }}/>}      

    {openDeleteModal.isOpen && <YesNoMessageModal msg="Do you want remove this crypto?" 
                                                        onYesResponse={()=>{
                                                            deleteSelectedCrypto(openDeleteModal.cryptoId);
                                                            setOpenDeleteModal({isOpen:false,cryptoId:0});
                                                        }} 
                                                        onNoResponse={()=>{setOpenDeleteModal({isOpen:false,cryptoId:0})}}/>}

    {openCryptoRefModal && <CryptoReferenceModal onClose={()=>setOpenCryptoRefModal(false)}/>}                                                              
    
    {openOperationCrypto.isOpen && <OperationCryptoModal cryptoId={openOperationCrypto.cryptoId} 
                                                          onClose={()=>{setOpenOperationCrypto({isOpen:false,cryptoId:0})}}
                                                          onCryptoUpdateAndClose={()=>{
                                                            setOpenOperationCrypto({isOpen:false,cryptoId:0});
                                                            updateCryptoCollection();
                                                          }}        />}   

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

     <CollapsableContainer title="Crypto">
     <div className="row mt-3 mb-3 ">
            <div className="col-1">          
                <button type="button" className="btn btn-success" style={{"width":"130px"}}  onClick={()=>setOpenNewCryptoModal(true)} >
                    <span className="me-1">Crypto</span>
                    <i className="bi bi-plus-circle"></i>
                </button>  
            </div>        
            <div className="col-1 ">          
                <button type="button" className="btn btn-success" style={{"width":"130px"}} onClick={()=>{setOpenCryptoRefModal(true)}}>
                    <span className="me-1">Crypto Ref</span>
                    <i className="bi bi-plus-circle"></i>
                </button>  
            </div>    
            <div className="col-1">
                <button type="button" className="btn btn-success" style={{"width":"120px"}} onClick={()=>setOpenNewCurrencyModal(true)}>
                    <span className="me-1">Currency</span>
                    <i className="bi bi-plus-circle"></i>
                </button>                                             
            </div>     
            <div className="col-1" style={{"width":"80px"}}>
                <Switch checked={false} size={"lg"} about="" className="mt-1" onChange={(ev)=>{setShowClosedCryptos(!showClosedCryptos)}}/>                                                                          
            </div>                                    
            <div className="col-1">
                <p>Switch To Closed Cryptos</p>
            </div>            
        </div>        
        <div className="row">
            <div className="col mt-1">
                <table className="mt-1 table-header" style={{"width":"85%"}}>
                    <thead>
                        <tr className="table-success">
                            <th colSpan={4} className="text-center" style={{"borderRight":"1px solid black"}}>EXCHANGE FROM</th>                
                            <th colSpan={5} className="text-center" style={{"borderRight":"1px solid black"}}>EXCHANGE TO</th>                
                            {!showClosedCryptos && 
                            (<>
                                    <th colSpan={4} className="text-center" style={{ "borderRight": "1px solid black" }}>CURRENT STATE</th>                      
                                    <th colSpan={3} className="text-center" style={{ "borderRight": "1px solid black" }}>STATUS</th>                      
                            </>)}                            
                            {showClosedCryptos &&  
                            (<>
                                <th colSpan={8} className="text-center">RETURN</th>         
                            </>)}
                        </tr>
                        <tr className="text-center table-secondary table-group-divider" style={{"fontStyle":"oblique"}}>
                            <th>From</th>                                                       
                            <th>Amount</th>
                            <th>Fee</th>
                            <th style={{"borderRight":"1px solid black"}}>Deposit</th>
                            <th>To</th>
                            <th>Pair</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th style={{"borderRight":"1px solid black"}}>Date</th>    
                            {!showClosedCryptos && 
                            (<>
                            <th>Price</th>
                            <th>%</th>
                                    <th>Estimated Return</th>
                                    <th>Estimated Earn</th>
                                    <th>Stop Loss</th>
                                    <th>Sell Limit</th>
                                    <th style={{ "borderRight": "1px solid black" }}>Action</th>
                                    <th>Chart</th>
                                    <th>Market</th>
                                    <th>Sell</th>
                            </>)}
                            {showClosedCryptos && 
                            (<>
                            <th>Price</th>
                            <th>%</th>
                            <th>Date</th>
                            <th>Return</th>
                            <th>Fee</th>
                            <th>AmountWithFee</th>
                            <th>Earn</th>
                            <th>DiffAmount</th>
                            </>)}
                        </tr>
                    </thead>
                    <tbody className="text-center table-items">          
                            {cryptoCollection !== undefined && cryptoCollection?.map((value,index)=>{
                                if((showClosedCryptos && value.isSelled)||(!showClosedCryptos && !value.isSelled))
                                {
                                    return (  
                                        <>  
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
                                            <td style={{"borderLeft":"1px solid black"}}>
                                                {value.cryptoCurrencyTo}
                                            </td>
                                            <td>
                                                {value.cryptoReference}
                                            </td>
                                            <td>
                                                <MonetaryAmount amount={value.cryptoPrice}/>
                                            </td>
                                            <td>
                                                <MonetaryAmount amount={value.exchangedAmount}/>
                                            </td>
                                            <td>
                                               {value.buyDate}
                                            </td>
                                            {!showClosedCryptos && 
                                            (<>
                                            <td style={{"borderLeft":"1px solid black"}}>
                                                {!value.isSelled && <MonetaryAmount amount={value.currentPrice}/>}
                                            </td>
                                            <td>
                                                {!value.isSelled && <PercentageIndicator amount={value.currentDiffPercentage}/>}
                                            </td>
                                            <td>
                                                 {!value.isSelled && <MonetaryAmount amount={value.estimatedReturnPrice}/>}
                                                    </td>
                                                    <td>
                                                        {!value.isSelled && <MonetaryAmount amount={value.estimatedEarn} />}
                                                    </td>
                                                    <td>
                                                        {!value.isSelled && <MonetaryAmount amount={value.stopLoss} />}
                                                    </td>
                                                    <td>
                                                        {!value.isSelled && <MonetaryAmount amount={value.sellLimit} />}
                                                    </td>
                                            <td>          
                                                {!value.isSelled && <MarketOperation operation={value.recomendedAction}/>}
                                            </td>
                                            </>)}
                                            {showClosedCryptos && 
                                            (<>
                                            <td style={{"borderLeft":"1px solid black"}}>
                                                {value.isSelled && <MonetaryAmount amount={value.returnPrice}/>}
                                            </td>
                                            <td> 
                                                {value.isSelled && <PercentageIndicator amount={value.returnDiffPricePercentage}/>}
                                            </td>
                                            <td>
                                                {value.isSelled && value.sellDate}
                                            </td>
                                            <td>
                                                {value.isSelled && <MonetaryAmount amount={value.returnAmount}/>}   
                                            </td>
                                            <td>
                                                {value.isSelled && <MonetaryAmount amount={value.returnFee}/>}
                                            </td>
                                            <td>
                                                {value.isSelled && <MonetaryAmount amount={value.returnAmountWithFee}/>}
                                            </td>
                                            <td>
                                                        {value.isSelled && <MonetaryAmount amount={value.returnEarn}/>}
                                            </td>
                                            <td>
                                                {value.isSelled && <PercentageIndicator amount={value.returnDiffAmountEarnedPercentage}/>}
                                            </td>                                        
                                            </>)}                                   
                                                <td>
                                                    <button className="btn btn-success"
                                                        onClick={() => {
                                                            setOpenMarketLimits({ isOpen: true, cryptoId: value.id, sellLimit: value.sellLimit, stopLoss: value.stopLoss });
                                                        }}>
                                                        <i className="bi bi-sliders2-vertical"></i>
                                                    </button>
                                                </td>
                                                <td>                
                                                <button className="btn btn-warning" 
                                                        onClick={()=>{
                                                         setOpenOperationCrypto({isOpen:true,cryptoId:value.id});
                                                        }}>
                                                    <i className="bi bi-box-arrow-up-right"></i>
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={()=>{setOpenDeleteModal({isOpen:true,cryptoId:value.id});}}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>                                            
                                        </tr>  
                                        </>
                                    );
                                }
                            })
                            }      
                    </tbody>
                </table>
            </div>
        </div>    
     </CollapsableContainer>         
     <CollapsableContainer title="Watch List">
        <CryptoWatchList/>
     </CollapsableContainer>        
    </>
);}