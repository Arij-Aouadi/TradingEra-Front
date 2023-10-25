// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('watchlist-chart-demo') && 'TradingView' in window) {
          new window.TradingView.widget({
            container_id: "watchlist-chart-demo",
            width: "100%",
            height: "100%",
            autosize: true,
            symbol: "NASDAQ:AAPL",
            interval: "D",
            timezone: "exchange",
            theme: "dark",
            style: "1",
            withdateranges: true,
            allow_symbol_change: true,
            save_image: false,
            watchlist: ["AAPL","IBM","TSLA","AMD","MSFT","GOOG"],
            locale: "fr"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container' style={{ height: "100%", width: "100%" }}>
      <div id='watchlist-chart-demo' style={{ height: "calc(100% - 32px)", width: "100%" }} />
      <div className="tradingview-widget-copyright">
        <a href="https://fr.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Suivre tous les marchés sur TradingView</span></a>
      </div>
    </div>
  );
}
