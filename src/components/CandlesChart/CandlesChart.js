import React from 'react'
import TradingViewWidget, { Themes } from "react-tradingview-widget";


const CandlesChart = () => {
  return (
    <div style={{height:"300px"}}>
        <TradingViewWidget
         symbol="NASDAQ:AAPL"
         theme={Themes.DARK}
         locale="fr"
         autosize
        />
      
    </div>
  )
}

export default CandlesChart
