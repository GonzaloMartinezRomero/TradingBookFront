interface Props{
    amount?: number
}

export function MonetaryAmount(props:Props){

const formatter = new Intl.NumberFormat('es-ES',{maximumFractionDigits:5});

let amountNormalized:string = (props.amount!=undefined)? formatter.format(props.amount): "NO DATA";

return (<>
        <span>{amountNormalized}</span>
    </>);
}