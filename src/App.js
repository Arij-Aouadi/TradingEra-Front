import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';
import Layout from './components/Layout/Layout';
import LoginForm from './components/signin/signin';
import Register from './pages/Register';
import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import getDesignTokens from './getDesignTokens';
import { createTheme } from '@mui/material/styles';
import { AnimatePresence, motion } from "framer-motion";
import WelcomePage from './components/WelcomePage/WelcomePage';

const App = () => {
  const [mode, setMode] = useState('dark');
  
  const handleModeChange = (newMode) => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    window.localStorage.setItem('SupplyFlow_EY_mode', mode);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          if (route.index === true) {
            return <Route key={index} path="/" element={<LoginForm mode={mode} handleModeChange={handleModeChange} />} />;
          }
          if (route.path === '/register') {
            return <Route key={index} path="/register" element={<Register />} />;
          } else {
            var userRole = "employee";
            return <Route key={index} {...rest} element={<Layout role={userRole} mode={mode} handleModeChange={handleModeChange} children={element} />} />;
          }
        })}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
