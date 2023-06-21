"use client";
export function ResumeTradingOperations(){

return(
    <>        
        <h2>Resume Trading Operations</h2>
        <div className="row">
            <div className="col-3">
                <table className="table mt-3">
                <thead>
                <tr className="table-success">
                    <th>Deposit €</th>                
                    <th>Total Earned €</th>                                      
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            asdf
                        </td>
                        <td>
                            asdf
                        </td>
                    </tr>
                </tbody>            
                </table>
            </div>            
            <div className="col-1 mb-3 align-self-end">
                <input type="text" className="form-control" placeholder="Amount €"/>                            
            </div>
            <div className="col-1 mb-3 align-self-end">            
                <button type="button" className="btn btn-success">
                    <span className="me-1">Add Deposit</span>
                    <i className="bi bi-plus-circle"></i>
                </button>  
            </div>
        </div>
        
    </>
);}