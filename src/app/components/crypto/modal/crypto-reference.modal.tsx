import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CryptoCurrencyReference } from "../../../domain/crypto/crypto-currency.model";
import { checkIfCryptoRefIsAvailable, deleteCryptoReference, getCryptoReference, saveCryptoReference } from "../../../services/crypto.service";

import { Loading } from "@nextui-org/react";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";
import { InformationMessageModal, InformationModalProps } from "../../modal/information-message-modal";
import { TextInput } from "../../util/text.input.component";
import { ButtonCustom, ButtonType } from "../../util/button.component";

interface Props{
    onClose: any    
}

export function CryptoReferenceModal({ onClose }:Props) {

    const [errorModal, setErrorModal] = useState<ErrorModalProps>({ isOpen: false });
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [informationModal, setInformationModal] = useState<InformationModalProps>({ isOpen: false });
    const [cryptoCurrencyReferenceCollection,setCryptoCurrencyReferenceCollection] = useState<CryptoCurrencyReference[]>();
    const [cryptoReference, setCryptoReference] = useState<CryptoCurrencyReference[]>([]);
    const [isCryptoCodeAvailable, setIsCryptoCodeAvailable] = useState<boolean | undefined>(undefined);

    var inputName: string = '';
    var inputCode: string = '';

    const cryptoFindCode = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    updateCryptoCurrencies();
  },[]);


  function saveCryptoReference(){

      const name = inputName;
      const code = inputCode;

    const cryptoRef:CryptoCurrencyReference = {
      id:0,
      code:code,
      name:name
    };

      saveCryptoReference(cryptoRef).then((value) =>
      {
          setInformationModal({ isOpen: true, msg: "Crypto added successfully!" });
          updateCryptoCurrencies();
      }).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function checkIfCodeIsAvailable(){
      setShowSpinner(true);
      setIsCryptoCodeAvailable(undefined);

      checkIfCryptoRefIsAvailable(inputCode).then(response => setIsCryptoCodeAvailable(response))
        .catch(err => setErrorModal({ isOpen: true, msg: err }))
        .finally(() => setShowSpinner(false));
  }
   
  function updateCryptoCurrencies(){
      getCryptoReference().then(value => {
          setCryptoCurrencyReferenceCollection(value);
          setCryptoReference(value);
      }).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function deleteCryptoRef(id:number){
    deleteCryptoReference(id).then((value)=>updateCryptoCurrencies())
                                    .catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

    function updateFilter(value:string) {
       
        if (value?.length > 0) {
            const cryptoFiltered: CryptoCurrencyReference[] = cryptoReference?.filter(x => {
                const valueUpper = x.code.toUpperCase();
                return valueUpper.includes(value.toUpperCase());

            }) ?? [];
            setCryptoCurrencyReferenceCollection(cryptoFiltered);
        }
        else {
            setCryptoCurrencyReferenceCollection(cryptoReference);
        }
    }

  return (<>
      {errorModal.isOpen && <ErrorMessageModal msg={errorModal.msg} onClose={() => setErrorModal({ isOpen: false })} />}
      {informationModal.isOpen && <InformationMessageModal msg={informationModal.msg} onClose={onClose} />}
    {createPortal(     
        <div className="new-crypto-reference-modal">
            <div className="d-flex flex-row-reverse">
                <button className="btn btn-secondary p-1 m-1" style={{ "width": "32px", "height": "33px" }} onClick={onClose}>
                    <i className="bi-x" />
                </button>
            </div>
            <h2 style={{ fontWeight: "bold" }}>Crypto Reference</h2>
            <div className="form-group row ms-4">
                <div className="col-12">
                    <label className="row">Name</label>
                    <TextInput placeHolder={'Code'} initialValue={inputCode} onChangeValue={(val: string) => { inputName = val; }} />
                </div>
            </div>
            <div className="form-group row mt-2 ms-4">
                <div className="col-12">
                    <label className="row">Code</label>
                    <TextInput placeHolder={'Code'} initialValue={inputCode} onChangeValue={(val: string) => { inputCode = val; }}/>                    
                </div>
            </div>
            <div className="form-group row mt-3 ms-1">
                <div className="col-5">
                    <ButtonCustom btnType={ButtonType.Info} text={'Is Available?'} onClick={() => checkIfCodeIsAvailable()} />
                </div>
                <div className="col-2">
                    {showSpinner && <div className="row"><Loading /></div>}
                    {isCryptoCodeAvailable == true && <span className="row bi bi-file-earmark-check" style={{ "fontSize": "35px" }} title="Available" />}
                    {isCryptoCodeAvailable == false && <span className="row bi bi-file-earmark-x" style={{ "fontSize": "35px" }} title="No Available" />}
                </div>
                <div className="col-4 ms-2">
                    <ButtonCustom btnType={ButtonType.Add} onClick={() => saveCryptoReference() }/>
                </div>
            </div>
            <div className="form-group row mt-2 ms-4 mb-3">
                <div className="col-12">
                    <label className="row">Search code</label>
                    <TextInput placeHolder={'Insert code...'} onChangeValue={(val: string) => updateFilter(val)}/>
                </div>
            </div>
            <div className="m-1">
                <table className="table " >
                    <thead style={{ "display": "block" }}>
                        <tr className="table-secondary table-group-divider">
                            <th style={{ "width": "200px" }}>Name</th>
                            <th style={{ "width": "140px" }}>Code</th>
                            <th style={{ "width": "80px" }}></th>
                        </tr>
                    </thead>
                    <tbody style={{ "height": "200px", "width": "420px", "overflowY": "auto", "display": "block" }}>
                        {
                            cryptoCurrencyReferenceCollection?.map((value, index) => {
                                return (
                                    <tr>
                                        <td style={{ "width": "200px" }}>
                                            <span>{value.name}</span>
                                        </td>
                                        <td style={{ "width": "140px" }}>
                                            <span>{value.code}</span>
                                        </td>
                                        <td style={{ "width": "50px" }}>
                                            <ButtonCustom btnType={ButtonType.Delete} onClick={() => { deleteCryptoRef(value.id) } }/>
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