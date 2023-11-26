import LoginForm from "./components/signin/signin";
import Register from "./pages/Register";
import Home from "./components/Home/Home";
import Portefeuille from "./components/Portefeuille/Portefeuille";
import WelcomePage from "./components/WelcomePage/WelcomePage";

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

];

export default AppRoutes;


