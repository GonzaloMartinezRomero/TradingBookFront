import { Deposit } from "@/app/apiService/model/deposit.model";
import { useEffect, useState } from "react";
import { MonetaryAmount } from "../util/monetaryAmount";
import { deleteDeposit, getAllDeposits } from "@/app/apiService/depositApiService";
import { ErrorMessageModal, ErrorModalProps } from "../util/errorMessageModal";
import { NewDepositModal } from "./modal/newDeposit.modal";
import { YesNoMessageModal } from "../util/yesNoMessageModal";
import { PlatformModal } from "./modal/platform.modal";

interface DeleteModalProp{
    isOpen:boolean;
    depositId:number;
}

export function DepositCollection(){
   
const [deposits,setDeposits] = useState<Deposit[]>();
const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});
const [openDepositModal, setOpenDepositModal] = useState(false);
const [openPlatformModal, setOpenPlatformModal] = useState(false);
const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState<DeleteModalProp>({isOpen:false,depositId:0});

useEffect(()=>{
    loadAllDeposits();
},[]);

function loadAllDeposits(){
    getAllDeposits().then(x=>setDeposits(x))
    .catch(err=>setErrorModal({isOpen:true,msg:err}));
}

function deleteSelectedDeposit(id:number){
    deleteDeposit(id).then(x=>loadAllDeposits())
                     .catch(err=>setErrorModal({isOpen:true,msg:err}));   
}

return(
    <>        
        {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}

        {openDepositModal && <NewDepositModal  onClose={()=>setOpenDepositModal(false)} 
                                               onCloseAndReload={()=>{
                                                                     setOpenDepositModal(false);
                                                                     loadAllDeposits();
                                                                }}/>}      

        {openDeleteConfirmationModal.isOpen && <YesNoMessageModal msg="Do you want remove this deposit?" 
                                                        onYesResponse={()=>{
                                                            deleteSelectedDeposit(openDeleteConfirmationModal.depositId);
                                                            setOpenDeleteConfirmationModal({isOpen:false,depositId:0})
                                                        }} 
                                                        onNoResponse={()=>{setOpenDeleteConfirmationModal({isOpen:false,depositId:0})}}/>}    

        {openPlatformModal && <PlatformModal onClose={()=>setOpenPlatformModal(false)}/>}

        <h2>Deposit Operations</h2>
        <div className="row" style={{"border":"1px solid black"}}/>
        <div className="row mt-2 mb-2">
            <div className="col-1">
                <button type="button" className="btn btn-success" style={{"width":"150px"}} onClick={()=>{setOpenDepositModal(true)}}>
                    <span className="me-1">Add Deposit</span>
                    <i className="bi bi-plus-circle"></i>
                </button>  
            </div>
            <div className="col-1">
                <button type="button" className="btn btn-success" style={{"width":"150px"}} onClick={()=>{setOpenPlatformModal(true)}}>
                    <span className="me-1">Add Platform</span>
                    <i className="bi bi-plus-circle"></i>
                </button>  
            </div>
        </div>
        <div className="row">
            <div className="col-5 mt-1">        
                <table className="mt-1" style={{"width":"100%"}}>
                    <thead>                      
                        <tr className="text-center table-secondary table-group-divider" style={{"fontStyle":"oblique"}}>
                            <th>Platform</th>
                            <th>Deposit</th>
                            <th>Fee</th>
                            <th>Total Deposit</th>
                            <th>Currency</th>    
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">          
                    {deposits !== undefined && deposits?.map((value,index)=>{
                        return (<>
                          <tr className="table-items">
                            <td>
                                {value.platform}
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
                                {value.depositDate}
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
            </div>
        </div>    
    </>
);}