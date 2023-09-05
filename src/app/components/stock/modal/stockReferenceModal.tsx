import { StockReference } from "@/app/apiService/model/stockReference.model";
import { addStockReference, checkIfStockCodeIsAvailable, deleteStockReference, getStockReferences } from "@/app/apiService/stockApiService";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ErrorMessageModal, ErrorModalProps } from "../../util/errorMessageModal";

interface Props{
    onClose: any    
}

export function StockReferenceModal({ onClose }:Props) {

  const [errorModal,setErrorModal] = useState<ErrorModalProps>({isOpen:false});
  const [stockReferenceCollection, setStockReferenceCollection] = useState<StockReference[]>();
  const [isStockCodeAvailable,setIsStockCodeAvailable] = useState<boolean | undefined>(undefined);
  const inputName = useRef<HTMLInputElement>(null);
  const inputCode = useRef<HTMLInputElement>(null);

  function saveStockReference(){

    const name = inputName.current?.value as string;
    const code = inputCode.current?.value as string;

    const stockRef:StockReference = {
      id:0,
      code:code,
      name:name
    };

    addStockReference(stockRef).then(value=>
    {      
      const stockCollectionAux: StockReference[] = [];
      stockReferenceCollection?.forEach(value=>stockCollectionAux.push(value));
      stockCollectionAux?.push(value);

      setStockReferenceCollection(stockCollectionAux);
    }).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function deleteStockRef(id:number){

    deleteStockReference(id).then(value => {

        const stockCollectionAux: StockReference[] = [];
        stockReferenceCollection?.forEach(x=>
          {
            if(x.id !== id)
              stockCollectionAux.push(x);
          });
  
          setStockReferenceCollection(stockCollectionAux);  
    }).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  useEffect(()=>{
    getStockReferences().then(value=>setStockReferenceCollection(value)).catch(err=>setErrorModal({isOpen:true,msg:err}));
  },[]);

  function checkIfCodeIsAvailable(){
    const code = inputCode.current?.value as string;

    checkIfStockCodeIsAvailable(code).then(response=>setIsStockCodeAvailable(response)).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }
  
  return (
    <>
    {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={()=>setErrorModal({isOpen:false})} />}
    { createPortal(
     
        <div className="new-stock-modal">
          <div className="d-flex flex-row-reverse">
          <button className="btn btn-secondary p-1 m-1" style={{"width":"32px","height":"33px"}} onClick={onClose}>
            <i className="bi-x"/>
          </button>
          </div>
          <h2>Stock Reference</h2>
          <div className="form-group row ms-4">
            <div className="col-10">
              <label className="row">Name</label>
              <input type="text" className="row form-control" placeholder="Name" ref={inputName} />              
            </div>
          </div>
          <div className="form-group row mt-2 ms-4">
            <div className="col-10">
              <label className="row">Code</label>
              <input type="text" className="row form-control" placeholder="Code" ref={inputCode} />              
            </div>
          </div>
          <div className="form-group row mt-3 ms-1">
            <div className="col-5">
              <button className="btn btn-info row" onClick={()=>checkIfCodeIsAvailable()}>Check Availability</button>             
            </div>          
            <div className="col-5">
              {isStockCodeAvailable === undefined &&  <span className="row bi bi-question-square" style={{"fontSize":"35px"}} title="No Checked"/>}
              {isStockCodeAvailable == true && <span className="row bi bi-file-earmark-check" style={{"fontSize":"35px"}} title="Available"/>}
              {isStockCodeAvailable == false &&  <span className="row bi bi-file-earmark-x" style={{"fontSize":"35px"}} title="No Available"/>}             
            </div>
          </div>         
          <div className="form-group row mt-3 mb-3">                        
            <div className="form-group col-12">
              <button className="btn btn-success" 
                      style={{"width":"100px","height":"40px"}}
                      onClick={()=>{saveStockReference();}}>                
                Add
                </button>
            </div>
          </div>
          <div className="m-1" style={{"maxHeight":"200px","overflowY":"auto"}}>                                  
            <table className="table table-bordered table-striped" >
              <thead>
                <tr className="table-secondary table-group-divider">
                  <th>Name</th>
                  <th>Code</th>
                  <th>Tool</th>
                </tr>
              </thead>
              <tbody style={{"opacity":"0.9"}}>
                {
                  stockReferenceCollection?.map((value,index)=>{
                      return (
                        <tr>
                          <td>
                           <span>{value.name}</span>
                          </td>
                          <td>
                            <span>{value.code}</span>
                          </td>
                          <td>
                            <button className="btn btn-danger"  onClick={()=>{deleteStockRef(value.id)}} ><i className="bi bi-trash3"></i></button>
                          </td>
                        </tr>
                      );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>,document.body)}
        </>
  );
}