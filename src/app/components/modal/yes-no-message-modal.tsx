import { useEffect } from "react";
import { createPortal } from "react-dom";

interface Props{
    msg:string,
    onYesResponse:any,
    onNoResponse:any
}

export function YesNoMessageModal({ msg,onYesResponse,onNoResponse }:Props) {

    useEffect(() => { window.scrollTo(0, 0); },[]);

    return (
      createPortal(
        <>
          <div className="yes-no-modal">            
            <div className="row mt-4">
              <h2>{msg}</h2>
            </div>
            <div className="form-group row ms-2 mt-4">
              <div className="col-6">
                <button className="btn btn-success" 
                        style={{"height":"40px","width":"100px"}}
                        onClick={()=>{onYesResponse()}}>
                          Yes
                        </button>
              </div>
              <div className="col-6">
                <button className="btn btn-danger" 
                        style={{"height":"40px","width":"100px"}}
                        onClick={()=>{onNoResponse()}}
                        >
                          No
                        </button>
              </div>
            </div>
          </div>
        </>,
        document.body)
    );
  }