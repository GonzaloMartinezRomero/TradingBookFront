import { CSSProperties } from "@nextui-org/react/types/theme";
import { useEffect, useState } from "react";

export enum ButtonType {
    Delete,
    Market,
    Sell,
    Add,
    Info,
    Close,
    Update
}

interface Props {
    btnType: ButtonType,    
    text?: string,
    onClick: () => void
}

export function ButtonCustom(props: Props) {

    const [btnClass, setBtnClass] = useState<string>('');
    const [btnIconClass, setBtnIconClass] = useState<string>('');
    const [btnText, setBtnText] = useState<string>('');
    const [btnStyle, setBtnStyle] = useState<CSSProperties>({});

    useEffect(() =>
    {
        switch (props.btnType) {
            case ButtonType.Add:
                setBtnClass('btn btn-success');
                setBtnIconClass('bi bi-plus-circle');
                setBtnStyle({ "width": "130px", "height": "45px" });
                if (props.text != null)
                    setBtnText(props.text)
                else
                    setBtnText('Add');
                break;

            case ButtonType.Close:
                setBtnClass('btn btn-secondary p-1 m-1');
                setBtnIconClass('bi-x');
                setBtnStyle({ "width": "32px", "height": "33px" });                
                break;

            case ButtonType.Delete:
                setBtnClass('btn btn-danger');
                setBtnIconClass('bi bi-trash');
                setBtnStyle({ "width": "40px", "height": "45px" });
                break;

            case ButtonType.Info:
                setBtnClass('btn btn-info');                
                setBtnStyle({ "width": "130px", "height": "45px" });
                if (props.text != null)
                    setBtnText(props.text)
                else
                    setBtnText('Info');
                break;

            case ButtonType.Market:
                setBtnClass('btn btn-success');
                setBtnIconClass('bi bi-sliders2-vertical');
                break;

            case ButtonType.Sell:
                setBtnClass('btn btn-warning');
                setBtnIconClass('bi bi-box-arrow-up-right');               
                break;

            case ButtonType.Update:
                setBtnClass('btn btn-success');
                setBtnStyle({ "width": "130px", "height": "45px" });
                if (props.text != null)
                    setBtnText(props.text)
                else
                    setBtnText('Update');
                break;
        }

    }, []);

    return (<>
        <button className={btnClass} style={btnStyle} onClick={() => props.onClick()}>
            {btnText.length > 0 && <span className="me-1">{btnText}</span>}
            <i className={btnIconClass}></i>
        </button >
    </>);
}