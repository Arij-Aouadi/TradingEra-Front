import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { FaBuilding, FaApple, FaGoogle , FaMicrosoft, FaAmazon, FaFacebook,FaTwitter,FaAndroid,FaInstagram,FaAirbnb,FaSnapchat, FaUber, FaPaypal,FaEtsy ,FaSquare} from 'react-icons/fa';

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
    } else if (companyName === 'microsoft') {
      return <FaMicrosoft />;
    } else if (companyName === 'amazon') {
      return <FaAmazon />;
    } else if (companyName === 'facebook') {
      return <FaFacebook />;
    } else if (companyName === 'android') {
      return <FaAndroid />;
    } else if (companyName === 'twitter') {
      return <FaTwitter />;
    }
    
    else if (companyName === 'instagram') {
      return <FaInstagram />;
    } else if (companyName === 'Airbnb') {
      return <FaAirbnb />;
    } 
    else if (companyName === 'snapchat') {
      return <FaSnapchat />;
    }  else if (companyName === 'uber') {
      return <FaUber />;
    } else if (companyName === 'paypal') {
      return <FaPaypal />;
    }
    else if (companyName === 'eatsy') {
      return <FaEtsy />;
    }
    else if (companyName === 'square') {
      return <FaSquare />;
    } 
    else {
      return null;
    }
  };

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <table style={{ borderSpacing: '0 10px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px' }}></th>
            <th style={{ padding: '10px' }}>symbole</th>
            <th style={{ padding: '10px' }}>Cours Actuel</th>
            <th style={{ padding: '10px' }}>Variation en Pourcentage</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.idA}>
              <td style={{ padding: '10px' }}>{getIconForCompany(stock.name)}</td>
              <td style={{ padding: '10px' }}>{stock.symbole}</td>
              <td style={{ padding: '10px' }}>{stock.coursActuel}</td>
              <td style={{ padding: '10px' }}>{stock.variationEnPorcentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockList;