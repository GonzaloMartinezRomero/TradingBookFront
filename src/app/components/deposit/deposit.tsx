import { useEffect, useState } from "react";
import { MonetaryAmount } from "../util/monetaryAmount";

import { NewDepositModal } from "./modal/newDeposit.modal";

import { PlatformModal } from "./modal/platform.modal";
import { Deposit } from "../../domain/deposit/deposit.model";
import { deleteDeposit, getDeposits } from "../../services/deposit.service";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message-modal";
import { YesNoMessageModal } from "../modal/yes-no-message-modal";
import { DepositType } from "../../domain/deposit/deposit-type";

interface DeleteModalProp{
    isOpen:boolean;
    depositId:number;
}

interface Props {
    depositType: DepositType;
}

export function Deposit({ depositType }: Props) {
   
const [deposits,setDeposits] = useState<Deposit[]>();
const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});
const [openDepositModal, setOpenDepositModal] = useState(false);
const [openPlatformModal, setOpenPlatformModal] = useState(false);
const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState<DeleteModalProp>({isOpen:false,depositId:0});

useEffect(()=>{
    loadDeposits(depositType);
},[]);

function loadDeposits(type: DepositType){
    getDeposits(type).then(x=>setDeposits(x))
    .catch(err=>setErrorModal({isOpen:true,msg:err}));
}

function deleteSelectedDeposit(id:number){
    deleteDeposit(id).then(x => loadDeposits(depositType))
                     .catch(err=>setErrorModal({isOpen:true,msg:err}));   
}

return(
    <>        
        {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}

        {openDepositModal && <NewDepositModal platformDestinyId={depositType}
                                               onClose={() => setOpenDepositModal(false)} 
                                               onCloseAndReload={()=>{
                                                                     setOpenDepositModal(false);
                                                                     loadDeposits(depositType);
                                                                }}/>}      

        {openDeleteConfirmationModal.isOpen && <YesNoMessageModal msg="Do you want remove this deposit?" 
                                                        onYesResponse={()=>{
                                                            deleteSelectedDeposit(openDeleteConfirmationModal.depositId);
                                                            setOpenDeleteConfirmationModal({isOpen:false,depositId:0})
                                                        }} 
                                                        onNoResponse={()=>{setOpenDeleteConfirmationModal({isOpen:false,depositId:0})}}/>}    

        {openPlatformModal && <PlatformModal onClose={()=>setOpenPlatformModal(false)}/>}

        <div className="row mt-2 mb-2">
            <div className="col-3">
                <button type="button" className="btn btn-success" style={{ "width": "150px" }} onClick={() => {
                    setOpenDepositModal(true);                   
                }}>
                    <span className="me-1">Add</span>
                    <i className="bi bi-plus-circle"></i>
                </button>  
            </div>
        </div>
        <table className="mt-1 table-header" style={{"width":"100%"}}>
            <thead>                      
                <tr className="text-center table-secondary table-group-divider" style={{"fontStyle":"oblique"}}>
                    <th>Date</th>
                    <th>Deposit</th>
                    <th>Fee</th>
                    <th>Total Deposit</th>
                    <th>Currency</th>    
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className="text-center table-items">          
            {deposits !== undefined && deposits?.map((value,index)=>{
                return (<>
                    <tr>
                    <td>
                        {value.depositDate}
                    </td>
                    <td>
                        <MonetaryAmount amount={value.deposit}/>
                    </td>
                    <td>
                        <MonetaryAmount amount={value.fee}/>
                    </td>
                    <td>
                        <MonetaryAmount amount={value.totalDeposit}/>
                    </td>
                    <td>
                        {value.currency}
                    </td>
                    
                    <td>
                        <button className="btn btn-danger" onClick={()=>{setOpenDeleteConfirmationModal({isOpen:true,depositId:value.id})}}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                    </td>
                </tr>
                </>);
            })}
            </tbody>
        </table>
    </>
);}