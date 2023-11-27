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



//AppBar
const pages = ['Trade', 'Options', 'Portefeuille','Trading 101','Historique'];



export default function Layout({children,role,mode,handleModeChange}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
 
  const mobileMenuId = 'primary-search-account-menu-mobile';
 
 
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex',minHeight:"100vh" }}>
          

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? "#000000"
                : "#000000",
            flexGrow: 1,
            height: '100vh',
            overflow: 'hidden'
          }}
          >
            <Grid container sx={{ flexGrow: 1,height:'40px'}} >

      <AppBar position="static" sx={{height:'40px',background: `linear-gradient(135deg,#000000, #1e222d) `}}>
        <Toolbar sx={{height:'40px'}} >

        <Box href="/" sx={{display: 'inline-flex',height: 32,width: 32,mb:2}}>
                        <img src={logo} alt="Logo" sx={{width:'20px',height: 'auto'}}/>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' },mb:2,mr:5 }}
          >
            Trading Era
          </Typography>
          {pages.map((page) => (
                <MenuItem key={page} sx={{mb:2.5,'&:hover': {
                  borderRadius: '4px',height:25,background:'#000000'}}}>
                  <Typography variant="h9" textAlign="center" sx={{}}>{page}</Typography>
                </MenuItem>
              ))}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton  size="small" aria-label="show 4 new mails" color={theme.palette.secondary.light} sx={{mb:2.5}}>
                <AppsOutlinedIcon fontSize='small' />
            </IconButton>
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
          {children}
          <Paper sx={{background: `linear-gradient(135deg,#000000, #1e222d) `,mt:1,minHeight:"29px"}}>
        
      <CustomSelect> </CustomSelect>  </Paper>

        </Box>
        
        
      </Box>
      
    </ThemeProvider>
  );
}
