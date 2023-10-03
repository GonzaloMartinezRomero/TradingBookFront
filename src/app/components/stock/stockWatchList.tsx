import { useEffect, useState } from "react";
import { YesNoMessageModal } from "../util/yesNoMessageModal";
import { PercentageIndicator } from "../util/percentageIndicator";
import { StockWatchListModal } from "./modal/stockWatchListModal";
import { StockWatch } from "@/app/apiService/model/stockWatch.model";
import { ErrorMessageModal, ErrorModalProps } from "../util/errorMessageModal";
import { deleteStockWatch, getStockWatchs } from "@/app/apiService/stockWatchService";
import { MonetaryAmount } from "../util/monetaryAmount";

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
            <div className="col-5 mt-1">        
                <table className="mt-1" style={{"width":"100%"}}>
                    <thead>                      
                        <tr className="text-center table-secondary table-group-divider" style={{"fontStyle":"oblique"}}>
                            <th>Stock</th>
                            <th>Currency</th>
                            <th>Target</th>
                            <th>Current</th>
                            <th>Diff %</th>                            
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="text-center table-items">                                                      
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