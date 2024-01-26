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
import { FaMicrosoft,FaNVDA, FaAmazon, FaFacebook,FaTwitter,FaAndroid,FaInstagram,FaAirbnb,FaSnapchat, FaUber, FaPaypal,FaEtsy ,FaSquare} from 'react-icons/fa';
import { Grid, Typography } from '@mui/material';
import { SiTesla,SiNvidia,SiOracle } from "react-icons/si";
import io from 'socket.io-client';



function StockList({handleSymbol,handlePrices,Prices}) {
  const [stocks, setStocks] = useState([]);
  //const [simulatedPrices, setSimulatedPrices] = useState([]);
  const [variation,setVariation] = useState([]);
  const [variationEnPorcentage,setVariationEnPorcentage] = useState([]);


  useEffect(() => {
    axiosInstance
      .get('/action/showall')
      .then((res) => {
        setStocks(res.data);
        console.log(Prices)
      })
      .catch((err) => {
        // Gérer les erreurs de requête
      });
  }, []);


  useEffect(() => {
    const socket = io('http://127.0.0.1:5000/'); 

    socket.on('connect', () => {
      console.log('Connected to Flask server');
    });

    socket.on('my_response', (data) => {
      //setSimulatedPrices(data.data);
      setVariation(data.variation);
      setVariationEnPorcentage(data.variationEn)
      });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getIconForCompany = (companyName) => {
    if (companyName === 'google') {
      return <FaGoogle />;
    } else if (companyName === 'apple') {
      return <FaApple />;
    } else if (companyName === 'tesla') {
      return <SiTesla />;
    } else if (companyName === 'microsoft') {
      return <FaMicrosoft />;
    } else if (companyName === 'amazon') {
      return <FaAmazon />;
    } else if (companyName === 'Meta') {
      return <FaFacebook />;
    } else if (companyName === 'android') {
      return <FaAndroid />;
    } else if (companyName === 'twitter') {
      return <FaTwitter />;
    }
    else if (companyName === 'nvidia') {
      return <SiNvidia />;
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
    else if (companyName === 'oracle') {
      return <SiOracle />;
    }
    else if (companyName === 'square') {
      return <FaSquare />;
    } 
    else {
      return null;
    }

  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {stocks.map((stock, index) => (
      <ListItem key={stock.idA} onClick={(e)=>{handleSymbol(stock.symbole)}} >
        <ListItemAvatar>
          <Avatar sx={{":hover":{cursor: 'pointer'}}}>{getIconForCompany(stock.name)}</Avatar>
        </ListItemAvatar>
        <Grid container sx={{ width: '100%' }} >
          <Grid item xs={8}>
            <Typography sx={{ fontFamily: 'Orbitron', fontSize: '12px' }} >
              {stock.symbole}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontFamily: 'Orbitron', fontSize: '12px' }}>
              {/* Display the simulated price instead of the real price */}
              {Prices[index]}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            spacing={1}
            display="flex"
            justifyContent="flex-end"
          >
            <Typography
              sx={{
                fontFamily: 'Orbitron',
                fontSize: '10px',
                color:
                  variationEnPorcentage[index] <= 0
                    ? '#f72585'
                    : '#4CC9F0',
              }}
            >
              {variation[index]},
            </Typography>
            <Typography
              sx={{
                ml:1,
                fontFamily: 'Orbitron',
                fontSize: '10px',
                color:
                  variationEnPorcentage[index] <= 0
                    ? '#f72585'
                    : '#4CC9F0',
              }}
            >
              {variationEnPorcentage[index]} %
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    ))}
  </List>
  );
}

export default StockList;
