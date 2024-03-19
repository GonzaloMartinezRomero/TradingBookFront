import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CryptoCurrencyReference } from "../../../domain/crypto/crypto-currency.model";
import { checkIfCryptoRefIsAvailable, deleteCryptoCurrencyReference, getCryptoCurrenciesReference, saveCryptoCurrencyReference } from "../../../services/crypto.service";

import { Loading } from "@nextui-org/react";
import { ErrorMessageModal, ErrorModalProps } from "../../modal/error-message-modal";
import { InformationMessageModal, InformationModalProps } from "../../modal/information-message-modal";

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
  const inputName = useRef<HTMLInputElement>(null);
  const inputCode = useRef<HTMLInputElement>(null);
    const cryptoFindCode = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    updateCryptoCurrencies();
  },[]);


  function saveCryptoReference(){

    const name = inputName.current?.value as string;
    const code = inputCode.current?.value as string;

    const cryptoRef:CryptoCurrencyReference = {
      id:0,
      code:code,
      name:name
    };

      saveCryptoCurrencyReference(cryptoRef).then((value) =>
      {
          setInformationModal({ isOpen: true, msg: "Crypto added successfully!" });
          updateCryptoCurrencies();
      }).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function checkIfCodeIsAvailable(){
      setShowSpinner(true);
      setIsCryptoCodeAvailable(undefined);
      const code = inputCode.current?.value as string;
    checkIfCryptoRefIsAvailable(code).then(response=>setIsCryptoCodeAvailable(response))
        .catch(err => setErrorModal({ isOpen: true, msg: err }))
        .finally(() => setShowSpinner(false));
  }
   
  function updateCryptoCurrencies(){
      getCryptoCurrenciesReference().then(value => {
          setCryptoCurrencyReferenceCollection(value);
          setCryptoReference(value);
      }).catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

  function deleteCryptoRef(id:number){
    deleteCryptoCurrencyReference(id).then((value)=>updateCryptoCurrencies())
                                    .catch(err=>setErrorModal({isOpen:true,msg:err}));
  }

    function updateFilter() {
        const cryptoCode = cryptoFindCode.current?.value as string;

        if (cryptoCode?.length > 0) {
            const cryptoFiltered: CryptoCurrencyReference[] = cryptoReference?.filter(x => {
                const valueUpper = x.code.toUpperCase();
                return valueUpper.includes(cryptoCode.toUpperCase());

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
                    <input type="text" className="row form-control" placeholder="Name" ref={inputName} />
                </div>
            </div>
            <div className="form-group row mt-2 ms-4">
                <div className="col-12">
                    <label className="row">Code</label>
                    <input type="text" className="row form-control" placeholder="Code" ref={inputCode} />
                </div>
            </div>
            <div className="form-group row mt-3 ms-1">
                <div className="ms-3 col-5">
                    <button className="btn btn-info row" onClick={() => checkIfCodeIsAvailable()}>Check Availability</button>
                </div>
                <div className="col-2">
                    {showSpinner && <div className="row"><Loading /></div>}
                    {isCryptoCodeAvailable == true && <span className="row bi bi-file-earmark-check" style={{ "fontSize": "35px" }} title="Available" />}
                    {isCryptoCodeAvailable == false && <span className="row bi bi-file-earmark-x" style={{ "fontSize": "35px" }} title="No Available" />}
                </div>
                <div className="col-4 ms-2">
                    <button className="col-2 btn btn-success"
                        style={{ "width": "100px", "height": "40px" }}
                        onClick={() => { saveCryptoReference(); }}>
                        Add
                    </button>
                </div>
            </div>
            <div className="form-group row mt-2 ms-4 mb-3">
                <div className="col-12">
                    <label className="row">Search code</label>
                    <input type="text" className="row form-control" placeholder="Insert code..." ref={cryptoFindCode} onChange={(e) => { updateFilter(); }} />
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
                                            <button className="btn btn-danger" onClick={() => { deleteCryptoRef(value.id) }} ><i className="bi bi-trash3"></i></button>
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