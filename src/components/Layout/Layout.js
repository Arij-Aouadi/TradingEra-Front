import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import '../signin/assets/css/style.css'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTheme } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import logo from './assets/logo.png'
import { Grid } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import CustomSelect from '../Footer/Footer'
import { Link } from 'react-router-dom';
import Niveau from '../Niveau/Niveau';
import Background3D from '../WaitingRoom.js/Background3D';
import { motion, Variants, Transition } from "framer-motion";
import TimerComponent from '../Day/Day';
import StopIcon from '@mui/icons-material/Stop';
import LogoutIcon from '@mui/icons-material/Logout';

function stringToBoolean(value) {
  if (typeof value === 'string') {
    const lowerCaseValue = value.toLowerCase();
    if (lowerCaseValue === 'true') {
      return true;
    } else if (lowerCaseValue === 'false') {
      return false;
    }
  }}




//AppBar
const pages = ['Jouer', 'Options', 'Portefeuille','Apprendre','Historique','Competition','News',];


export default function Layout({children,role,mode,handleModeChange}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [days,setDays]= React.useState(null);
  const [timePerDay,setTimePerDay] = React.useState(null);
  const [isTimerOn, setIsTimerOn] = React.useState(stringToBoolean(localStorage.getItem('GameOn')));

  
  const handleStartTimer = (data) => {
    setIsTimerOn(data);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
 
  const mobileMenuId = 'primary-search-account-menu-mobile'; 

  const handleLogoutClick = () => {
    setIsTimerOn(false)
    localStorage.setItem('GameOn','false')
    window.location.href = '/waiting';
  };
  
 
  return (
    <ThemeProvider theme={theme}>

      <Box sx={{ display: 'flex',height:"100vh",
    overflow:1,scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        width: '0',
      } }}>
          

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? "#000000"
                : "#000000",
            flexGrow: 1,
            height: '100%',
    overflow:1,scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        width: '0',
      }
          }}
          >

            <Grid container sx={{ flexGrow: 1,height:'40px'}} >

      <AppBar position="static" sx={{height:'40px',background: `linear-gradient(135deg,#000000, #1e222d) `}}>
        <Toolbar sx={{height:'40px'}} >
        <Link to="/waiting">
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' },mb:3,mr:5,fontFamily:'Orbitron',textShadow: "0px 0px 5px rgb(255,255,255)",color:"white"
          }}
          >
            TradingEra
          </Typography></Link>
          {pages.map((page) => (
                <MenuItem key={page} component={Link} to={`/${page}`} sx={{fontSize:'13px',textDecoration: 'none', color: 'inherit',mb:2.5,'&:hover': {
                  borderRadius: '4px',height:25,textShadow: "0px 0px 5px rgb(255,255,255)"
                  ,color:'white'}}}>
                  <Typography variant="h9" textAlign="center" sx={{fontFamily:'Orbitron'}}>{page}</Typography>
                </MenuItem>
              ))}

          <Box sx={{ flexGrow: 1 }} />

          <TimerComponent isTimerOn={isTimerOn} handleTimer={handleStartTimer}></TimerComponent>
          <Box sx={{mb:2.5,mr:1.2,fontFamily:'Orbitron',textShadow: "0px 0px 5px rgb(255,255,255)",color:"white",fontSize:'12px' }} >
            {'10.000'}{'   $'}</Box>
          <Box sx={{mb:2.5,mr:0.5 }}>
            <Niveau></Niveau>
            </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {isTimerOn ? (
  <IconButton  onClick={handleLogoutClick} size="small" aria-label="show 4 new mails" color={theme.palette.secondary.light} sx={{ mb: 2.5 }}>
    <LogoutIcon color='secondary' fontSize='small' />
  </IconButton>
) : null}

            <IconButton
              size="small"
              aria-label="show 17 new notifications"
              color={theme.palette.secondary.light}
              sx={{mb:2.5}}
            >
                <LightModeOutlinedIcon fontSize='small' />
              
            </IconButton>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color={theme.palette.secondary.light}
              sx={{mb:2.5}}
            >
              <PersonOutlineOutlinedIcon fontSize='small' />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{mb:2.5}}
            >
              <MoreIcon fontSize='small' />
            </IconButton>
          </Box>
                  </Toolbar>
      </AppBar>
            </Grid>
            
            
        <Background3D elements={children} onStartTimer={handleStartTimer} isTimerOn={isTimerOn}/>
        </Box>
        
        
      </Box>
      
    </ThemeProvider>

  );
}
