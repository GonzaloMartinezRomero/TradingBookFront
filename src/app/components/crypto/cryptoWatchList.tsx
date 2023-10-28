import { useEffect, useState } from "react";
import { YesNoMessageModal } from "../util/yesNoMessageModal";
import { PercentageIndicator } from "../util/percentageIndicator";
import { ErrorMessageModal, ErrorModalProps } from "../util/errorMessageModal";
import { MonetaryAmount } from "../util/monetaryAmount";
import { deleteCryptokWatch, getCryptoWatchs } from "@/app/apiService/cryptoWatchService";
import { CryptoWatch } from "@/app/apiService/model/cryptoWatch.model";
import { CryptoWatchListModal } from "./modal/cryptoWatchListModal";
import { MarketOperation } from "../util/marketOperation";

interface DeleteCryptoWatchModalProp{
    isOpen:boolean;
    cryptoWatchId?:number;
}

export function CryptoWatchList(){

    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState<DeleteCryptoWatchModalProp>({isOpen:false});
    const [openStockWatchListModal, setOpenStockWatchListModal] = useState<boolean>(false);
    const [cryptokWatchCollection,setCryptoWatchCollection] = useState<CryptoWatch[]>();
    const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});

    useEffect(()=>{
        loadCryptoWatch()
    },[]);

    function loadCryptoWatch(){
        getCryptoWatchs().then(value=>setCryptoWatchCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
    }

    function removeCryptokWatch(id:number){
        deleteCryptokWatch(id).then(x=>loadCryptoWatch()).catch(err=>setErrorModal({isOpen:true,msg:err}));
    }

    return (<>

        {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}

        {openStockWatchListModal && <CryptoWatchListModal onClose={()=>setOpenStockWatchListModal(false)} 
                                                         onCloseAndReload={()=>{
                                                            loadCryptoWatch();
                                                            setOpenStockWatchListModal(false);}}/>}

        {openDeleteConfirmationModal.isOpen && <YesNoMessageModal msg="Do you want remove this crypto watcher?" 
                                                                  onYesResponse={()=>{
                                                                    removeCryptokWatch(openDeleteConfirmationModal.cryptoWatchId ?? 0);
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
                <table className="mt-1 table-header" style={{"width":"100%"}}>
                    <thead>                      
                        <tr className="text-center table-secondary table-group-divider" style={{"fontStyle":"oblique"}}>
                            <th>Crypto Reference</th>
                            <th>Target</th>                            
                            <th>Current</th>
                            <th>Distance %</th>               
                            <th>Action</th>             
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="text-center table-items">                                                      
                        { cryptokWatchCollection!==undefined && cryptokWatchCollection?.map((value,index)=>{

                            return(
                            <>
                             <tr>
                            <td>
                               {value.cryptoReference}
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
                                <button className="btn btn-danger" onClick={()=>{setOpenDeleteConfirmationModal({isOpen:true,cryptoWatchId:value.id})}}>
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