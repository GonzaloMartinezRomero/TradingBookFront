import { Switch } from "@nextui-org/react";
import { useState } from "react";
import { CurrencyModal } from "../modal/currency-modal";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message-modal";
import { CryptoActive } from "./crypto-active";
import { CryptoSelled } from "./crypto-selled";
import { CryptoWatchList } from "./crypto-watch-list";
import { CryptoReferenceModal } from "./modal/crypto-reference.modal";
import { NewCryptoModal } from "./modal/new-crypto.modal";

export function CryptoCollection(){

const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});    
const [showClosedCryptos, setShowClosedCryptos] = useState<boolean>(false);
const [openCryptoModal, setOpenNewCryptoModal] = useState(false);
const [openCryptoRefModal, setOpenCryptoRefModal] = useState(false);
const [openNewCurrencyModal, setOpenNewCurrencyModal] = useState(false);    
    

return(
    <>        
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    {openCryptoModal && <NewCryptoModal  onClose={()=>setOpenNewCryptoModal(false)} 
                                         onCloseAndReload={()=>{
                                                                    setOpenNewCryptoModal(false);
                                                                }}/>}      

    {openCryptoRefModal && <CryptoReferenceModal onClose={()=>setOpenCryptoRefModal(false)}/>}                                                              
    
    {openNewCurrencyModal && <CurrencyModal onClose={() => setOpenNewCurrencyModal(false)} />}    
     

        <h2 className="mt-4">Crypto</h2>
        <div className="row container-separator" />
     <div className="row mt-3 mb-3 ">
            <div className="col-1">          
                <button type="button" className="btn btn-success" style={{"width":"130px"}}  onClick={()=>setOpenNewCryptoModal(true)} >
                    <span className="me-1">Crypto</span>
                    <i className="bi bi-plus-circle"></i>
                </button>  
            </div>        
            <div className="col-1 ">          
                <button type="button" className="btn btn-success" style={{"width":"130px"}} onClick={()=>{setOpenCryptoRefModal(true)}}>
                    <span className="me-1">Crypto Ref</span>
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
                <Switch checked={false} size={"lg"} about="" className="mt-1" onChange={(ev)=>{setShowClosedCryptos(!showClosedCryptos)}}/>                                                                          
            </div>                                    
            <div className="col-1">
                <p>Switch To Closed Cryptos</p>
            </div>            
        </div>        
        <div className="row">
            <div className="col mt-1">
                {!showClosedCryptos && <CryptoActive />}
                {showClosedCryptos && <CryptoSelled />}
            </div>
        </div>    
    
        <h2 className="mt-4">Watch List</h2>
        <div className="row container-separator" />
        <CryptoWatchList/>
    </>
);}