"use client";

import { InvestCollectionHeader } from "./invest/investCollectionHeader";
import { ResumeTradingOperations } from "./resume/resumeTradingOperations";

export function StartPageLayout(){

return(
    <>        
        <div className="container-fluid">
            <ResumeTradingOperations></ResumeTradingOperations>
            <div className="mt-2"></div>
            <InvestCollectionHeader></InvestCollectionHeader>
        </div>
    </>
);}