import Home from "./components/Home";
import Auth from "./components/Auth";
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path:'/auth',
    element: <Auth/>
  }
];

export default AppRoutes;
