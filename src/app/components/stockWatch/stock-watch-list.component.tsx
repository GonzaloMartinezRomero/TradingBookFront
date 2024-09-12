import { useEffect, useState } from "react";
import { StockWatch } from "../../domain/stockWatch/stock-watch.model";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message.modal";
import { InformationMessageModal, InformationModalProps } from "../modal/information-message.modal";
import { deleteStockWatch, getStockWatchs } from "../../services/stock-watch.service";
import { StockWatchListModal } from "./modal/stock-watch-list.modal";
import { YesNoMessageModal } from "../modal/yes-no-message.modal";
import { ButtonCustom, ButtonType } from "../util/button.component";
import { MarketOperation } from "../util/market-operation.component";
import { MonetaryAmount } from "../util/monetary-amount.component";
import { PercentageIndicator } from "../util/percentage-indicator.component";
import { StockChartLink } from "../util/reference-url.component";


interface DeleteStockWatchModalProp{
    isOpen:boolean;
    stockWatchId?:number;
}

export function StockWatchList(){

    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState<DeleteStockWatchModalProp>({isOpen:false});
    const [openStockWatchListModal, setOpenStockWatchListModal] = useState<boolean>(false);
    const [stockWatchCollection,setStockWatchCollection] = useState<StockWatch[]>();
    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
    const [informationModal, setInformationModal] = useState<InformationModalProps>({ isOpen: false });

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

        {informationModal.isOpen && <InformationMessageModal msg={'Stock view added successfuly'} onClose={() => informationModal.isOpen = false} />}

        <div className="row mt-2 mb-2">
            <div className="col-1">
                <ButtonCustom btnType={ButtonType.Add} onClick={() => { setOpenStockWatchListModal(true); }} />
            </div>          
        </div>
        <div className="content-scrollable">
            <table className="mt-1 table-header" style={{ "width": "100%" }}>
                <thead>
                    <tr className="text-center table-secondary table-group-divider" style={{ "fontStyle": "oblique" }}>
                        <th>Stock</th>
                        <th>Currency</th>
                        <th>Target</th>
                        <th>Current</th>
                        <th>Gap %</th>
                        <th>Action</th>
                        <th>Chart</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="text-center table-items" >
                    {stockWatchCollection !== undefined && stockWatchCollection?.map((value, index) => {

                        return (
                            <>
                                <tr>
                                    <td>
                                        {value.stock}
                                    </td>
                                    <td>
                                        {value.currency}
                                    </td>
                                    <td>
                                        <MonetaryAmount amount={value.target} />
                                    </td>
                                    <td>
                                        <MonetaryAmount amount={value.current} />
                                    </td>
                                    <td>
                                        <PercentageIndicator amount={value.diff} />
                                    </td>
                                    <td>
                                        <MarketOperation operation={value.recomendedAction} />
                                    </td>
                                    <td>
                                        <StockChartLink url={value.chartReferenceUrl} />
                                    </td>
                                    <td>
                                        <ButtonCustom btnType={ButtonType.Delete} onClick={() => { setOpenDeleteConfirmationModal({ isOpen: true, stockWatchId: value.id }); }} />
                                    </td>
                                </tr>
                            </>);
                    })}
                </tbody>
            </table>
        </div>
    </>)

}