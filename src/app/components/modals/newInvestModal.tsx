"use client";
import { createPortal } from "react-dom";


interface Props{
    onClose: any    
}

export function NewInvestModal({ onClose }:Props) {
  return (
    createPortal(
      <>
        <div className="add-invest-modal">
          <h1 className="m-1">New Invest</h1>
          <div className="m-4">
            <h3 className="mb-4">Asset</h3>
            <div className="form-group row">
            <div className="col-4">
                <label className="row">Asset</label>
                <select className="row form-select" aria-label="Currency">
                  <option selected>Select</option>
                  <option value="1">BTC-EUR</option>
                  <option value="2">MARA</option>
                  <option value="3">MSOFT</option>
                </select>
              </div>

              <div className="col-4">
                <label className="row">Price</label>
                <input type="text" className="form-control row" placeholder="Price" />
              </div>

              <div className="col-4">
                <label className="row">Currency</label>
                <select className="row form-select" aria-label="Currency">
                  <option selected>Select</option>
                  <option value="1">EUR</option>
                  <option value="2">USD</option>
                  <option value="3">BUSD</option>
                </select>
              </div>            
            </div>
            <div className="form-group row mt-3">
                <div className="col-4">
                  <label className="row">Stop Loss</label>
                  <input type="number" className="form-control row" placeholder="Stop" />
                </div>
                <div className="col-4">
                  <label className="row">Sell Limit</label>
                  <input type="number" className="form-control row" placeholder="Limit" />
                  </div>
              </div>
          </div>
          <div className="m-4">
            <h3 className="mb-4">Invest</h3>
            <div className="form-group row">
              <div className="col-4">
                <label className="row">Amount</label>
                <input type="text" className="form-control row" placeholder="Amount" />
              </div>
              <div className="col-4">
                <label className="row">Currency</label>
                <select className="row form-select" aria-label="Currency">
                  <option selected>Select</option>
                  <option value="1">EUR</option>
                  <option value="2">USD</option>
                  <option value="3">BUSD</option>
                </select>
              </div>
              <div className="col-4">
                <label className="row">Fee</label>
                <input type="text" className="form-control row" placeholder="Fee" />
              </div>
            </div>
          </div>
          <div className="form-group row mt-5">
            <div className="form-group col-6 ">
              <button className="btn btn-warning" style={{ "width": "130px", "height": "50px" }} onClick={onClose}>Close</button>
            </div>
            <div className="form-group col-6">
              <button className="btn btn-success" style={{ "width": "130px", "height": "50px" }}>Add</button>
            </div>
          </div>
        </div>
      </>,
      document.body)
  );
}