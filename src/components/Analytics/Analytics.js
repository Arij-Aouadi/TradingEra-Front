import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const ParentComponent = () => {
  const [priceData, setPriceData] = useState([]);
  const [rollingVolatilityData, setRollingVolatilityData] = useState([]);
  const [tradeCountData, setTradeCountData] = useState([]);
  const [tradingVolumesData, setTradingVolumesData] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const availableSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'PYPL', 'NVDA', 'TSLA', 'ORCL', 'SHEL'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'Y739DUIUGE2NT931';
        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selectedSymbol}&apikey=${apiKey}`;

        const response = await axios.get(apiUrl);

        const transformedPriceData = Object.entries(response.data['Time Series (Daily)']).map(([date, values]) => ({
          Date: date,
          Price: values['4. close'],
        }));

        setPriceData(transformedPriceData);

        const dailyPrices = Object.values(response.data['Time Series (Daily)']);
        const rollingVolatility = calculateRollingVolatility(dailyPrices, 10);
        setRollingVolatilityData(rollingVolatility);

        const transformedTradeCountData = Object.entries(response.data['Time Series (Daily)']).map(([date, values]) => ({
          Date: date,
          TradeCount: values['4. close'],
        }));

        setTradeCountData(transformedTradeCountData);

        const transformedTradingVolumesData = Object.entries(response.data['Time Series (Daily)']).map(([date, values]) => ({
          Date: date,
          TradingVolumes: values['5. volume'],
        }));

        setTradingVolumesData(transformedTradingVolumesData);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };

    fetchData();
  }, [selectedSymbol]);
  // ...
  

  const calculateRollingVolatility = (prices, windowSize) => {
    const returns = calculateReturns(prices);
    const rollingVolatility = [];

    for (let i = 0; i < returns.length - windowSize + 1; i++) {
      const slice = returns.slice(i, i + windowSize);
      const volatility = calculateVolatility(slice);
      rollingVolatility.push(volatility);
    }

    return rollingVolatility;
  };

  const calculateReturns = (prices) => {
    const returns = [];

    for (let i = 1; i < prices.length; i++) {
      const prevPrice = parseFloat(prices[i - 1]['4. close']);
      const currentPrice = parseFloat(prices[i]['4. close']);
      const dailyReturn = (currentPrice - prevPrice) / prevPrice;
      returns.push(dailyReturn);
    }

    return returns;
  };

  const calculateVolatility = (returns) => {
    const n = returns.length;
    const mean = returns.reduce((sum, value) => sum + value, 0) / n;
    const squaredDifferences = returns.map((value) => Math.pow(value - mean, 2));
    const variance = squaredDifferences.reduce((sum, value) => sum + value, 0) / n;
    const volatility = Math.sqrt(variance);

    return volatility;
  };

  const hasRequiredColumnsPriceChart = priceData.length > 0 && 'Date' in priceData[0] && 'Price' in priceData[0];
  const hasRequiredColumnsRollingVolatilityChart = rollingVolatilityData.length > 0;
  const hasRequiredColumnsTradeCountChart = tradeCountData.length > 0 && 'Date' in tradeCountData[0] && 'TradeCount' in tradeCountData[0];
  const hasRequiredColumnsTradingVolumesChart = tradingVolumesData.length > 0 && 'Date' in tradingVolumesData[0] && 'TradingVolumes' in tradingVolumesData[0];

  const plotlyDarkTheme = {
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: 'white',
    },
    xaxis: {
      title: {
        font: {
          color: 'white',
        },
      },
      showline: false,
      showgrid: false,
      showticklabels: true,
      ticks: 'outside',
      tickcolor: 'white',
    },
    yaxis: {
      title: {
        font: {
          color: 'white',
        },
      },
      showline: false,
      showgrid: false,
      showticklabels: true,
      ticks: 'outside',
      tickcolor: 'white',
    },
  };

  return (
    <div style={{fontSize: '12px',fontFamily: 'Orbitron, sans-serif',display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', marginLeft: '10px', marginRight: '10px', marginTop: '0.05px', color: '#4CC9F0' }}>
<label htmlFor="symbolSelect" style={{ fontSize: '14px', fontFamily: 'Orbitron, sans-serif', color: 'black' }}>
  Sélectionner une entreprise :
</label>


  <select id="symbolSelect" value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)} style={{fontSize: '16px',fontFamily: 'Orbitron, sans-serif', background: 'linear-gradient(135deg, #000000, #1e222d)', color: '#4CC9F0' }}>
  {availableSymbols.map((symbol) => (
    <option key={symbol} value={symbol}>
      {symbol}
    </option>
  ))}
</select>


  <div style={{ display: 'flex', justifyContent: 'space-between', width: '800px' }}>
        <div style={{ flex: 1, marginLeft: '-140px' }}>
          {hasRequiredColumnsPriceChart && (
            <div>
              <Plot
                data={[
                  {
                    x: priceData.map((entry) => entry.Date),
                    y: priceData.map((entry) => entry.Price),
                    type: 'scatter',
                    mode: 'lines+markers',
                    line: { color: '#F72585' },
                  },
                ]}
                layout={{
                  ...plotlyDarkTheme,
                  ...{
                    width: 600,
                    height: 300,
                    title: 'Price Over Time',
                  },
                }}
              />
            </div>
          )}
        </div>

        <div style={{ flex: 1, marginLeft: '-60px' }}>
          {hasRequiredColumnsRollingVolatilityChart && (
            <div>
              <Plot
                data={[
                  {
                    x: rollingVolatilityData.map((entry, index) => index),
                    y: rollingVolatilityData,
                    type: 'scatter',
                    mode: 'lines+markers',
                    line: { color: '#4CC9F0' },
                  },
                ]}
                layout={{
                  ...plotlyDarkTheme,
                  ...{
                    width: 600,
                    height: 300,
                    title: 'Rolling Volatility Over Time',
                    xaxis: { title: 'Time', showgrid: false },
                    yaxis: { title: 'Volatility', showgrid: false },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '800px' }}>
        <div style={{ flex: 1, marginLeft: '-140px' }}>
          {hasRequiredColumnsTradeCountChart && (
            <div>
              <Plot
                data={[
                  {
                    x: tradeCountData.map((entry) => entry.Date),
                    y: tradeCountData.map((entry) => entry.TradeCount),
                    type: 'scatter',
                    mode: 'lines+markers',
                    line: { color: '#4CC9F0' },
                  },
                ]}
                layout={{
                  ...plotlyDarkTheme,
                  ...{
                    width: 600,
                    height: 300,
                    title: 'Trade Count Over Time',
                  },
                }}
              />
            </div>
          )}
        </div>

        <div style={{ flex: 1, marginLeft: '-60px' }}>
          {hasRequiredColumnsTradingVolumesChart && (
            <div>
              <Plot
                data={[
                  {
                    x: tradingVolumesData.map((entry) => entry.Date),
                    y: tradingVolumesData.map((entry) => entry.TradingVolumes),
                    type: 'bar',
                    marker: { color: '#F72585' },
                  },
                ]}
                layout={{
                  ...plotlyDarkTheme,
                  ...{
                    width: 600,
                    height: 300,
                    title: 'Trading Volumes Over Time',
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentComponent;
