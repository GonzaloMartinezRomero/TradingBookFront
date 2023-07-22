"use client";

import { StockCollection } from "./stock/stockCollection";
import { ResumeTradingOperations } from "./resume/resumeTradingOperations";

export function StartPageLayout(){

return(
    <>        
        <div className="container-fluid">
            <ResumeTradingOperations></ResumeTradingOperations>
            <div className="mt-3"></div>
            <StockCollection></StockCollection>
        </div>
    </>
);}