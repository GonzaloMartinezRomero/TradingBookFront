interface Props {
    date?: string
}

export function DateFormat(props: Props) {

    let dateNormalized: string = (props.date != undefined) ? props.date : "NO DATA";

    return (<>
        <span>{dateNormalized}</span>
    </>);
}