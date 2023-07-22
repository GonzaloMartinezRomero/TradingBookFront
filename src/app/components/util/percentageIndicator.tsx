
interface Props{
    amount: number
}

export function PercentageIndicator(props:Props){

let normalizedAmount:string = props.amount.toFixed(3).toString();
let isPositive:boolean = props.amount >= 0.0;

return (<>
       
       {isPositive ? <span className="text-success ps-1"><img src="/arrowUp.png" width="15" height="15"/>{normalizedAmount}%</span>
                   : <span className="text-danger ps-1"><img src="/arrowDown.png" width="15" height="15"/>{normalizedAmount}%</span>}
    </>);
}