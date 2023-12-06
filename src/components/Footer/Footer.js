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
  <Paper elevation={15} style={{ 
      padding: '20px',
      maxWidth: '400px',
      maxHeight: '500px',
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      backgroundColor: '#fff',
      zIndex: 9999, 
      overflow:'scroll',scrollbarWidth: 'none',
      borderRadius: '20px', // Ajout de la bordure
      boxShadow: '0 0 12px rgba(0,0,0,.15)', // Ajout de la boîte d'ombre
      
    }}>
     <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', color: 'rgb(88, 65, 216)' }}>
      <div style={{ marginBottom: '20px', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FiMessageSquare style={{ fontSize: '30px', marginRight: '10px', color: 'blue', animation: 'bounce 1s infinite' }} />

          <div>
            <Typography variant="h5" style={{ fontWeight: 'bold', color: '#000' }}>TradingEra</Typography>
            <Typography variant="subtitle1" style={{ color: '#888', fontWeight: 'bold' }}>Live Chat</Typography>
          </div>
        </div>
        <IconButton onClick={onClose} size="small" style={{ color: '#000' }}>
          <CloseIcon />
        </IconButton>
      </div>
        
      <div style={{ marginBottom: '10px'}}>
  {messages.map((message, index) => (
    <div
      key={index}
      style={{
        marginBottom: '10px',
        backgroundColor: message.user === 'Vous' ? 'rgb(88, 65, 216)' : '#f4f6f8',
        color: message.user === 'Vous' ? 'rgb(255, 255, 255)' : '#000',
        padding: '20px',
        fontSize: '17px',
        borderRadius: '25px',
        fontWeight: message.user === 'Vous' ? 'bold' : 'normal',
      }}
    >
       {message.user !== 'Vous' && (
         <FaRobot style={{ fontSize: '20px', marginRight: '10px', color: 'orange', animation: 'spin 2s linear infinite' }} />
         )}
      <span>
        <strong>{message.user}:</strong> {message.text}
      </span>
    </div>
  ))}
</div>
        
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '100px', padding: '5px' }}>
        <TextField id="outlined-basic" variant="outlined" style={{ flex: 1 }}InputProps={{type: "text",value: question, onChange: (e) => setQuestion(e.target.value),style: {fontSize: '20px',padding: '8px', borderRadius: '40px',color: '#000', },placeholder: "Type your message...",}}/>
             <Button variant="contained"color="primary"onClick={addMessage} style={{ padding: '8px', borderRadius: '40px', color: '#fff' }}>
               Envoyer
             </Button>
            </div>
         </div>
    </Paper>
  );
};
  


const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = React.useState('top-gaining');
  const [showChatInterface, setShowChatInterface] = React.useState(false);


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
            {/* Ajoutez les éléments de la liste horizontale ici */}
            <ListItem sx={{minWidth:120}}>GOOGL <span style={{color:"#F72585"}}> 6.5%</span></ListItem>
            <ListItem sx={{minWidth:120}}>AAPL <span style={{color:"#F72585"}}>5.6%</span></ListItem>
            <ListItem sx={{minWidth:120}}>MSFT <span style={{color:"#F72585"}}>3.5%</span></ListItem>
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
