
export enum MarketOperationType{
    BUY,SELL,HOLD
}

interface Props{
    operation: MarketOperationType
}

export function MarketOperation(props:Props){

return (<>
        {props.operation === MarketOperationType.BUY && <div className="p-2 bg-success text-white">BUY</div>}
        {props.operation === MarketOperationType.HOLD && <div className="p-2 bg-secondary text-white">HOLD</div>}        
        {props.operation === MarketOperationType.SELL && <div className="p-2 bg-danger text-white">SELL</div>}        
    </>);
}