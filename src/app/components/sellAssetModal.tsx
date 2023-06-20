"use client";
import { createPortal } from "react-dom";


interface Props{
    onClose: any    
}

export function SellAssetModal({ onClose }:Props) {
  return (
    createPortal(
      <>
        <div className="sell-asset-modal">
          <div className="d-flex flex-row-reverse">
          <button className="btn btn-secondary p-1 m-1" style={{"width":"32px","height":"33px"}} onClick={onClose}>
            <i className="bi-x"/>
          </button>
          </div>
        
          <h2 className="mb-1">Sell Asset</h2>
            <div className="form-group row d-flex justify-content-center"  >
              <div className="col-10 ">
                <label className="row " >Return</label>
                <input type="number" className="form-control row" placeholder="Amount" />
              </div>
            </div>

            <div className="form-group row d-flex justify-content-center mt-1" >
              <div className="col-10">
                <label className="row" >Fee</label>
                <input type="number" className="form-control row " placeholder="Fee" />
              </div>
            </div>
          
          <div className="form-group row mt-4">            
            <div className="form-group col-6">
              <button className="btn btn-danger" style={{"width":"100px","height":"40px"}}>Delete</button>
            </div>
            <div className="form-group col-6">
              <button className="btn btn-success" style={{"width":"100px","height":"40px"}}>Save</button>
            </div>
          </div>
        </div>
      </>,
      document.body)
  );
}