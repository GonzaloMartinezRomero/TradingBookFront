export function DepositCollection(){
   
return(
    <>        
        <h2>Deposit Operations</h2>
        <div className="row" style={{"border":"1px solid black"}}>
        </div>
        <div className="row mt-2 mb-2">
            <div className="col-6">
                <button type="button" className="btn btn-success" style={{"width":"150px"}} >
                    <span className="me-1">Add Deposit</span>
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
                        <tr>
                            <td>
                                Binance
                            </td>
                            <td>
                                100
                            </td>
                            <td>
                                0.13
                            </td>
                            <td>
                                99.8
                            </td>
                            <td>
                                EUR
                            </td>
                            <td>
                                10/05/2023
                            </td>
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>    
    </>
);}