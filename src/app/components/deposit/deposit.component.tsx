import { useEffect, useState } from "react";


import { NewDepositModal } from "./modal/new-deposit.modal";


import { Deposit } from "../../domain/deposit/deposit.model";
import { deleteDeposit, getDeposits } from "../../services/deposit.service";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message.modal";
import { InformationMessageModal, InformationModalProps } from "../modal/information-message.modal";
import { YesNoMessageModal } from "../modal/yes-no-message.modal";
import { ButtonCustom, ButtonType } from "../util/button.component";
import { MonetaryAmount } from "../util/monetary-amount.component";
import { TextFormat } from "../util/text.component";

interface DeleteModalProp{
    isOpen:boolean;
    depositId:number;
}

export function Deposit() {
   
    const [deposits, setDeposits] = useState<Deposit[]>();
    const [informationModal, setInformationModal] = useState<InformationModalProps>({ isOpen: false });
    const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});
    const [openDepositModal, setOpenDepositModal] = useState(false);    
    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState<DeleteModalProp>({isOpen:false,depositId:0});

useEffect(()=>{
    loadDeposits();
},[]);

function loadDeposits(){
    getDeposits().then(x=>setDeposits(x))
    .catch(err=>setErrorModal({isOpen:true,msg:err}));
}

    function deleteSelectedDeposit(id: number) {
        deleteDeposit(id).then(x =>
        {
            loadDeposits();
            setInformationModal({ isOpen: true, msg:'Delete deposit successfully!' })
        })
        .catch(err => setErrorModal({ isOpen: true, msg: err }));   
}

return(
    <>        
        {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}

        {openDepositModal && <NewDepositModal  onClose={() => setOpenDepositModal(false)} 
                                               onCloseAndReload={()=>{
                                                   setOpenDepositModal(false);
                                                   loadDeposits();
                setInformationModal({ isOpen: true, msg: 'Deposit added successfully' });
            }} />}      

        {openDeleteConfirmationModal.isOpen && <YesNoMessageModal msg="Do you want remove this deposit?" 
                                                        onYesResponse={()=>{
                                                            deleteSelectedDeposit(openDeleteConfirmationModal.depositId);
                                                            setOpenDeleteConfirmationModal({isOpen:false,depositId:0})
                                                        }} 
                                                        onNoResponse={()=>{setOpenDeleteConfirmationModal({isOpen:false,depositId:0})}}/>}    

        {informationModal.isOpen && <InformationMessageModal msg={informationModal.msg} onClose={() => setInformationModal({ isOpen: false }) } />}

        <div className="row mt-2 mb-2">
            <div className="col-3">
                <ButtonCustom btnType={ButtonType.Add} onClick={() => { setOpenDepositModal(true); }} />
            </div>
        </div>
        <div className="content-scrollable">
        <table className="mt-1 table-header" style={{ "width": "100%" }}>
                <thead>
                    <tr className="text-center table-secondary table-group-divider" style={{ "fontStyle": "oblique" }}>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Deposit</th>
                        <th>Fee</th>
                        <th>Total Deposit</th>
                        <th>Currency</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-center table-items">
                    {deposits !== undefined && deposits?.map((value, index) => {
                        return (<>
                            <tr>
                                <td>
                                    {value.depositDate}
                                </td>
                                <td>
                                    <TextFormat text={value.depositType} />
                                </td>
                                <td>
                                    <MonetaryAmount amount={value.deposit} />
                                </td>
                                <td>
                                    <MonetaryAmount amount={value.fee} />
                                </td>
                                <td>
                                    <MonetaryAmount amount={value.totalDeposit} />
                                </td>
                                <td>
                                    <TextFormat text={value.currency} />
                                </td>
                                <td>
                                    <ButtonCustom btnType={ButtonType.Delete} onClick={() => { setOpenDeleteConfirmationModal({ isOpen: true, depositId: value.id }); }} />
                                </td>
                            </tr>
                        </>);
                    })}
                </tbody>
            </table>
        </div>
     
    </>
);}