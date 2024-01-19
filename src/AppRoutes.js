import LoginForm from "./components/signin/signin";
import Register from "./pages/Register";
import Home from "./components/Home/Home";
import Portefeuille from "./components/Portefeuille/Portefeuille";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import Niveau from "./components/Niveau/Niveau";
import Confetti from "./components/Confetti/Confetti";
import WaitingRoom from "./components/WaitingRoom.js/WaitingRoom";
import TradingGame from './components/TradingGame/TradingGame';
import Historique from './components/Historique/Historique'
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
      path: '/Jouer',
      element: <Home />
  },
  {
    path: '/Competition',
    element: <TradingGame/>
  },
  {
    path: '/Historique',
    element: <Historique />
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
    path: '/welcome',
    element: <WelcomePage/>
  },

  {
    path: '/Star',
    element: <Niveau/>
  },
  {
    path: '/Confetti',
    element: <Confetti/>
  },
  {
    path: '/Waiting',
    element: <WaitingRoom/>
  },
];

export default AppRoutes;


