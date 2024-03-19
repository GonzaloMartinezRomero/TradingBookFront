import { useEffect, useState } from "react";

import { PercentageIndicator } from "../util/percentageIndicator";
import { StockWatchListModal } from "./modal/stockWatchListModal";

import { MonetaryAmount } from "../util/monetaryAmount";
import { MarketOperation } from "../util/marketOperation";
import { deleteStockWatch, getStockWatchs } from "../../services/stock-watch.service";
import { StockWatch } from "../../domain/stocks/stock-watch.model";
import { StockChartLink } from "../util/referenceUrl";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message-modal";
import { YesNoMessageModal } from "../modal/yes-no-message-modal";

interface DeleteStockWatchModalProp{
    isOpen:boolean;
    stockWatchId?:number;
}

export function StockWatchList(){

    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState<DeleteStockWatchModalProp>({isOpen:false});
    const [openStockWatchListModal, setOpenStockWatchListModal] = useState<boolean>(false);
    const [stockWatchCollection,setStockWatchCollection] = useState<StockWatch[]>();
    const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});

    useEffect(()=>{
        loadStockWatch()
    },[]);

    function loadStockWatch(){
        getStockWatchs().then(value=>setStockWatchCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
    }

    function removeStockWatch(id:number){
        deleteStockWatch(id).then(x=>loadStockWatch()).catch(err=>setErrorModal({isOpen:true,msg:err}));
    }

    return (<>

        {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}

        {openStockWatchListModal && <StockWatchListModal onClose={()=>setOpenStockWatchListModal(false)} 
                                                         onCloseAndReload={()=>{
                                                            loadStockWatch();
                                                            setOpenStockWatchListModal(false);}}/>}

        {openDeleteConfirmationModal.isOpen && <YesNoMessageModal msg="Do you want remove this stock watcher?" 
                                                                  onYesResponse={()=>{
                                                                    removeStockWatch(openDeleteConfirmationModal.stockWatchId ?? 0);
                                                                    setOpenDeleteConfirmationModal({isOpen:false});
                                                                  }} 
                                                                  onNoResponse={()=>{setOpenDeleteConfirmationModal({isOpen:false})}}/>}

        <div className="row mt-2 mb-2">
            <div className="col-1">
                <button type="button" className="btn btn-success" style={{"width":"150px"}} onClick={()=>{setOpenStockWatchListModal(true)}}>
                    <span className="me-1">Add</span>
                    <i className="bi bi-plus-circle"></i>
                </button>  
            </div>          
        </div>
        <div className="row">
            <div className="col-5 mt-1 stock-table-watcher">        
                <table className="mt-1 table-header" style={{ "width": "100%" }}>
                    <thead>
                        <tr className="text-center table-secondary table-group-divider" style={{ "fontStyle": "oblique" }}>
                            <th>Stock</th>
                            <th>Currency</th>
                            <th>Target</th>
                            <th>Current</th>
                            <th>Distance %</th>              
                            <th>Action</th>
                            <th>Chart</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="text-center table-items" >                                                      
                        { stockWatchCollection!==undefined && stockWatchCollection?.map((value,index)=>{

                            return(
                            <>
                             <tr>
                            <td>
                               {value.stock}
                            </td>
                            <td>
                                {value.currency}
                            </td>
                            <td>
                                <MonetaryAmount amount={value.target}/>
                            </td>
                            <td>
                                <MonetaryAmount amount={value.current}/>
                            </td>
                            <td>
                                <PercentageIndicator amount={value.diff}/>
                            </td>                            
                            <td>
                                <MarketOperation operation={value.recomendedAction}/>
                            </td>
                            <td>
                                <StockChartLink url={value.chartReferenceUrl} />
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={()=>{setOpenDeleteConfirmationModal({isOpen:true,stockWatchId:value.id})}}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                            </td>
                           </tr>
                            </>);
                        })} 
                    </tbody>
                    </table>
                    </div>
                </div>
    </>)

}