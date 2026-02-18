"use client";
import { useEffect, useState } from "react";
import { StockCollection } from "./components/stock/stock-collection";
import { Summary } from "./components/summary/summary.component";
import ProtectedRoute from "./components/ProtectedRoute";
import { logout, getAccessToken } from "./services/auth.service";

enum TradingPage {
  Summary,
  Stock
}

interface NavPage {
  page: TradingPage;
  content: React.ReactNode;
}

export default function Home() {

  let mapPages = new Map<TradingPage, React.ReactNode>();

  const [currenPage, setCurrenPage] = useState<NavPage>({ page: TradingPage.Summary, content: <Summary /> });

  useEffect(() => {
    mapPages.set(TradingPage.Stock, <StockCollection />);
    mapPages.set(TradingPage.Summary, <Summary />);
  })

  return (
    <ProtectedRoute>
      <div className="container-fluid main-title">
        <div className="row">
          <div className="col-2 mt-3">
            <h1><b>\Trading Book/</b></h1>
          </div>
          <div className="col-1 mt-4 me-4">
            <button className="nav-item nav-link ms-2" onClick={() => { setCurrenPage({ page: TradingPage.Summary, content: mapPages.get(TradingPage.Summary) }) }}>
              {currenPage.page == TradingPage.Summary && <h2><i><b>Summary</b></i></h2>}
              {currenPage.page != TradingPage.Summary && <h3><i>Summary</i></h3>}
            </button>
          </div>
          <div className="col-1 mt-4">
            <button className="nav-item nav-link ms-2" onClick={() => { setCurrenPage({ page: TradingPage.Stock, content: mapPages.get(TradingPage.Stock) }) }}>
              {currenPage.page == TradingPage.Stock && <h2><i><b>Stocks</b></i></h2>}
              {currenPage.page != TradingPage.Stock && <h3><i>Stocks</i></h3>}
            </button>
          </div>
          <div className="col ms-auto mt-4 text-end">
            <button className="btn btn-outline-danger" onClick={() => logout()}>
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className='m-2 mt-3'>
        {currenPage.content}
      </div>
    </ProtectedRoute>
  )
}
