import { useEffect, useState } from "react";
import { NewStockModal } from "../modals/newStockModal";
import { StockReferenceModal } from "../modals/stockReferenceModal";
import { Switch } from '@nextui-org/react';
import { deleteStock, getStocks } from "@/app/apiService/httpService";
import { Stock } from "@/app/apiService/model/stock.model";
import { OperationsStockModal } from "../modals/operationsStockModal";
import { MonetaryAmount } from "../util/monetaryAmount";
import { PercentageIndicator } from "../util/percentageIndicator";
import { MarketOperation } from "../util/marketOperation";
import { TransactionState } from "../util/transactionState";
import { YesNoMessageModal } from "../modals/yesNoMessageModal";
import { CurrencyModal } from "../modals/currencyModal";

interface Props{
    onPropagateChanges?:any
}

interface StockOperationModalProps{
    isOpen:boolean;
    stockId:number;
}

export function StockCollection({onPropagateChanges}:Props){

    const [showClosedStocks, setShowClosedStocks] = useState(false);

    const [openNewStockReferenceModal, setOpenNewStockReferenceModal] = useState(false);
    const [openStockModal, setOpenNewStockModal] = useState(false);

    const [openOperationsStockModal, setOpenOperationsStockModal] = useState<StockOperationModalProps>({isOpen:false,stockId:0});
    const [stockCollection, setStockCollection] = useState<Stock[]>();        

    const [openYesNoMessageModal, setOpenYesNoMessageModal] = useState<StockOperationModalProps>({isOpen:false,stockId:0});

    const [openNewCurrencyModal, setOpenNewCurrencyModal] = useState(false);    

    useEffect(()=>
    {
        updateStocks();
    },[]);

    function updateStocks(){
        getStocks().then(value=>{

            setStockCollection(value);

            if(onPropagateChanges !== undefined){                                                                   
                onPropagateChanges();
            }
        });
    }
    
    function deleteSelectedStock(stockId:number){

        deleteStock(stockId).then(x=>{
            updateStocks();
        });
    }

return(
    <>        
    {openStockModal && <NewStockModal onClose={()=>setOpenNewStockModal(false)} 
                                         onCloseAndReload={()=>{
                                            setOpenNewStockModal(false);
                                            updateStocks();
                                         }} />}

    {openNewStockReferenceModal && <StockReferenceModal onClose={()=>setOpenNewStockReferenceModal(false)}/>}      

    {openYesNoMessageModal.isOpen && <YesNoMessageModal msg="Do you want remove this stock?" 
                                                        onYesResponse={()=>{
                                                            deleteSelectedStock(openYesNoMessageModal.stockId);
                                                            setOpenYesNoMessageModal({isOpen:false,stockId:0})
                                                        }} 
                                                        onNoResponse={()=>{setOpenYesNoMessageModal({isOpen:false,stockId:0})}}/>}

    {openNewCurrencyModal && <CurrencyModal onClose={()=>setOpenNewCurrencyModal(false)}/>}    

    <h2>Stocks</h2>
    <div className="row" style={{"border":"1px solid black"}}></div>
        <div className="row mt-3 mb-3 ">
            <div className="col-1">          
                <button type="button" className="btn btn-success" style={{"width":"120px"}} onClick={()=>setOpenNewStockModal(true)}>
                    <span className="me-1">Stock</span>
                    <i className="bi bi-plus-circle"></i>
                </button>  
            </div>        
            <div className="col-1 ">          
                <button type="button" className="btn btn-success" style={{"width":"120px"}} onClick={()=>setOpenNewStockReferenceModal(true)}>
                    <span className="me-1">Stock Ref</span>
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
                <Switch checked={false} size={"lg"} about="" className="mt-1" onChange={(ev)=>{setShowClosedStocks(!showClosedStocks)}}/>                                                                                     
            </div>                                    
            <div className="col-1">
                <p>Show Closed Stocks</p>
            </div>            
        </div>        
        <div className="row">
            <div className="col mt-1">
            {openOperationsStockModal.isOpen && <OperationsStockModal stockId={openOperationsStockModal.stockId} 
                                                               onClose={()=>setOpenOperationsStockModal({isOpen:false,stockId:0})}
                                                               onStockUpdateAndClose={()=>{
                                                                setOpenOperationsStockModal({isOpen:false,stockId:0});
                                                                updateStocks();                                                           
                                                            }}/>}
                <table className="mt-1" style={{"width":"100%"}}>
                    <thead>
                        <tr className="table-success">
                            <th colSpan={4} className="text-center" style={{"borderRight":"1px solid black"}}>STOCK INFORMATION</th>                
                            <th colSpan={3} className="text-center" style={{"borderRight":"1px solid black"}}>INVEST</th>                      
                            <th colSpan={3} className="text-center" style={{"borderRight":"1px solid black"}}>STOCK STATE</th>      
                            <th colSpan={7} className="text-center">RETURN</th>         
                        </tr>
                        <tr className="text-center table-secondary table-group-divider" style={{"fontStyle":"oblique"}}>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Currency</th>
                            <th style={{"borderRight":"1px solid black"}}>Date</th>    
                            <th>Amount</th>                                
                            <th>Fee</th>
                            <th>Deposit</th>                                
                            <th style={{"borderLeft":"1px solid black"}}>Price</th>
                            <th>%</th>         
                            <th>Action</th>       
                            <th style={{"borderLeft":"1px solid black"}}>Price</th>
                            <th>%</th>                
                            <th>Sell Date</th>                
                            <th>Return</th>
                            <th>Fee</th>                            
                            <th>AmountWithFee</th>
                            <th>Earn</th>                
                            <th>Diff-Amount</th>  
                        </tr>
                    </thead>
                    <tbody className="text-center">          
                            {
                            stockCollection?.map((value,index)=>{
                                if(showClosedStocks || !value.isSelled)
                                {
                                    return (  
                                        <>  
                                    <tr style={{"backgroundColor":"rgb(237, 222, 233)"}}>
                                            <td>
                                                <span className="media-body">{value.stockReference?.name}</span>
                                            </td>
                                            <td>
                                                <MonetaryAmount amount={value.price} /> 
                                            </td>
                                            <td>
                                                {value.currency?.code}
                                            </td>
                                            <td style={{"borderRight":"1px solid black"}}>
                                                {value.buyDate}
                                            </td>
                                            <td>
                                                {value.amount}
                                            </td>
                                            <td>
                                                {value.fee}
                                            </td>
                                            <td>
                                                {value.deposit}
                                            </td>               
                                            <td style={{"borderLeft":"1px solid black"}}>
                                                {value.currentPrice}
                                            </td>
                                            <td>
                                                <PercentageIndicator amount={value.percentajeDiff}/>
                                            </td>
                                            <td>          
                                                <MarketOperation operation={value.recomendedAction}/>    
                                            </td>
                                            <td style={{"borderLeft":"1px solid black"}}>
                                                {value.isSelled && value.returnStockPrice}
                                            </td>
                                            <td> 
                                                {value.isSelled && <PercentageIndicator amount={value.returnStockDiffPricePercentaje}/>}
                                            </td>
                                            <td>
                                                {value.isSelled && value.sellDate}
                                            </td>
                                            <td>
                                                {value.isSelled && value.returnAmount}                                                
                                            </td>
                                            <td>
                                                {value.isSelled && value.returnFee}
                                            </td>
                                            <td>
                                                {value.isSelled && value.returnAmountWithFee}
                                            </td>
                                            <td>
                                                {value.isSelled && value.returnEarn}
                                            </td>
                                            <td>
                                                {value.isSelled && <PercentageIndicator amount={value.returnDiffAmount}/>}
                                            </td>
                                            <td>
                                                <TransactionState isSelled={value.isSelled}/>
                                            </td>                                          
                                            <td>                
                                                <button className="btn btn-warning" 
                                                        onClick={()=>{
                                                            setOpenOperationsStockModal({isOpen:true,stockId:value.id});
                                                        }}>
                                                    <i className="bi bi-box-arrow-up-right"></i>
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={()=>{setOpenYesNoMessageModal({isOpen:true,stockId:value.id})}}>
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
    </>
);}