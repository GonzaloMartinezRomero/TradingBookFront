import { useEffect, useState } from "react";
import { NewStockModal } from "./modal/newStockModal";
import { StockReferenceModal } from "./modal/stockReferenceModal";
import { Switch } from '@nextui-org/react';
import { OperationsStockModal } from "./modal/operationsStockModal";
import { MonetaryAmount } from "../util/monetaryAmount";
import { PercentageIndicator } from "../util/percentageIndicator";
import { MarketOperation } from "../util/marketOperation";
import { YesNoMessageModal } from "../util/yesNoMessageModal";
import { CurrencyModal } from "./modal/currencyModal";
import { ErrorMessageModal, ErrorModalProps } from "../util/errorMessageModal";
import { StockWatchList } from "./stockWatchList";
import { CollapsableContainer } from "../util/collapsableContainer";
import { Stock } from "../../domain/stocks/stock.model";
import { deleteStock, getStocks } from "../../services/stock.service";
import { StockChartLink } from "../util/referenceUrl";

interface StockOperationModalProps{
    isOpen:boolean;
    stockId:number;
}

export function StockCollection(){

    const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});
    const [showClosedStocks, setShowClosedStocks] = useState(false);
    const [openNewStockReferenceModal, setOpenNewStockReferenceModal] = useState(false);
    const [openStockModal, setOpenNewStockModal] = useState(false);
    const [openOperationsStockModal, setOpenOperationsStockModal] = useState<StockOperationModalProps>({isOpen:false,stockId:0});
    const [stockCollection, setStockCollection] = useState<Stock[]>();        
    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState<StockOperationModalProps>({isOpen:false,stockId:0});
    const [openNewCurrencyModal, setOpenNewCurrencyModal] = useState(false);       

    useEffect(()=>
    {
        updateStocks();
    },[]);

    function updateStocks(){
        getStocks().then(value=>setStockCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
    }
    
    function deleteSelectedStock(stockId:number){

        deleteStock(stockId).then(x=>updateStocks()).catch(err=>setErrorModal({isOpen:true,msg:err}));
    }    

return(
    <>        
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    {openStockModal && <NewStockModal onClose={()=>setOpenNewStockModal(false)} 
                                         onCloseAndReload={()=>{
                                            setOpenNewStockModal(false);
                                            updateStocks();
                                         }} />}

    {openNewStockReferenceModal && <StockReferenceModal onClose={()=>setOpenNewStockReferenceModal(false)}/>}      

    {openDeleteConfirmationModal.isOpen && <YesNoMessageModal msg="Do you want remove this stock?" 
                                                        onYesResponse={()=>{
                                                            deleteSelectedStock(openDeleteConfirmationModal.stockId);
                                                            setOpenDeleteConfirmationModal({isOpen:false,stockId:0})
                                                        }} 
                                                        onNoResponse={()=>{setOpenDeleteConfirmationModal({isOpen:false,stockId:0})}}/>}

    {openNewCurrencyModal && <CurrencyModal onClose={()=>setOpenNewCurrencyModal(false)}/>}    

    {openOperationsStockModal.isOpen && <OperationsStockModal stockId={openOperationsStockModal.stockId} 
                                                               onClose={()=>setOpenOperationsStockModal({isOpen:false,stockId:0})}
                                                               onStockUpdateAndClose={()=>{
                                                                setOpenOperationsStockModal({isOpen:false,stockId:0});
                                                                updateStocks();                                                           
                                                            }}/>}

  <CollapsableContainer title="Stocks">  
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
                 <p>Switch to Closed Stocks</p>
             </div>            
         </div>        
         <div className="row">
             <div className="col mt-1">        
                 <table className="mt-1 table-header text-center" style={{"width":"85%"}}>
                     <thead>
                         <tr className="table-success">
                             <th colSpan={4}  style={{"borderRight":"1px solid black"}}>INFORMATION</th>                
                             <th colSpan={3}  style={{"borderRight":"1px solid black"}}>INVEST</th>                                                   
                             {
                                !showClosedStocks && <th colSpan={4}  style={{"borderRight":"1px solid black"}}>CURRENT STATE</th> 
                             }
                             {
                                showClosedStocks && <th colSpan={7}>RETURN</th>       
                             }
                         </tr>
                         <tr className=" table-group-divider" style={{"fontStyle":"oblique"}}>
                             <th>Name</th>
                             <th>Price</th>
                             <th>Currency</th>
                             <th style={{"borderRight":"1px solid black"}}>Date</th>    
                             <th>Amount</th>                                
                             <th>Fee</th>
                             <th>Deposit</th>                                
                             {!showClosedStocks && 
                             (<>
                             <th style={{"borderLeft":"1px solid black"}}>Price</th>
                             <th>%</th>         
                             <th>Estimated Return</th>         
                             <th>Estimated Earn</th>
                                    <th>Action</th>       
                             <th>Chart</th>
                             </>)}
                             {showClosedStocks && 
                             (<>
                                <th style={{"borderLeft":"1px solid black"}}>Price</th>
                             <th>%</th>                
                             <th>Sell Date</th>                
                             <th>Return</th>
                             <th>Fee</th>                            
                             <th>AmountWithFee</th>
                             <th>Earn</th>                
                             <th>Diff-Amount</th>  
                             </>)}
                             
                         </tr>
                     </thead>
                     <tbody className="text-center">          
                             {stockCollection!==undefined && stockCollection?.map((value,index)=>{
                                 if((showClosedStocks && value.isSelled)||(!showClosedStocks && !value.isSelled))
                                 {
                                     return (  
                                         <>  
                                     <tr className="table-items">
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
                                                 <MonetaryAmount amount={value.amount} /> 
                                             </td>
                                             <td>
                                                 <MonetaryAmount amount={value.fee} /> 
                                             </td>
                                             <td>
                                                 <MonetaryAmount amount={value.deposit} /> 
                                             </td>               
                                             { !showClosedStocks && 
                                             (  <>
                                             <td style={{"borderLeft":"1px solid black"}}>
                                                 {!value.isSelled && <MonetaryAmount amount={value.currentPrice} /> }
                                             </td>
                                             <td>
                                                 {!value.isSelled && <PercentageIndicator amount={value.percentajeDiff}/>}
                                             </td>
                                             <td> 
                                                 {!value.isSelled && <MonetaryAmount amount={value.estimatedReturnPrice}/>}
                                             </td>
                                             <td>
                                                  {!value.isSelled && <MonetaryAmount amount={value.estimatedEarn} />}
                                             </td>
                                             <td>          
                                                 {!value.isSelled && <MarketOperation operation={value.recomendedAction}/>}
                                             </td>
                                             <td>
                                                 {!value.isSelled && <StockChartLink url={value.chartReferenceUrl}/> }                                             
                                            </td>
                                                </>)
                                             }
                                             {showClosedStocks && (<>
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
                                                 {value.isSelled && <MonetaryAmount amount={value.returnAmount} /> }                                                
                                             </td>
                                             <td>
                                                 {value.isSelled && <MonetaryAmount amount={value.returnFee} /> }
                                             </td>
                                             <td>
                                                 {value.isSelled && <MonetaryAmount amount={value.returnAmountWithFee} /> }
                                             </td>
                                             <td>
                                                 {value.isSelled && <MonetaryAmount amount={value.returnEarn} /> }
                                             </td>
                                             <td>
                                                 {value.isSelled && <PercentageIndicator amount={value.returnDiffAmount}/>}
                                             </td>
                                             </>)
                                             }                          
                                             <td>                
                                                 <button className="btn btn-warning" 
                                                         onClick={()=>{
                                                             setOpenOperationsStockModal({isOpen:true,stockId:value.id});
                                                         }}>
                                                     <i className="bi bi-box-arrow-up-right"></i>
                                                 </button>
                                             </td>
                                             <td>
                                                 <button className="btn btn-danger" onClick={()=>{setOpenDeleteConfirmationModal({isOpen:true,stockId:value.id})}}>
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
            <StockWatchList></StockWatchList>
        </CollapsableContainer> 
    </>
);}