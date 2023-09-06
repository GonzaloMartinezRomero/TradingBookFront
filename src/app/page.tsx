"use client";
import { useEffect, useState } from "react";
import { DepositCollection } from "./components/deposit/depositCollection";
import { StockCollection } from "./components/stock/stockCollection";
import { CryptoCollection } from "./components/crypto/cryptoCollection";

enum TradingPage{
  Deposit,
  Stock,
  Crypto
}

interface NavPage{
  page:TradingPage;
  content: React.ReactNode;
}

export default function Home() {

  let mapPages = new Map<TradingPage,  React.ReactNode>();

  const [currenPage,setCurrenPage] = useState<NavPage>({page:TradingPage.Deposit,content:<DepositCollection/>});
 
  useEffect(()=>{

    mapPages.set(TradingPage.Deposit,<DepositCollection/>);
    mapPages.set(TradingPage.Stock,<StockCollection/>);
    mapPages.set(TradingPage.Crypto,<CryptoCollection/>);

  })

  return (   
    <>
       <div className="container-fluid" style={{"backgroundColor":"rgb(193, 197, 175)"}}>
            <div className="row">             
              <div className="col-6 mt-3">
                <h1><b>Trading Book</b></h1>
              </div>
            </div>           
          </div>       
          <nav className="navbar navbar-expand-lg" style={{"backgroundColor":"rgb(213, 218, 193)"}}>
            <div className="collapse navbar-collapse">
              <div className="navbar-nav">                
                <button className="nav-item nav-link" onClick={()=>{setCurrenPage({page:TradingPage.Deposit,content:mapPages.get(TradingPage.Deposit)})}}>
                  {currenPage.page == TradingPage.Deposit && <h2><b>Deposits</b></h2>}
                  {currenPage.page != TradingPage.Deposit && <h3>Deposits</h3>}
                </button>
                <button className="nav-item nav-link ms-2" onClick={()=>{setCurrenPage({page:TradingPage.Stock,content:mapPages.get(TradingPage.Stock)})}}>
                  {currenPage.page == TradingPage.Stock && <h2><b>Stocks</b></h2>}
                  {currenPage.page != TradingPage.Stock && <h3>Stocks</h3>}
                </button>
                <button className="nav-item nav-link ms-2" onClick={()=>{setCurrenPage({page:TradingPage.Crypto,content:mapPages.get(TradingPage.Crypto)})}}>
                  {currenPage.page == TradingPage.Crypto && <h2><b>Crypto</b></h2>}
                  {currenPage.page != TradingPage.Crypto && <h3>Crypto</h3>}
                </button>
              </div>
            </div>
          </nav>
      <main className='m-2 mt-3'>
          {currenPage.content}
      </main>
    </>
  )
}
