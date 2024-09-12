import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Loading } from "@nextui-org/react";

import { StockTick } from "../../domain/stockTick/stock-tick.model";

import { deleteStockTick, getStockTicks, isStockTickAvailable, saveStockTick } from "../../services/stock-tick.service";
import { ButtonCustom, ButtonType } from "../util/button.component";
import { TextInput } from "../util/text.input.component";
import { ErrorMessageModal, ErrorModalProps } from "../modal/error-message.modal";
import { InformationMessageModal, InformationModalProps } from "../modal/information-message.modal";

interface Props{
    onClose: any    
}

export function StockTickModal({ onClose }:Props) {

  const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [informationModal, setInformationModal] = useState<InformationModalProps>({ isOpen: false });
  const [stockTickCollection, setStockTickCollection] = useState<StockTick[]>();
  const [stockTickBaseCollection, setStockTickBaseCollection] = useState<StockTick[]>();
  const [isStockCodeAvailable, setIsStockCodeAvailable] = useState<boolean | undefined>(undefined);
  const [stockFindCode, setStockFindCode] = useState<string | undefined>(undefined);

    const [inputName, setInputName] = useState<string>('');
    const [inputCode, setInputCode] = useState<string>('');

    useEffect(() => {
        loadStockTicks();
    }, []);

    function loadStockTicks() {
        getStockTicks().then(value => {
            setStockTickCollection(value);
            setStockTickBaseCollection(value);
        }).catch(err => setErrorModal({ isOpen: true, msg: err }));
    }

  function saveTick(){

    const stockTickInput:StockTick = {
      id:0,
        code: inputCode,
        name: inputName
    };

      saveStockTick(stockTickInput).then(value=>
      {
          loadStockTicks();
          setInformationModal({ isOpen: true, msg:"Stock added successfully!" });

    }).catch(err => setErrorModal({ isOpen: true, msg: err }));
  }

  function deleteTick(id:number){

      deleteStockTick(id).then(value => {
          loadStockTicks();
    }).catch(err=>setErrorModal({isOpen:true,msg:err}));
    }

  function checkIfCodeIsAvailable(){
      setShowSpinner(true);
      setIsStockCodeAvailable(undefined);

      isStockTickAvailable(inputCode)
          .then(response => {
            setIsStockCodeAvailable(response);
           })
          .catch(err => setErrorModal({ isOpen: true, msg: err }))
          .finally(() => setShowSpinner(false));
  }

    function updateFilter() {

        let stockCode:string = stockFindCode ?? '';

        if (stockCode.length > 0) {
            const stocksFiltered: StockTick[] = stockTickBaseCollection?.filter(x =>
            {
                const valueUpper = x.code.toUpperCase();
                return valueUpper.includes(stockCode.toUpperCase());

            }) ?? [];
            setStockTickCollection(stocksFiltered);
        }
        else
        {   
            setStockTickCollection(stockTickBaseCollection);
        }
    }

  return (
    <>
          {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}
          {informationModal.isOpen && <InformationMessageModal msg={informationModal.msg} onClose={() => setInformationModal({ isOpen: false })} />}
    { createPortal(
     
        <div className="new-stock-reference-modal">
          <div className="d-flex flex-row-reverse">
                <ButtonCustom btnType={ButtonType.Close} onClick={onClose} />
            </div>
            <h2 style={{ fontWeight: "bold" }}>Stock Tick</h2>
          <div className="form-group row ms-4">
            <div className="col-12">
                <label className="row">Name</label>
                <TextInput placeHolder={'Name'} onChangeValue={(x: string) => setInputName(x)} ></TextInput>                
            </div>
          </div>
          <div className="form-group row mt-2 ms-4">
            <div className="col-12">
                <label className="row">Code</label>
                    <TextInput placeHolder={'Code'} onChangeValue={(x: string) => setInputCode(x)} ></TextInput>        
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
                    <ButtonCustom btnType={ButtonType.Add} onClick={() => { saveTick() }} />  
                </div>
            </div>
            <div className="form-group row mt-2 ms-4 mb-3">
                <div className="col-12">
                    <label className="row">Find stock</label>
                    <TextInput placeHolder={'Tick'} onChangeValue={(x: string) => { setStockFindCode(x); updateFilter(); }} ></TextInput>      
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
                  stockTickCollection?.map((value,index)=>{
                      return (
                        <tr>
                          <td style={{ "width": "200px" }}>
                           <span>{value.name}</span>
                          </td>
                              <td style={{ "width": "140px" }}>
                            <span>{value.code}</span>
                          </td>
                              <td style={{ "width": "50px" }}>
                                  <ButtonCustom btnType={ButtonType.Delete} onClick={() => { deleteTick(value.id) }}/>
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