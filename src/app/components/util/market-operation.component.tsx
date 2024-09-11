
export enum MarketOperationType{
    BUY,SELL,HOLD
}

interface Props{
    operation: string
}

export function MarketOperation(props:Props){

const operation: MarketOperationType = MarketOperationType[props.operation as keyof typeof MarketOperationType]

return (<>
        {operation === MarketOperationType.BUY && <div className="p-2 bg-success text-white">BUY</div>}
        {operation === MarketOperationType.HOLD && <div className="p-2 bg-secondary text-white">HOLD</div>}        
        {operation === MarketOperationType.SELL && <div className="p-2 bg-danger text-white">SELL</div>}        
    </>);
}