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
import io from 'socket.io-client';


const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = React.useState('top-gaining');
  const [variationEnPorcentage,setVariationEnPorcentage] = React.useState([]);

  React.useEffect(() => {
    const socket = io('http://127.0.0.1:5000/'); 

    socket.on('my_response', (data) => {
      setVariationEnPorcentage(data.variationEn)
      });
    

    
  }, []);


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
            <ListItem sx={{minWidth:120}}>APPL <span style={{color:variationEnPorcentage[1] <= 0? '#f72585': '#4CC9F0'}}> {variationEnPorcentage[1]}</span></ListItem>
            <ListItem sx={{minWidth:120}}>AMZN <span style={{color:variationEnPorcentage[3] <= 0? '#f72585': '#4CC9F0'}}>{variationEnPorcentage[3]}</span></ListItem>
            <ListItem sx={{minWidth:120}}>PYPL <span style={{color:variationEnPorcentage[9] <= 0? '#f72585': '#4CC9F0'}}>{variationEnPorcentage[9]}</span></ListItem>
          </List>
        )}
      </FormControl>
    </div>
  );
};

export default CustomSelect;
