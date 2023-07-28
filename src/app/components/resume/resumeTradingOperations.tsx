import { useEffect, useRef, useState } from "react";
import { CurrencyModal } from "../modals/currencyModal";
import { addAmountToDeposit, getDeposit, getStockTotalEurEarned } from "@/app/apiService/httpService";

interface Props{
    onUpdateComponent?:any
}

export function ResumeTradingOperations({onUpdateComponent}:Props){

    const [deposit,setDeposit] = useState<number>(0);
    const [stockEarn,setStockEarn] = useState<number>(0);
    const [exchangeEarn,setExchangeEarn] = useState<number>(0);

    const inputAmountValue = useRef<HTMLInputElement>(null);

useEffect(()=>{

    loadTotalDeposit();
    loadStockEarnedAmount();

},[onUpdateComponent, ]);    

function loadTotalDeposit(){
    getDeposit().then(value=>setDeposit(value.amount));
}

function loadStockEarnedAmount(){ 
    getStockTotalEurEarned().then(value=>setStockEarn(value.amount));
}

function addToDeposit(){

    const amountToAdd:number = inputAmountValue.current?.value as unknown as number;
    addAmountToDeposit(amountToAdd).then(value=>{loadTotalDeposit()});
}

function fixTo2Decimal(amount:number){

    return amount.toFixed(2).toString();
}

return(
    <>        
        <h2>Trading Operations</h2>
        <div className="row" style={{"border":"1px solid black"}}>
        </div>
        <div className="row">
            <div className="col-4">
                <table className="mt-3" style={{"width":"100%"}}>
                <thead>
                <tr className=" " style={{"fontStyle":"oblique"}}>
                    <th>Deposit</th>                
                    <th>Stock Earned</th>                                      
                    <th>Exchange Earned</th>                                      
                    <th>Total Earned</th>                                      
                </tr>
                </thead>
                <tbody className="table-secondary table-group-divider">
                    <tr>
                        <td>
                            {fixTo2Decimal(deposit)}€
                        </td>
                        <td>
                            {fixTo2Decimal(stockEarn)}€
                        </td>
                        <td>
                            {fixTo2Decimal(exchangeEarn)}€
                        </td>
                        <td>
                            {fixTo2Decimal(stockEarn + exchangeEarn)}€
                        </td>
                    </tr>
                </tbody>            
                </table>
            </div>            
            <div className="col-1 mb-3 align-self-end">
                <input type="number" className="form-control" placeholder="Amount €" defaultValue={0} style={{"height":"40px"}} ref={inputAmountValue}/>                            
            </div>
            <div className="col-1 mb-3 align-self-end">            
                <button type="button" className="btn btn-success" style={{"width":"120px"}} onClick={()=>{addToDeposit()}}>
                    <span className="me-1">Deposit</span>
                    <i className="bi bi-currency-euro"></i>
                </button>  
            </div>             
        </div>
    </>
);}