import Home from "./components/Home";
import Auth from "./components/Auth";
import NotFound from "./components/Common/404";
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path:'/auth',
    element: <Auth/>
  },
  {
    path:'*',
    element: <NotFound/>
  }
];

export default AppRoutes;
