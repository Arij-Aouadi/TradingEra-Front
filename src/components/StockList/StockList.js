import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { FaBuilding, FaApple, FaGoogle } from 'react-icons/fa';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { FaMicrosoft, FaAmazon, FaFacebook,FaTwitter,FaAndroid,FaInstagram,FaAirbnb,FaSnapchat, FaUber, FaPaypal,FaEtsy ,FaSquare} from 'react-icons/fa';



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
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {stocks.map((stock) => (
          <ListItem key={stock.idA}>
            <ListItemAvatar>
          <Avatar>
          {getIconForCompany(stock.name)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={stock.symbole} secondary={stock.coursActuel+" , "+ "+"+stock.variationEnPorcentage+"%" } />
          </ListItem>
        ))}
    </List>
  );
}

export default StockList;
