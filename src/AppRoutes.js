import LoginForm from "./components/signin/signin";
import Register from "./pages/Register";
import Home from "./components/Home/Home";
import Portefeuille from "./components/Portefeuille/Portefeuille";
import ChatBot from "./components/ChatBot/ChatBot"
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
    path: '/ChatBot',
    element: <ChatBot />
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
  }

];

export default AppRoutes;


