"use client";

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
import { TextInput } from "../util/text.input.component";


interface StockWatchModalProp{
    isOpen:boolean;
    stockWatchId?:number|null;
}

export function StockWatchList(){

    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState<StockWatchModalProp>({ isOpen: false });
    const [openStockWatchListModal, setOpenStockWatchListModal] = useState<boolean>(false);
    const [openModifyStockWatchListModal, setOpenModifyStockWatchListModal] = useState<StockWatchModalProp>({ isOpen: false });
    const [stockWatchCollection,setStockWatchCollection] = useState<StockWatch[]>();
    const [stockWatchCollectionFiltered,setStockWatchCollectionFiltered] = useState<StockWatch[]>();
    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
    const [informationModal, setInformationModal] = useState<InformationModalProps>({ isOpen: false });    

    useEffect(()=>{
        loadStockWatch()
    },[]);

    function loadStockWatch() {
        getStockWatchs().then(value => { setStockWatchCollection(value); setStockWatchCollectionFiltered(value); })
            .catch(err => setErrorModal({ isOpen: true, msg: err }));
    }

    function removeStockWatch(id:number){
        deleteStockWatch(id).then(x=>loadStockWatch()).catch(err=>setErrorModal({isOpen:true,msg:err}));
    }

    function updateFilter(stockCode:string) {


        if (stockCode.length > 0) {
            const stocksFiltered: StockWatch[] = stockWatchCollection?.filter(x => {
                const valueUpper = x.stock.toUpperCase();
                return valueUpper.includes(stockCode.toUpperCase());
            }) ?? [];

            console.log(stockCode, 'STOCK');
            console.log(stockWatchCollection, 'STOCKCOLLECTION');
            console.log(stocksFiltered, 'STOCK FILETERD');

            setStockWatchCollectionFiltered(stocksFiltered);
        }
        else {
            setStockWatchCollectionFiltered(stockWatchCollection);
        }
    }

    return (<>

        {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}

        {openStockWatchListModal && <StockWatchListModal onClose={()=>setOpenStockWatchListModal(false)} 
                                                         onCloseAndReload={()=>{
                                                            loadStockWatch();
                setOpenStockWatchListModal(false);
            }} />}

        {openModifyStockWatchListModal.isOpen && <StockWatchListModal onClose={() => setOpenModifyStockWatchListModal({ isOpen: false })}
            onCloseAndReload={() => {
                loadStockWatch();
                setOpenModifyStockWatchListModal({ isOpen: false })
            }}
            id={openModifyStockWatchListModal.stockWatchId} />}

        {openDeleteConfirmationModal.isOpen && <YesNoMessageModal msg="Do you want remove this stock watcher?" 
                                                                  onYesResponse={()=>{
                                                                    removeStockWatch(openDeleteConfirmationModal.stockWatchId ?? 0);
                                                                    setOpenDeleteConfirmationModal({isOpen:false});
                                                                  }} 
                                                                  onNoResponse={()=>{setOpenDeleteConfirmationModal({isOpen:false})}}/>}

        {informationModal.isOpen && <InformationMessageModal msg={'Stock view added successfuly'} onClose={() => setInformationModal({ isOpen:false })} />}

        <div className="row mt-2 mb-2">
            <div className="col-2 mt-4">
                <ButtonCustom btnType={ButtonType.Add} onClick={() => { setOpenStockWatchListModal(true); }} />
            </div>     
            <div className="col-3">
                <label>Find stock</label>
                <TextInput placeHolder={'Stock'} onChangeValue={(x: string) => { updateFilter(x); }} ></TextInput>     
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
                        <th>Modify</th>
                        <th>Delete</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="text-center table-items" >
                    {stockWatchCollectionFiltered !== undefined && stockWatchCollectionFiltered?.map((value, index) => {

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
                                        <ButtonCustom btnType={ButtonType.Modify} onClick={() => { setOpenModifyStockWatchListModal({ isOpen: true, stockWatchId: value.id }); }} />
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