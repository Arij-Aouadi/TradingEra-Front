import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SettingsIcon from '@mui/icons-material/Settings';
import Grid from '@mui/material/Grid';
import ChatIcon from '@mui/icons-material/Chat'; 
import { Button, IconButton, InputBase, Paper, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../axios';
import { FaPaperPlane } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import io from 'socket.io-client';
import axios from 'axios';





const ChatInterface = ({ onClose }) => {
  const [question, setQuestion] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const addMessage = async () => {
    try {
      const newMessages = [...messages, { user: 'Vous', text: question }];
      setMessages(newMessages);

      const response = await axiosInstance.get(`/admin/livechat/${encodeURIComponent(question)}`);
      
      const botMessage = { user: 'ChatBot', text: response.data };
      setMessages([...newMessages, botMessage]);

      setQuestion('');
    } catch (error) {
      console.error('Error asking AI:', error.message);
    }
  };
  
  return (
    <div>
<div style={{
  padding: '5px',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  position: 'fixed',
  bottom: '450px',
  right: '5px',
  borderRadius: '10px',
}}>
  <div style={{ flexDirection: 'column', position: 'relative', fontFamily: 'Orbitron', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
    <div style={{ marginBottom: '50px', paddingBottom: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '10px', backgroundColor: 'rgb(53, 55, 70)', height: "10vh", minWidth: '23.5vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, textAlign: 'center' }}>
        <FiMessageSquare style={{ fontSize: '30px',marginLeft:'30px' , color: '#f72585', animation: 'bounce 1s infinite', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} />
        <Typography variant="h5" style={{ fontWeight: 'bold', color: '#fff', fontFamily: 'Orbitron', fontSize: '20px' ,marginLeft:'40px'}}>TradingEra Live Chat</Typography>
        <IconButton onClick={onClose} size="small" style={{ color: '#fff' }}>
        <CloseIcon />
      </IconButton>
      </div>
    </div>
  </div>
</div>



   
  <Paper elevation={15} style={{ 
      padding: '20px',
      maxWidth: '400px',
      height: '480px',
      position: 'fixed', 
      bottom: '30px', 
      right: '10px', 
      paddin:'10px',
      backgroundColor: '#fff',
      zIndex: 9999, 
      borderRadius: '5px', // Ajout de la bordure
      boxShadow: '0 0 1200px rgba(0,0,0,.15)', // Ajout de la boîte d'ombre
      
    }}>
    
     
      <div style={{ marginBottom: '10px', width: '380px',
      height: '360px',overflowY:'auto',scrollbarWidth: 'none',
      '&::-webkit-scrollbar': { display: 'none' },}}>
  {messages.map((message, index) => (
    <div
      key={index}
      style={{
        marginBottom: '10px',
        backgroundColor: message.user === 'Vous' ? '#f72585' : '#f4f6f8',
        color: message.user === 'Vous' ? 'rgb(255, 255, 255)' : '#000',
        padding: '20px',
        fontSize: '17px',
        borderRadius: '25px',
        fontFamily:'Orbitron',
        fontWeight: message.user === 'Vous' ? 'bold' : 'normal',
      }}
    >
       {message.user !== 'Vous' && (
         <FaRobot style={{ fontSize: '30px', marginRight: '10px', color: '#7df2f0', animation: 'spin 2s linear infinite' }} />
         )}
      <span>
        <strong>{message.user}:</strong> {message.text}
      </span>
    </div>
  ))}
</div>
        
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '100px', padding: '5px' }}>
        <TextField id="outlined-basic" variant="outlined" style={{ flex: 1 }}InputProps={{type: "text",value: question, onChange: (e) => setQuestion(e.target.value),style: {fontSize: '15px',padding: '8px', borderRadius: '40px',color: '#000', fontFamily:'Orbitron'},placeholder: "Tapez votre message ici...",}}/>
             <Button variant="contained"color="primary"onClick={addMessage} style={{ padding: '8px', borderRadius: '40px', color: '#fff',fontFamily:'Orbitron' }}>
               Envoyer
             </Button>
            </div>
      
         </Paper> 
         </div>

  );
};
  

const CustomSelect = ({prices,findIndex,symbols_to_simulate}) => {
  const [selectedOption, setSelectedOption] = React.useState('top-gaining');
  const [showChatInterface, setShowChatInterface] = React.useState(false);
  const [variationEnPorcentage, setVariationEnPorcentage] = React.useState([]);
  const [initialPrices, setInitialPrices]= React.useState([]);
  const [topGaining, setTopGaining] = React.useState([]);


  React.useEffect(()=>{
    axios.get('http://127.0.0.1:5000/getInitialPrices').then((res) => {
      setInitialPrices(res.data.initial)
    })
    .catch((err) => {
      // Gérer les erreurs de requête
    });

  },[]);

  React.useEffect(() => {
    const calculateGains = () => {
      const gains = prices.map((currentPrice, index) => {
        const openingPrice = initialPrices[index];
        const gain = ((currentPrice - openingPrice) / openingPrice) * 100;
        return { symbol: symbols_to_simulate[index], gain };
      });

      // Sort the gains array based on the gain value in descending order
      gains.sort((a, b) => b.gain - a.gain);

      // Get the symbols of the top gaining stocks
      const topGainingSymbols = gains.slice(0, 5).map(stock => stock.symbol);

      setTopGaining(topGainingSymbols);
    };

    if (prices.length > 0 && initialPrices.length > 0) {
      calculateGains();
    }
  }, [prices, initialPrices]);

  React.useEffect(()=>{
    const socket = io('http://127.0.0.1:5000/'); 

    socket.on('my_response', (data) => {
      setVariationEnPorcentage(data.variationEn)
      });
    
  },[]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getIcon = (value) => {
    switch (value) {
      case 'top-losing':
        return <TrendingDownIcon />;
      case 'top-gaining':
        return <TrendingUpIcon />;
      case 'top-traded':
        return <TrendingFlatIcon />;
      case 'favorites':
        return <FavoriteIcon />;
      case 'new-listings':
        return <NewReleasesIcon />;
      case 'settings':
        return <SettingsIcon />;
      default:
        return null;
    }

  };
  const toggleChatInterface = () => {
    setShowChatInterface(!showChatInterface);
  };
  

  return (
    <div>
      <FormControl variant="standard" sx={{display: 'flex', flexDirection: 'row', alignItems: 'center',fontFamily:'Orbitron',fontSize:'12px' }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedOption}
          onChange={handleChange}
          renderValue={(value) => (
            <div>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>{getIcon(value)}</Grid>
                <Grid item>
                  <Typography sx={{fontFamily:'Orbitron',fontSize:'12px'}} fontWeight="bold">
                    {value === '' ? 'None' : value}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          )}
          IconComponent={() => null} // Supprime la flèche
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="top-losing">  {getIcon('top-losing')}Top Losing</MenuItem>
          
          <MenuItem value="top-gaining">{getIcon('top-gaining')}Top Gaining</MenuItem>
          <MenuItem value="top-traded">{getIcon('top-traded')}Top Traded</MenuItem>
          
          <MenuItem value="favorites">  {getIcon('favorites')}Favorites</MenuItem>
          <MenuItem value="new-listings"> {getIcon('new-listings')}New Listings</MenuItem>
          <MenuItem value="settings"> {getIcon('settings')}Settings</MenuItem>
        </Select>

        {selectedOption && (
         <List sx={{ display: 'flex', flexDirection: 'row', padding: 0, marginLeft: '16px' }}>
         {topGaining.map((symbol, index) => (
           <ListItem key={index} sx={{ minWidth: 125,display: 'flex',flexDirection: 'row', justifyContent: 'space-around'}}>
              <div>
             {symbol}</div>
             <div style={{ color: variationEnPorcentage[symbols_to_simulate.indexOf(symbol)] <= 0 ? '#f72585' : '#4CC9F0' }}>
               {variationEnPorcentage[symbols_to_simulate.indexOf(symbol)]} {'%'}
             </div>
           </ListItem>
         ))}
       </List>
       
        )}
      
      <Button variant="outlined" size="medium" style={{ marginLeft: 'auto' }} onClick={toggleChatInterface}>
      <FiMessageSquare style={{ fontSize: '20px', marginRight: '10px', color: '#f72585', animation: 'bounce 1s infinite' }} />
        Discuter avec nous      
        </Button>
      </FormControl>

      {showChatInterface && <ChatInterface />}
    </div>
  );
};


export default CustomSelect;
