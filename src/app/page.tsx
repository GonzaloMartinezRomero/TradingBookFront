"use client";
import { useEffect, useState } from "react";
import { DepositCollection } from "./components/deposit/depositCollection";
import { StockCollection } from "./components/stock/stockCollection";
import { CryptoCollection } from "./components/crypto/cryptoCollection";

enum TradingPages{
  Deposit,
  Stock,
  Crypto
}

export default function Home() {

  let mapPages = new Map<TradingPages,  React.ReactNode>();

  const [content,setContent] = useState<React.ReactNode>(<DepositCollection/>);

  useEffect(()=>{

    mapPages.set(TradingPages.Deposit,<DepositCollection/>);
    mapPages.set(TradingPages.Stock,<StockCollection/>);
    mapPages.set(TradingPages.Crypto,<CryptoCollection/>);

  })

  return (   
    <>
       <div className="container-fluid" style={{"backgroundColor":"rgb(193, 197, 175)"}}>
            <div className="row">             
              <div className="col-6 mt-3">
                <h1><b>Trading Book</b></h1>
              </div>
            </div>
            <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse">
              <div className="navbar-nav">                
                <button className="nav-item nav-link" onClick={()=>{setContent(mapPages.get(TradingPages.Deposit))}}>
                  <h3>Deposits</h3>
                </button>
                <button className="nav-item nav-link ms-2" onClick={()=>{setContent(mapPages.get(TradingPages.Stock))}}>
                  <h3>Stocks</h3>
                </button>
                <button className="nav-item nav-link ms-2" onClick={()=>{setContent(mapPages.get(TradingPages.Crypto))}}>
                  <h3>Cryptos</h3>
                </button>
              </div>
            </div>
          </nav>
          </div>       
      <main className='m-2 mt-3'>
          {content}
      </main>
    </>
  )
}
