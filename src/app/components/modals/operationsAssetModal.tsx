"use client";
import { createPortal } from "react-dom";


interface Props{
    onClose: any    
}

export function OperationsAssetModal({ onClose }:Props) {
  return (
    createPortal(
      <>
        <div className="operation-asset-modal">
          <div className="d-flex flex-row-reverse">
            <button className="btn btn-secondary p-1 m-1" style={{ "width": "32px", "height": "33px" }} onClick={onClose}>
              <i className="bi-x" />
            </button>
          </div>

          <h3>Sell Asset</h3>
          <div className="form-group row ms-3">
            <div className="col-6 ">
              <label className="row">Return</label>
              <input type="text" className="form-control row" placeholder="Return" />
            </div>

            <div className="col-6">
              <label className="row">Price</label>
              <input type="Fee" className="form-control row" placeholder="Fee" />
            </div>

          </div>
          <div className="form-group row mt-3">
            <div className="form-group col-6">
              <button className="btn btn-danger" style={{ "width": "100px", "height": "40px" }}>Delete</button>
            </div>
            <div className="form-group col-6">
              <button className="btn btn-success" style={{ "width": "100px", "height": "40px" }}>Sell</button>
            </div>
          </div>

          <h3 className="mt-3">Market Limit</h3>
          <div className="form-group row ms-3">
            <div className="col-6">
              <label className="row">Stop Loss</label>
              <input type="text" className="form-control row" placeholder="Stop" />
            </div>
            <div className="col-6">
              <label className="row">Sell Limit</label>
              <input type="Fee" className="form-control row" placeholder="Limit" />
            </div>
          </div>
          <div className="form-group row mt-4">
            <div className="form-group col-12">
              <button className="btn btn-success" style={{ "width": "100px", "height": "40px" }}>Update</button>
            </div>            
          </div>
        </div>
      </>,
      document.body)
  );
}