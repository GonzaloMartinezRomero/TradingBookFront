import { createPortal } from "react-dom";

export interface InformationModalProps{
  isOpen?:boolean;
  msg?:any;
  onClose?:any;
}

export function InformationMessageModal({ msg, onClose }:InformationModalProps) {
  
  const message:string = msg?.toString() ?? "No Message";

    return (
      createPortal(
        <>
          <div className="error-message-modal">     
            <div className="alert">              
                <h2>Information</h2>
            </div>
            <div className="alert alert-danger">              
              <h4>{message}</h4>
            </div>
            <button className="btn btn-success m-2" 
                    style={{"height":"40px","width":"100px"}}
                    onClick={()=>{onClose()}}>
                      Ok
            </button>
          </div>
        </>,
        document.body)
    );
  }