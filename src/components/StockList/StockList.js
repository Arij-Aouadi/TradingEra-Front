import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { FaBuilding, FaApple, FaGoogle } from 'react-icons/fa';

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

  const getIconForCompany = (companyName) => {
    if (companyName === 'google') {
      return <FaGoogle />;
    } else if (companyName === 'apple') {
      return <FaApple />;
    } else if (companyName === 'COMP1') {
      return <FaBuilding />;
    } else {
      return null;
    }
  };

  return (
    <div>
      <h5>Liste de toutes les actions</h5>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.idA}>
            {getIconForCompany(stock.name)} {stock.symbole} - Cours : {stock.coursActuel} - Variation : {stock.variationEnPorcentage}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockList;
