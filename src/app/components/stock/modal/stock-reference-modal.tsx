import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { StockReference } from "../../../domain/stocks/stock-reference.model";
import { addStockReference, checkIfStockCodeIsAvailable, deleteStockReference, getStockReferences } from "../../../services/stock.service";

import { Loading } from "@nextui-org/react";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";
import { InformationMessageModal, InformationModalProps } from "../../modal/information-message-modal";
import { TextInput } from "../../util/text.input.component";
import { ButtonCustom, ButtonType } from "../../util/button.component";

interface Props{
    onClose: any    
}

export function StockReferenceModal({ onClose }:Props) {

  const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [informationModal, setInformationModal] = useState<InformationModalProps>({ isOpen: false });
  const [stockReferenceCollection, setStockReferenceCollection] = useState<StockReference[]>();
  const [isStockCodeAvailable,setIsStockCodeAvailable] = useState<boolean | undefined>(undefined);
  const stockFindCode = useRef<HTMLInputElement>(null);
  const [stocksReference, setStocksReference] = useState<StockReference[]>([]);

  var inputName: string = '';
  var inputCode: string = '';

  function saveStockReference(){

    const stockRef:StockReference = {
      id:0,
        code: inputCode,
        name: inputName
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

      checkIfStockCodeIsAvailable(inputCode)
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
                <ButtonCustom btnType={ButtonType.Close} onClick={onClose} />
            </div>
            <h2 style={{ fontWeight: "bold" }}>Stock Reference</h2>
          <div className="form-group row ms-4">
            <div className="col-12">
                <label className="row">Name</label>
                <TextInput placeHolder={'Name'} onChangeValue={(x: string) => inputName = x} ></TextInput>                
            </div>
          </div>
          <div className="form-group row mt-2 ms-4">
            <div className="col-12">
                <label className="row">Code</label>
                <TextInput placeHolder={'Code'} onChangeValue={(x: string) => inputCode = x} ></TextInput>        
            </div>
          </div>
          <div className="form-group row mt-3 ms-1">
                <div className="ms-1 col-5">
                    <ButtonCustom btnType={ButtonType.Info} text={'Check'} onClick={() => { checkIfCodeIsAvailable() } } />  
            </div>          
            <div className="col-2">              
                {showSpinner && <div className="row"><Loading /></div>}
                {isStockCodeAvailable == true && <span className="row bi bi-file-earmark-check" style={{"fontSize":"35px"}} title="Available"/>}
                {isStockCodeAvailable == false && <span className="row bi bi-file-earmark-x" style={{ "fontSize": "35px" }} title="No Available" />}                  
                </div>
                <div className="col-4 ms-1">
                    <ButtonCustom btnType={ButtonType.Add} onClick={() => { saveStockReference() }} />  
                </div>
            </div>
            <div className="form-group row mt-2 ms-4 mb-3">
                <div className="col-12">
                    <label className="row">Search code</label>
                    <input type="text" className="row form-control" placeholder="Insert code..." ref={stockFindCode} onChange={(e) => { updateFilter(); }} />          
                </div>
            </div>            
          <div className="m-1">                                  
            <table className="table " >
                    <thead style={{ "display": "block"  }}>
                        <tr className="table-secondary table-group-divider">
                            <th style={{ "width": "200px" }}>Name</th>
                            <th style={{ "width": "140px" }}>Code</th>
                            <th style={{ "width": "80px" }}></th>
                        </tr>
                    </thead>
                    <tbody style={{"height": "200px", "width":"420px", "overflowY": "auto", "display": "block" }}>
                {
                  stockReferenceCollection?.map((value,index)=>{
                      return (
                        <tr>
                          <td style={{ "width": "200px" }}>
                           <span>{value.name}</span>
                          </td>
                              <td style={{ "width": "140px" }}>
                            <span>{value.code}</span>
                          </td>
                              <td style={{ "width": "50px" }}>
                                  <ButtonCustom btnType={ButtonType.Delete} onClick={() => { deleteStockRef(value.id) }}/>
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