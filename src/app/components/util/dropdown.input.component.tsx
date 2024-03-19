import Select from 'react-select'

export interface DropDownValue {
    value: number,
    label:string
}

interface Props {
    values: DropDownValue[] | undefined,
    onChangeSelectedValue: (valueSelected: DropDownValue)=>void
}

export function DropDownInput(props: Props) {

    const dropDownValues: DropDownValue[] = (props.values === undefined) ? [] as unknown as DropDownValue[] : props.values;

    return (<>
        <Select            
            classNamePrefix="select"     
            isSearchable={true}
            options={dropDownValues}
            onChange={(valueSelected: any) => props.onChangeSelectedValue.call(valueSelected, valueSelected)}
            onInputChange={() => { }}
            onMenuOpen={() => { }}
            onMenuClose={() => { }}
            ></Select >
    </>);
}