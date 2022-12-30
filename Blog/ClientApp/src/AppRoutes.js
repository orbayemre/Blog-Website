import Home from "./components/Home";
import Auth from "./components/Auth";
import NotFound from "./components/Common/404";
import NewStory from "./components/NewStory";
import MyStories from "./components/MyStories";
import MyLikes from "./components/MyLikes";
import UpdateStory from "./components/UpdateStory";
import Stories from "./components/Stories";
import StoriesBy from "./components/StoriesBy";
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
    path:'/new',
    element: <NewStory/>
  },
  {
    path:'/update/:sId',
    element: <UpdateStory/>
  },
  {
    path:'/mystories',
    element: <MyStories/>
  },
  {
    path:'/mylikes',
    element: <MyLikes/>
  },
  {
    path:'/stories/:sId',
    element: <Stories/>
  },
  {
    path:'/storiesby/:uId',
    element: <StoriesBy/>
  },
  {
    path:'*',
    element: <NotFound/>
  }
];

export default AppRoutes;
