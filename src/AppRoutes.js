import LoginForm from "./components/signin/signin";
import Register from "./pages/Register";
import Home from "./components/Home/Home";

const AppRoutes = [
  {
    index: true,
    element: <LoginForm />
  },
  {
    path: '/makeRequest',
    element: <Home />
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


