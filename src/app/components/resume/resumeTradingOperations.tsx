"use client";

import { useState } from "react";
import { NewCurrencyModal } from "../modals/newCurrencyModal";

export function ResumeTradingOperations(){

    const [openNewCurrencyModal, setOpenNewCurrencyModal] = useState(false);
    

return(
    <>        
      {openNewCurrencyModal && <NewCurrencyModal onClose={()=>setOpenNewCurrencyModal(false)}/>}    
        <h2>Trading Operations</h2>
        <div className="row" style={{"border":"1px solid black"}}>
        </div>
        <div className="row">
            <div className="col-4">
                <table className="mt-3" style={{"width":"100%"}}>
                <thead>
                <tr className=" " style={{"fontStyle":"oblique"}}>
                    <th>Deposit €</th>                
                    <th>Stock Earned €</th>                                      
                    <th>Exchange Earned €</th>                                      
                    <th>Total Earned €</th>                                      
                </tr>
                </thead>
                <tbody className="table-secondary table-group-divider">
                    <tr>
                        <td>
                            450
                        </td>
                        <td>
                            1.025,25
                        </td>
                        <td>
                            1.025,25
                        </td>
                        <td>
                            1.025,25
                        </td>
                    </tr>
                </tbody>            
                </table>
            </div>            
            <div className="col-1 mb-3 align-self-end">
                <input type="text" className="form-control" placeholder="Amount €" style={{"height":"40px"}}/>                            
            </div>
            <div className="col-1 mb-3 align-self-end">            
                <button type="button" className="btn btn-success">
                    <span className="me-1">Deposit</span>
                    <i className="bi bi-currency-euro"></i>
                </button>  
            </div>
            <div className="col-2 mb-3 align-self-end">          
                <button type="button" className="btn btn-success" onClick={()=>setOpenNewCurrencyModal(true)}>
                    <span className="me-1">New Currency</span>
                    <i className="bi bi-plus-circle"></i>
                </button>  
            </div>           
        </div>
        
    </>
);}