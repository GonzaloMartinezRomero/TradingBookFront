interface Props{
    amount: number
}

export function MonetaryAmount(props:Props){

let amountNormalized = props.amount.toString();

return (<>
        <span>{amountNormalized}</span>
    </>);
}