import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ErrorMessageModal, ErrorModalProps } from "../../util/errorMessageModal";
import { DepositPlatform } from "../../../domain/deposit/deposit-platform.model";
import { addDepositPlatform, deleteDepositPlatform, getAllDepositPlatforms } from "../../../services/deposit-platform.service";
import { NewDepositPlatform } from "../../../domain/deposit/new-deposit-platform.model";

interface Props{
    onClose: any    
}

export function PlatformModal({ onClose }:Props) {

  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});
  const [depositPlatformCollection,setDepositPlatformCollection] = useState<DepositPlatform[]>();  
  const inputName = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    loadDepositPlatforms();
  },[]);


  function loadDepositPlatforms(){
    getAllDepositPlatforms().then(x=>setDepositPlatformCollection(x)) 
                            .catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function saveNewDepositPlatform(){

    const name = inputName.current?.value as string;

    const newDepositPlatform:NewDepositPlatform = {    
        name:name
    };

    addDepositPlatform(newDepositPlatform).then((value)=>loadDepositPlatforms())
                                          .catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function removeDepositPlatform(id:number){
    deleteDepositPlatform(id).then((value)=>loadDepositPlatforms())
                                    .catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  return (<>
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    {createPortal(     
        <div className="platform-modal">
          <div className="d-flex flex-row-reverse">
          <button className="btn btn-secondary p-1 m-1" style={{"width":"32px","height":"33px"}} onClick={onClose}>
            <i className="bi-x"/>
          </button>
          </div>
          <h2>Deposit Platform</h2>
          <div className="form-group row ms-4">
            <div className="col-10">
              <label className="row">Name</label>
              <input type="text" className="row form-control" placeholder="Name" ref={inputName} />              
            </div>
          </div>          
          <div className="form-group row mt-3 mb-3">                        
            <div className="form-group col-12">
              <button className="btn btn-success" 
                      style={{"width":"100px","height":"40px"}}
                      onClick={()=>{saveNewDepositPlatform();}}>                
                Add
                </button>
            </div>
          </div>
          <div className="m-1" style={{"maxHeight":"200px","overflowY":"auto"}}>                                  
            <table className="table table-bordered table-striped" >
              <thead>
                <tr className="table-secondary table-group-divider">
                  <th>Name</th>                  
                  <th>Tool</th>
                </tr>
              </thead>
              <tbody style={{"opacity":"0.9"}}>
                {
                  depositPlatformCollection?.map((value,index)=>{
                      return (
                        <tr>
                          <td>
                           <span>{value.name}</span>
                          </td>                          
                          <td>
                            <button className="btn btn-danger"  onClick={()=>{removeDepositPlatform(value.id)}} ><i className="bi bi-trash3"></i></button>
                          </td>
                        </tr>
                      );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>,
      document.body)}
      </>
  );
}