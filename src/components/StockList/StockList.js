import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';

function StockList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/action/showall')
      .then((res) => {
        setStocks(res.data);
      })
      .catch((err) => {
        // Gérer les erreurs de requête
      });
  }, []);

  return (
    <div>
      <h1>Liste de toutes les actions</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.idA}>
            {stock.symbole} - Cours : {stock.coursActuel} - Variation : {stock.variationEnPorcentage}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockList;