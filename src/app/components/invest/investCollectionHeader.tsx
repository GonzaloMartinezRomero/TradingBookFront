"use client";
import { useState } from "react";
import { NewInvestModal } from "../modals/newInvestModal";
import { NewAssetModal } from "../modals/newAssetModal";
import { InvestCollection } from "./investCollection";
import Toggle from 'react-bootstrap-toggle';

export function InvestCollectionHeader(){

    const [openNewAssetModal, setOpenNewAssetModal] = useState(false);
    const [openNewInvestModal, setOpenNewInvestModal] = useState(false);

    
return(
    <>        
    {openNewInvestModal && <NewInvestModal onClose={()=>setOpenNewInvestModal(false)}/>}
    {openNewAssetModal && <NewAssetModal onClose={()=>setOpenNewAssetModal(false)}/>}    
    <h2>Invest Collection</h2>
    <div className="row" style={{"border":"1px solid black"}}></div>
        <div className="row mt-3 mb-3">
            <div className="col-1 ">          
                <button type="button" className="btn btn-success" onClick={()=>setOpenNewInvestModal(true)}>
                    <span className="me-1">New Invest</span>
                    <i className="bi bi-plus-circle"></i>
                </button>  
            </div>        
            <div className="col-1 ">          
                <button type="button" className="btn btn-info" onClick={()=>setOpenNewAssetModal(true)}>
                    <span className="me-1">New Asset</span>
                    <i className="bi bi-plus-circle"></i>
                </button>  
            </div>                   
            <div className="col-2">
                <Toggle                
                    on={<h2>Hide Closed Operation</h2>}
                    off={<h2>Show All Operations</h2>}                    
                    offstyle="warning"/>
            </div>
            <div className="col-2">                
                <input type="search" className="form-control" placeholder="Search assset..."/>                
            </div>
        </div>        
        <div className="row">
            <div className="col mt-1">
                <InvestCollection></InvestCollection>
            </div>
        </div>    
    </>
);}