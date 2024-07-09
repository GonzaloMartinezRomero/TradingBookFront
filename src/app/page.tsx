"use client";
import { useEffect, useState } from "react";
import { CryptoCollection } from "./components/crypto/cryptoCollection";
import { StockCollection } from "./components/stock/stock-collection";

enum TradingPage{  
  Stock,
  Crypto
}

interface NavPage{
  page:TradingPage;
  content: React.ReactNode;
}

export default function Home() {

  let mapPages = new Map<TradingPage,  React.ReactNode>();

    const [currenPage, setCurrenPage] = useState<NavPage>({ page: TradingPage.Stock, content: <StockCollection />});
 
  useEffect(()=>{
    mapPages.set(TradingPage.Stock,<StockCollection/>);
    mapPages.set(TradingPage.Crypto,<CryptoCollection/>);
  })

  return (   
    <>
       <div className="container-fluid main-title">
            <div className="row">             
              <div className="col-2 mt-3">
                <h1><b>\Trading Book/</b></h1>                
              </div>
              <div className="col-1 mt-4">
                <button className="nav-item nav-link ms-2" onClick={()=>{setCurrenPage({page:TradingPage.Stock,content:mapPages.get(TradingPage.Stock)})}}>
                  {currenPage.page == TradingPage.Stock && <h2><i><b>Stocks</b></i></h2>}
                  {currenPage.page != TradingPage.Stock && <h3><i>Stocks</i></h3>}
                </button>
                </div>
                <div className="col-1 mt-4">
                <button className="nav-item nav-link ms-2" onClick={()=>{setCurrenPage({page:TradingPage.Crypto,content:mapPages.get(TradingPage.Crypto)})}}>
                  {currenPage.page == TradingPage.Crypto && <h2><i><b>Crypto</b></i></h2>}
                  {currenPage.page != TradingPage.Crypto && <h3><i>Crypto</i></h3>}
                </button>           
              </div>
            </div>           
          </div>       
      <div className='m-2 mt-3'>
          {currenPage.content}
      </div>
    </>
  )
}
