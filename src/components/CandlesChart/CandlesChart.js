// TradingViewWidget.jsx
import React, { useEffect, useRef } from 'react';
import './css/Style.css'

let tvScriptLoadingPromise;

export default function TradingViewWidget({chartSymbol}) {
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
        if (document.getElementById('tradingview_a361e') && 'TradingView' in window) {
          new window.TradingView.widget({

      
            autosize: true ,
            height: "auto",
            custom_css_url: 'css/Style.css',
            symbol: `${chartSymbol}`,
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "fr",
            enable_publishing: false,
            range: "YTD",
            hide_side_toolbar: false,
            allow_symbol_change: true,
            container_id: "tradingview_a361e",
            timeframe: { from: 1640995200, to: 1643673600 } ,
            "volumes": {
              "upColor": "#4CC9F0",
              "downColor": "#F72585", },
            overrides: {
              "mainSeriesProperties.barStyle.upColor": "#4CC9F0", // Green color for bullish candles
              "mainSeriesProperties.baselineStyle.topLineColor ": "#4CC9F0", // Green color for bullish candles
              "mainSeriesProperties.baselineStyle.topLineColor": "#4CC9F0", // Green color for bullish candles
              "mainSeriesProperties.candleStyle.borderUpColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.candleStyle.upColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.candleStyle.wickUpColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.haStyle.borderUpColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.haStyle.upColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.haStyle.wickUpColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.hlcAreaStyle.highLineColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.hollowCandleStyle.borderUpColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.hollowCandleStyle.upColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.hollowCandleStyle.wickUpColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.kagiStyle.upColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.pbStyle.borderUpColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.pbStyle.upColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.pnfStyle.upColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.renkoStyle.borderUpColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.renkoStyle.upColor": "#4CC9F0", // Red color for bearish candles
              "mainSeriesProperties.renkoStyle.wickUpColor": "#4CC9F0", // Red color for bearish candles
              
              "mainSeriesProperties.barStyle.downColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.baselineStyle.bottomLineColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.candleStyle.borderDownColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.candleStyle.downColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.candleStyle.wickDownColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.haStyle.borderDownColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.haStyle.downColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.haStyle.wickDownColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.hlcAreaStyle.lowLineColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.hollowCandleStyle.borderDownColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.hollowCandleStyle.downColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.hollowCandleStyle.wickDownColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.kagiStyle.downColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.pbStyle.borderDownColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.pbStyle.downColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.pnfStyle.downColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.renkoStyle.borderDownColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.renkoStyle.downColor": "#F72585", // Red color for bearish candles
              "mainSeriesProperties.renkoStyle.wickDownColor": "#F72585", // Red color for bearish candles
            }
          });
        }
      }
    },
    [chartSymbol]
  );

  return (
    <div className='tradingview-widget-container'>
      <div id='tradingview_a361e' />
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
}
