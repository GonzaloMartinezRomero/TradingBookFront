"use client";

import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface Props {
    placeHolder?: string
    initialValue?: number,
    onChangeValue: (value: number) => void
}

export function NumberDecimalInput(props: Props) {

    const [inputValue, setInputValue] = useState<number>(props.initialValue || 0);

    useEffect(() =>
    {
        if (props.initialValue)
            setInputValue(props.initialValue);

    }, [props.initialValue]);

    return (<>
        <input type="number"
            className="form-control"
            placeholder={props.placeHolder ?? ""}
            defaultValue={0}
            value={inputValue}
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