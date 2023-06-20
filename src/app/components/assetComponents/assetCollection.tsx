import { useState } from "react";
import { SellAssetModal } from "../sellAssetModal";

export function AssetCollection(){

    const [openModifyAssetModal, setOpenModifyAssetModal] = useState(false);

    return(
    <>
     {openModifyAssetModal && <SellAssetModal onClose={()=>setOpenModifyAssetModal(false)}/>}    
     <table className="table table-striped mt-3">
        <thead>
            <tr className="table-group-divider table-success">
                <th colSpan={4} className="text-center" style={{"borderRight":"1px solid black"}}>ASSET INFORMATION</th>                
                <th colSpan={5} className="text-center" style={{"borderRight":"1px solid black"}}>INITIAL INVEST</th>                      
                <th colSpan={2} className="text-center" style={{"borderRight":"1px solid black"}}>ASSET CURRENT STATE</th>      
                <th colSpan={5} className="text-center" style={{"borderRight":"1px solid black"}}>INVEST RETURN</th>      
                <th colSpan={2} className="text-center" style={{"borderRight":"1px solid black"}}>INVEST EXCHANGE</th>      
                <th colSpan={2} className="text-center">STATE</th>      
            </tr>
            <tr className="text-center table-secondary table-group-divider">
                <th>Name</th>
                <th>Price</th>
                <th>Currency</th>
                <th style={{"borderRight":"1px solid black"}}>Date</th>    
                <th>Amount</th>                
                <th>Currency</th>
                <th>Fee</th>
                <th>Buy</th>                
                <th>Asset Exchange</th>                
                <th style={{"borderLeft":"1px solid black"}}>Price</th>
                <th>Diff</th>                
                <th style={{"borderLeft":"1px solid black"}}>Price</th>
                <th>Date</th>
                <th>Return</th>
                <th>Fee</th>
                <th>Diff</th>         
                <th style={{"borderLeft":"1px solid black"}}>Invest Exchange</th>                
                <th>Diff</th>                
                <th style={{"borderLeft":"1px solid black"}}>State</th>
                <th>Actions</th>                
            </tr>
        </thead>
        <tbody className="text-center">
            <tr>
                <td >
                    <span className="media-body">BTC-EUR</span>
                </td>
                <td>26.568,25</td>
                <td>EUR</td>
                <td style={{"borderRight":"1px solid black"}}>10/05/2020 14:25</td>
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
                <td>
                  98.5
                </td>
                <td style={{"borderLeft":"1px solid black"}}>24.259,65</td>
                <td>
                    <span>
                        <img src="/arrowDown.png" width="15" height="15"/>                        
                        <span className="text-danger ps-1">8.68%</span>
                    </span>
                </td>
                <td style={{"borderLeft":"1px solid black"}}>24.258,77</td>
                <td>13/02/2022 14:25</td>
                <td >94.85</td>
                <td>0.25%</td>
                <td>
                    <span>
                        <img src="/arrowDown.png" width="15" height="15"/>                        
                        <span className="text-danger ps-1">5.15%</span>
                    </span>
                </td>   
                <td style={{"borderLeft":"1px solid black"}}>
                    <span>
                        94.85
                    </span>
                </td>   
                <td>
                    <span>
                        <img src="/arrowDown.png" width="15" height="15"/>                        
                        <span className="text-danger ps-1">5.15%</span>
                    </span>
                </td>                 
                <td style={{"borderLeft":"1px solid black"}}>
                    <span className="bi bi-file-earmark-lock" style={{"fontSize":"25px"}} title="SELLED"></span>
                </td>
                <td>                
                </td>
            </tr>
            <tr>
            <td>MARA</td>
                <td>0.90</td>
                <td>USD</td>
                <td style={{"borderRight":"1px solid black"}}>12/05/2020 19.35</td>
                <td>1.000</td>
                <td> 
                    EUR
                </td>
                <td> 
                    1.25%
                </td>
                <td>
                    998.75
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
                <td style={{"borderLeft":"1px solid black"}}></td>   
                <td></td>   
                <td style={{"borderLeft":"1px solid black"}}>
                    <span className="bi bi-file-earmark-check" style={{"fontSize":"25px"}} title="OPEN"></span>
                </td>
                <td>
                    <div className="text-center">
                        <div className="d-inline p-2">
                            <button className="btn btn-warning" onClick={()=>setOpenModifyAssetModal(true)}>Sell</button>
                        </div>                        
                    </div>                    
                </td>
            </tr>
            <tr>
            <td>PEPE</td>
                <td>0.90</td>
                <td>USD</td>
                <td style={{"borderRight":"1px solid black"}}>12/05/2020 19.35</td>
                <td>1.000</td>
                <td> 
                    EUR
                </td>
                <td> 
                    1.25%
                </td>
                <td>
                    998.75
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
                <td>22/10/2023 19:35</td>
                <td>1345.42</td>               
                <td>0.05%</td>
                <td> 
                    <span>
                       <img src="/arrowUp.png" width="15" height="15"/>
                        <span className="text-success ps-1">38.8%</span>
                    </span>
                </td>
                <td style={{"borderLeft":"1px solid black"}}>
                    <span>
                        1.100,00
                    </span>
                </td>   
                <td>
                <span>
                       <img src="/arrowUp.png" width="15" height="15"/>
                        <span className="text-success ps-1">10%</span>
                    </span>
                </td>   
                <td style={{"borderLeft":"1px solid black"}}>
                  <span className="bi bi-file-earmark-lock" style={{"fontSize":"25px"}} title="SELLED"></span>
                </td>
                <td>                   
                </td>
            </tr>
        
        </tbody>
     </table>
    </>);
}