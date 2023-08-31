interface Props{
    amount?: number
}

export function MonetaryAmount(props:Props){

const formatter = new Intl.NumberFormat('es-ES');

let amountNormalized:string = (props.amount!=undefined)? formatter.format(props.amount): "NO DATA";

return (<>
        <span>{amountNormalized}</span>
    </>);
}