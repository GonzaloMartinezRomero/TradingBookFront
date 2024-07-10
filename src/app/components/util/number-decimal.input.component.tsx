import { useState } from "react";

interface Props {
    placeHolder?: string
    initialValue?: number,
    onChangeValue: (value: number) => void
}

export function NumberDecimalInput(props: Props) {

    const [inputValue, setInputValue] = useState<number>(0.0);
    
    return (<>
        <input type="number"
            className="form-control"
            placeholder={props.placeHolder ?? ""}
            defaultValue={props.initialValue ?? 0.0}           
            onChange={(event: any) => {
                if (!Number.isNaN(event.target.valueAsNumber)) {                                
                    setInputValue(event.target.value);
                    props.onChangeValue.call(event.target.value, event.target.value);
                } else {
                    event.target.value = inputValue;
                }           
            }} />
    </>);
}