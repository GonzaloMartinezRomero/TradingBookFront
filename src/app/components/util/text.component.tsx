interface Props {
    text?: string
}

export function TextFormat(props: Props) {

    let textNormalized: string = (props.text != undefined) ? props.text : "NO DATA";

    return (<>
        <span className="media-body">{textNormalized}</span>
    </>);
}