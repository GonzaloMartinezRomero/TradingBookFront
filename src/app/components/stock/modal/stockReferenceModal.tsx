import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { StockReference } from "../../../domain/stocks/stock-reference.model";
import { addStockReference, checkIfStockCodeIsAvailable, deleteStockReference, getStockReferences } from "../../../services/stock.service";
import { ErrorMessageModal, ErrorModalProps } from "../../util/errorMessageModal";
import { InformationMessageModal, InformationModalProps } from "../../util/informationMessageModal";
import { Loading } from "@nextui-org/react";

interface Props{
    onClose: any    
}

export function StockReferenceModal({ onClose }:Props) {

  const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [informationModal, setInformationModal] = useState<InformationModalProps>({ isOpen: false });
  const [stockReferenceCollection, setStockReferenceCollection] = useState<StockReference[]>();
  const [isStockCodeAvailable,setIsStockCodeAvailable] = useState<boolean | undefined>(undefined);
  const inputName = useRef<HTMLInputElement>(null);
  const inputCode = useRef<HTMLInputElement>(null);
  const stockFindCode = useRef<HTMLInputElement>(null);

    const [stocksReference, setStocksReference] = useState<StockReference[]>([]);

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

        setInformationModal({ isOpen: true, msg:"Stock added successfully!" });

    }).catch(err => setErrorModal({ isOpen: true, msg: err }));
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
      getStockReferences().then(value =>
      {
          setStocksReference(value);
          setStockReferenceCollection(value);

      }).catch(err => setErrorModal({ isOpen: true, msg: err }));
  },[]);

  function checkIfCodeIsAvailable(){
      setShowSpinner(true);
      setIsStockCodeAvailable(undefined);

      const code = inputCode.current?.value as string;

      checkIfStockCodeIsAvailable(code)
          .then(response => {
            setIsStockCodeAvailable(response);
           })
          .catch(err => setErrorModal({ isOpen: true, msg: err }))
          .finally(() => setShowSpinner(false));
  }

    function updateFilter() {
        const stockCode = stockFindCode.current?.value as string;

        if (stockCode?.length > 0) {
            const stocksFiltered: StockReference[] = stocksReference?.filter(x =>
            {
                const valueUpper = x.code.toUpperCase();
                return valueUpper.includes(stockCode.toUpperCase());

            }) ?? [];
            setStockReferenceCollection(stocksFiltered);
        }
        else
        {   
            setStockReferenceCollection(stocksReference);
        }
    }

  return (
    <>
          {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}
          {informationModal.isOpen && <InformationMessageModal msg={informationModal.msg} onClose={onClose} />}
    { createPortal(
     
        <div className="new-stock-reference-modal">
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
            <div className="ms-2 col-4">
              <button className="btn btn-info row" onClick={()=>checkIfCodeIsAvailable()}>Check Availability</button>             
            </div>          
            <div className="col-2">              
                {showSpinner && <div className="row"><Loading /></div>}
                {isStockCodeAvailable == true && <span className="row bi bi-file-earmark-check" style={{"fontSize":"35px"}} title="Available"/>}
                {isStockCodeAvailable == false && <span className="row bi bi-file-earmark-x" style={{ "fontSize": "35px" }} title="No Available" />}                  
                </div>            
                <div className="col-4">
                    <button className="btn btn-success"
                        style={{ "width": "100px", "height": "40px" }}
                        onClick={() => { saveStockReference(); }}>
                        Add
                    </button>
                </div>
            </div>            
            <div className="form-group row mt-3 mb-3">
                <label className="col-2 ms-3 mt-1">Filter</label>
                <input type="text" className="col-4" placeholder="Stock code" ref={stockFindCode} onChange={(e) => { updateFilter(); }} />          
            </div>
          <div className="m-1">                                  
            <table className="table " >
                    <thead style={{ "display": "block"  }}>
                        <tr className="table-secondary table-group-divider">
                            <th style={{ "width": "200px" }}>Name</th>
                            <th style={{ "width": "200px" }}>Code</th>
                            <th style={{ "width": "200px" }}></th>
                        </tr>
                    </thead>
                    <tbody style={{"height": "250px", "width":"500px", "overflowY": "auto", "display": "block" }}>
                {
                  stockReferenceCollection?.map((value,index)=>{
                      return (
                        <tr>
                          <td style={{ "width": "200px" }}>
                           <span>{value.name}</span>
                          </td>
                              <td style={{ "width": "200px" }}>
                            <span>{value.code}</span>
                          </td>
                              <td style={{ "width": "200px" }}>
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