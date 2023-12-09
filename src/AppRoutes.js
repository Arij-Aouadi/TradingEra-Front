import LoginForm from "./components/signin/signin";
import Register from "./pages/Register";
import Home from "./components/Home/Home";
import Portefeuille from "./components/Portefeuille/Portefeuille";
import Quiz from "./components/Quiz/Quiz";
import ScorePage from './components/ScorePage/ScorePage';  // Assurez-vous d'ajuster le chemin d'importation
import Themes from './components/Themes/Themes'; // Importer le composant Themes
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FinancialTermDetail from './components/FinancialTermDetail/FinancialTermDetail';
import QuizSelector from "./components/QuizSelector/QuizSelector";
import React, { useState } from 'react';
import Analytics from "./components/Analytics/Analytics";




const AppRoutes = [
  {
    index: true,
    element: <LoginForm />
  },
  {
    path: '/Portefeuille',
    element: <Portefeuille />
  },
  {
      path: '/home',
      element: <Home />
  },
  {
    path: '/manageUsers',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/assignShipment',
    element: <Home/>
  },
  {
    path: '/stockes',
    element: <Home/>
  },
 
  {
    path: '/quiz/:quizId',
    element: <Quiz />
  },
  {
    path: '/score',
    element: <ScorePage />
  },
  {
    path: '/themes',
    element: <Themes />
  },
  {
    path: '/financial-term/:id',
    element: <FinancialTermDetail />
  },
  {
    path: '/quiz-selector',
    element: <QuizSelector />
  },
  {
    path: '/analytics',
    element: <Analytics />
  },


];

export default AppRoutes;


