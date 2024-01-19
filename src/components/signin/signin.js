import React from 'react';
import './assets/css/font-awesome.min.css';
import './assets/css/style.css';
import backgroundImageNight from './assets/images/bg.jpg';
import backgroundImageDay from './assets/images/bgnv.jpg';
import Eynight from '../Layout/assets/logo.png';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axiosInstance from '../../axios';
import { Typography } from '@mui/material';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));



function LoginForm({mode,handleModeChange}) {

    const [message, setMessage] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const backgroundImage = mode === 'dark' ? backgroundImageNight : backgroundImageDay;
    const logo = Eynight;
    const theme = useTheme();


    const handleToggle = () => {
        handleModeChange(mode? 'light' : 'dark' );
        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
    
      if (!email || !password ) {
        setMessage('Please fill in all form fields.');
        setSuccess(false);
        return;
      }

    axiosInstance
        .post('/signin', {
                username: email,
                password: password,
            })
        .then((res) => {
                localStorage.setItem('access_token', res.data.token);
                localStorage.setItem('isAuthenticated', "true");
                localStorage.setItem('userId',res.data.id);
                localStorage.setItem('userRole',res.data.roles[0]);
                localStorage.setItem('GameOn',"false")
              
                axiosInstance.get('/NiveauUser',{
                    headers: {
                     Authorization : `Bearer ${localStorage.getItem('access_token')}`,
                    },
                 }).then(response=>localStorage.setItem('niveau',response.data)).catch(error=>console.log(error))                //localStorage.setItem('first_letter',res.data.email[0])
               
                 setSuccess(true)
                if(res.data.roles[0] == "CLIENT"){
                    axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                    window.location.href = '/welcome'; 
                }
                else{
                    axiosInstance.defaults.headers['Authorization'] =
                            'JWT ' + localStorage.getItem('access_token');
                            window.location.href = '/signup';
                }                        })
        .catch((error) => {
            if(error.response){
                        
                setMessage(error.response.data)

                    }
        });
    
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})` }} className="w3layouts-main">
            <div className="">
                <h1> </h1>
                <div className="header-main">

                    <div className="main-icon" >
                        <img src={logo} alt="logo" width="30%" height="30%" />

                    </div>
                    <Grid container sx={{mt: 2}}>

                            <Grid item xs={12} >
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                     <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2,backgroundColor: '#000000', ":hover":{boxShadow: "0px 0px 5px rgb(255,255,255)"} }}
                                    >
                                    submit
                                    </Button>
                                    {message && <Typography sx={{textAlign:'center' }} color={success ? 'secondary' : 'error'}>{message}</Typography>}

                                 <Grid container sx={{mt:5,textAlign: 'center',color: theme.palette.mode === 'dark' ? theme.palette.primary.dark: theme.palette.primary.contrastText }} >
                                    
                                    <Grid item xs={12}></Grid>
                                    
                                    <Grid item xs={12} sx={{color: theme.palette.text.primary}} container>
                                        <Grid item xs={9}>
                                            <h6 >
                                                {"Don't have an account?"} 
                                            </h6>
                                        </Grid>
                                        <Grid item xs={3} sx={{textDecoration:'underline',textDecorationColor:theme.palette.secondary.main,a:{color:theme.palette.secondary.main}}}>
                                            <Link to="/register" >
                                            <h6 > {"Sign Up"}</h6>  </Link>
                                        </Grid>
                                    </Grid>
                                    
                                    <Grid item xs={12} sx={{textDecoration: 'underline',color: theme.palette.text.primary}}>
                                        <h6 href="#" variant="h1"  >
                                            forgot password?
                                        </h6>
                                    </Grid>

                                </Grid>         
                                </Box>
                            </Grid>
                        </Grid>
                    
                    
                </div>
            </div>
            <div className="toggle-button">
                <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                    onChange={handleToggle} checked={mode === 'light'? false : true} />
            </div>
        </div>
    );
}

export default LoginForm;
