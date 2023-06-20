"use client";
import { useState } from "react";
import { AssetCollection } from "./assetCollection";
import { AddInvestModal } from "../addInvestModal";
import { NewAssetModal } from "../newAssetModal";

export function AssetCollectionHeader(){

    const [openNewAssetModal, setOpenNewAssetModal] = useState(false);
    const [openAddInvestModal, setOpenAddInvestModal] = useState(false);

    
return(
    <>        
    {openAddInvestModal && <AddInvestModal onClose={()=>setOpenAddInvestModal(false)}/>}
    {openNewAssetModal && <NewAssetModal onClose={()=>setOpenNewAssetModal(false)}/>}
    <div className="container-fluid">
    <h2>Asset Collection</h2>
        <div className="row mt-3 mb-3">
            <div className="col-1 ">          
                <button type="button" className="btn btn-success" onClick={()=>setOpenAddInvestModal(true)}>
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
                <div className="col-1 ms-1">
                    <input type="search" className="form-control" placeholder="Search assset..." style={{"height":"40px","width":"300px"}}/>                
                </div>          
            </div>
            <div className="col-2">
                <div className="form-check m-2 ms-4">
                    <input className="form-check-input" type="checkbox"/>
                    <label className="form-check-label">Hide Transactions Closed</label>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col mt-1">
                <AssetCollection></AssetCollection>
            </div>
        </div>
    </div>
    </>
);}