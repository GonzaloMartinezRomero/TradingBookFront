"use client";

import { StockCollection } from "./stock/stockCollection";
import { ResumeTradingOperations } from "./resume/resumeTradingOperations";
import { useState } from "react";

export function StartPageLayout(){

const [updateState,setUpdateTradingOperationsState] = useState(false);

return(
    <>        
        <div className="container-fluid">
            <ResumeTradingOperations onUpdateComponent={updateState}></ResumeTradingOperations>
            <div className="mt-3"></div>
            <StockCollection onPropagateChanges={()=>{setUpdateTradingOperationsState(!updateState)}}></StockCollection>
        </div>
    </>
);}