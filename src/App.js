import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';
import Layout from './components/Layout/Layout';
import LoginForm from './components/signin/signin';
import Register from './pages/Register';
import  { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import getDesignTokens from './getDesignTokens'
import { createTheme } from '@mui/material/styles';


const App = () => {
  const [storageTheme,setStorageTheme] = useState('dark')
  const [mode, setMode] = useState('dark'); 

  const handleModeChange = (newMode) => {
    setMode((prevMode)=>(prevMode === 'light'? 'dark' : 'light'));
  };

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(()=>{
    window.localStorage.setItem('SupplyFlow_EY_mode',mode)
    setStorageTheme(mode)
  },[theme,storageTheme,mode]);

  

    var userRole="employee";
    return (
        <ThemeProvider theme={theme} >
        <Routes>
        
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            if (route.index === true) 
            {return <Route path="/" element={<LoginForm mode={mode} handleModeChange={handleModeChange} />} />  }
            if (route.path === '/register') 
            {return <Route path="/register" element={<Register />} />  }
            else 
            return <Route key={index} {...rest} element={<Layout role={userRole} mode={mode} handleModeChange={handleModeChange} children={element}></Layout>} />;
          })}
        </Routes>
        </ThemeProvider>
    );
  }


export default App ;