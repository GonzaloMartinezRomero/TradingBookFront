import { useState } from "react";
import { OperationsAssetModal } from "../modals/operationsAssetModal";
import { MarketOperation, MarketOperationType } from "../util/marketOperation";
import { PercentageIndicator } from "../util/percentageIndicator";
import { TransactionState } from "../util/transactionState";
import { MonetaryAmount } from "../util/monetaryAmount";

export function InvestCollection(){

    const [openOperationsAssetModal, setOpenOperationsAssetModal] = useState(false);

    return(
    <>
     {openOperationsAssetModal && <OperationsAssetModal onClose={()=>setOpenOperationsAssetModal(false)}/>}    
     <table className="table table-striped mt-3">
        <thead>
            <tr className="table-success">
                <th colSpan={4} className="text-center" style={{"borderRight":"1px solid black"}}>ASSET INFORMATION</th>                
                <th colSpan={4} className="text-center" style={{"borderRight":"1px solid black"}}>INVEST</th>                      
                <th colSpan={2} className="text-center" style={{"borderRight":"1px solid black"}}>ASSET STATE</th>      
                <th colSpan={8} className="text-center">RETURN</th>         
            </tr>
            <tr className="text-center table-secondary table-group-divider" style={{"fontStyle":"oblique"}}>
                <th>Name</th>
                <th>Price</th>
                <th>Currency</th>
                <th style={{"borderRight":"1px solid black"}}>Date</th>    
                <th>Amount</th>                
                <th>Currency</th>
                <th>Fee</th>
                <th>Deposit</th>                                
                <th style={{"borderLeft":"1px solid black"}}>Price</th>
                <th>%</th>                
                <th style={{"borderLeft":"1px solid black"}}>Price</th>
                <th>%</th>                
                <th>Date</th>                
                <th>Fee</th>
                <th>Return</th>
                <th>Earn</th>
                <th>Diff-Depot</th>         
                <th>Diff-Amount</th>  
            </tr>
        </thead>
        <tbody className="text-center">
            <tr>
                <td >
                    <span className="media-body">BTC-EUR</span>
                </td>
                <td><MonetaryAmount amount={15.259}/> </td>
                <td>EUR</td>
                <td style={{"borderRight":"1px solid black"}}>10/05/2020</td>
                <td>100</td>
                <td> 
                    <span>
                     EUR
                    </span>
                </td>                
                <td>1.5%</td>
                <td>
                  98.5
                </td>               
                <td style={{"borderLeft":"1px solid black"}}>24.259,65</td>                
                <td>
                  

                <PercentageIndicator amount={-15.2356}/>


                </td>
                <td style={{"borderLeft":"1px solid black"}}>24.258,77</td>
                <td> 
                   <PercentageIndicator amount={15.2356}/>
                </td>
                <td>13/02/2022</td>
                <td >0.05</td>
                <td>100</td>
                <td>20</td>
                <td>
                <img src="/arrowDown.png" width="15" height="15"/>                        
                    <span className="text-danger ps-1">5.15%</span>
                </td>   
                <td>
                <img src="/arrowDown.png" width="15" height="15"/>                        
                    <span className="text-danger ps-1">5.15%</span>
                </td>   
              
                <td style={{"borderLeft":"1px solid black"}}>
                    <span className="bi bi-file-earmark-lock" style={{"fontSize":"25px"}} title="SELLED"></span>
                </td>
                <td>          
                    <MarketOperation operation={MarketOperationType.BUY}/>    
                </td>
                <td>                
                <button className="btn btn-warning" onClick={()=>setOpenOperationsAssetModal(true)}><i className="bi bi-box-arrow-up-right"></i></button>
                </td>
            </tr>
            <tr>
            <td>MARA</td>
                <td>0.90</td>
                <td>USD</td>
                <td style={{"borderRight":"1px solid black"}}>12/05/2020</td>
                <td>1.000</td>
                <td> 
                    EUR
                </td>
                <td> 
                    1.25%
                </td>
                <td>
                    1100.26
                </td>
                <td style={{"borderLeft":"1px solid black"}}>
                    1.25
                </td>
                <td>
                <span>
                       <img src="/arrowUp.png" width="15" height="15"/>
                        <span className="text-success ps-1">38.8%</span>
                    </span>
                </td>
                <td style={{"borderLeft":"1px solid black"}}></td>
                <td></td>
                <td></td>               
                <td></td>
                <td></td>              
                <td></td>
                <td></td>   
                <td></td>   
                <td style={{"borderLeft":"1px solid black"}}>
                    <span className="bi bi-file-earmark-check" style={{"fontSize":"25px"}} title="OPEN"></span>
                </td>
                <td>
                    <div className="p-2 bg-success text-white">BUY</div>                
                </td>
                <td>    
                    <button className="btn btn-warning" onClick={()=>setOpenOperationsAssetModal(true)}><i className="bi bi-box-arrow-up-right"></i></button>
                </td>
            </tr>
            <tr>
            <td>PEPE</td>
                <td>0.90</td>
                <td>USD</td>
                <td style={{"borderRight":"1px solid black"}}>12/05/2020</td>
                <td>1.000</td>
                <td> 
                    EUR
                </td>
                <td> 
                    1.25%
                </td>
              
                <td>
                    1100.26
                </td>
                <td style={{"borderLeft":"1px solid black"}}>
                    1.25
                </td>
                <td>
                <span>
                       <img src="/arrowUp.png" width="15" height="15"/>
                        <span className="text-success ps-1">38.8%</span>
                    </span>
                </td>
                <td style={{"borderLeft":"1px solid black"}}>1,22</td>
                <td>
                    <img src="/arrowUp.png" width="15" height="15"/>
                        <span className="text-success ps-1">38.8%</span>
                </td>
                <td>22/10/2023</td>
                <td>1345.42</td>               
                <td>0.05%</td>
                <td> 
                <img src="/arrowDown.png" width="15" height="15"/>                        
                    <span className="text-danger ps-1">5.15%</span>
                </td>
                <td> 
                <img src="/arrowDown.png" width="15" height="15"/>                        
                    <span className="text-danger ps-1">5.15%</span>
                </td>
                <td>
                    5.25
                </td>
                <td style={{"borderLeft":"1px solid black"}}>
                  
                <TransactionState isSelled={false}/>

                </td>
                <td>          
                <div className="p-2 bg-secondary text-white">HOLD</div>                   
                </td>
                <td>
                <button className="btn btn-warning" onClick={()=>setOpenOperationsAssetModal(true)}><i className="bi bi-box-arrow-up-right"></i></button>
                </td>
            </tr>
        
        </tbody>
     </table>
    </>);
}