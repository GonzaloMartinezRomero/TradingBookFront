
interface Props{
    isSelled: boolean
}

export function TransactionState(props:Props){

return (<>
       
       {props.isSelled ? <span className="bi bi-file-earmark-lock" style={{"fontSize":"25px"}} title="SELLED"></span>
                       : <span className="bi bi-file-earmark-check" style={{"fontSize":"25px"}} title="OPEN"></span>
       }
    </>);
}
