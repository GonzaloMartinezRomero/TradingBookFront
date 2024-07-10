import { useState } from "react";

interface Props {
    placeHolder?: string
    initialValue?: string,
    onChangeValue: (value: string) => void
}

export function TextInput(props: Props) {

    const [inputValue, setInputValue] = useState<string>('');
    
    return (<>
        <input type="text" className="row form-control" placeholder={props.placeHolder} defaultValue={props.initialValue} onChange={(event: any) => {
                setInputValue(event.target.value);
                props.onChangeValue.call(event.target.value, event.target.value);
        }} />    
    </>);
}