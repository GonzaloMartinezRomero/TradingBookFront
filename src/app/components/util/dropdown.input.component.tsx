"use client";

import { useEffect, useState } from 'react';
import Select from 'react-select'

export interface DropDownValue {
    value: number,
    label:string
}

interface Props {
    values: DropDownValue[] | undefined,
    onChangeSelectedValue: (valueSelected: DropDownValue) => void,
    selectedValue?: DropDownValue
}

export function DropDownInput(props: Props) {

    const dropDownValues: DropDownValue[] = (props.values === undefined) ? [] as unknown as DropDownValue[] : props.values;
    const [selectedValueByDefault, setSelectedValueByDefault] = useState<any>({ label: props.selectedValue?.label ?? 'Select....' });

    useEffect(() =>
    {
        if (props.selectedValue)
            setSelectedValueByDefault({ label: props.selectedValue?.label ?? 'Select....' });
            
    }, [props.selectedValue]);

    return (<>
        <Select            
            classNamePrefix="select"
            value={selectedValueByDefault}
            isSearchable={true}
            options={dropDownValues}
            onChange={(valueSelected: any) => { props.onChangeSelectedValue.call(valueSelected, valueSelected); setSelectedValueByDefault({ label: valueSelected.label }); }}
            onInputChange={() => { }}
            onMenuOpen={() => { }}
            onMenuClose={() => { }}
            ></Select >
    </>);
}