"use client";
import { createPortal } from "react-dom";


interface Props{
    onClose: any    
}

export function NewCurrencyModal({ onClose }:Props) {
  return (
    createPortal(
      <>
        <div className="new-asset-modal">
          <div className="d-flex flex-row-reverse">
          <button className="btn btn-secondary p-1 m-1" style={{"width":"32px","height":"33px"}} onClick={onClose}>
            <i className="bi-x"/>
          </button>
          </div>
          <h2>Currency</h2>
          <div className="form-group row ms-4">
            <div className="col-10">
              <label className="row">Name</label>
              <input type="text" className="row form-control" placeholder="Name" />              
            </div>
          </div>
          <div className="form-group row mt-2 ms-4">
            <div className="col-10">
              <label className="row">Code</label>
              <input type="text" className="row form-control" placeholder="Code" />              
            </div>
          </div>
         
          <div className="form-group row mt-2 mb-2">                        
            <div className="form-group col-12">
              <button className="btn btn-success" style={{"width":"100px","height":"40px"}}>Add</button>
            </div>
          </div>
          <div className="m-1" style={{"maxHeight":"200px","overflowY":"auto"}}>                                  
            <table className="table table-bordered table-striped" >
              <thead>
                <tr className="table-secondary table-group-divider">
                  <th>Name</th>
                  <th>Code</th>
                  <th>Tool</th>
                </tr>
              </thead>
              <tbody style={{"opacity":"0.9"}}>
                <tr>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <button><i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <button><i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <button><i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <button><i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <button><i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <button><i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <button><i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <button><i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <button><i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <span>BTC</span>
                  </td>
                  <td>
                  <button><i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>,
      document.body)
  );
}