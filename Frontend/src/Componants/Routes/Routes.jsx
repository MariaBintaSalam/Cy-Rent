import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../../Pages/Home/Home";
import { Register } from "../../Pages/Register/Register";
import { LoginCard } from "../../Pages/Login/Login";
import AddCyble from "../../Pages/AddCycle/AddCyble";
import Profile from "../../Pages/Profile/Profile";
import Dashboard from "../../Pages/Profile/Dashboard";
import User from "../../Pages/User/User";
import NIDverify from "../../Pages/NIDVerify/NIDverify";
import RentCycle from "../../Pages/Rent/RentCycle";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
          path:'/add-cycle',
          element:<AddCyble/>
        },
        {
          path:'/profile',
          element:<Profile/>
        },
        {
          path:'/dashboard',
          element:<Dashboard/>
        }
        ,
        {
          path:'/user',
          element:<User/>
        }
        ,
        {
          path:'/nid-verify',
          element:<NIDverify/>
        },
        {
          path:'/rent-now',
          element:<RentCycle/>
        }
      ]
    },


    {
        path:'/login',
        element:<LoginCard/>
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
        path: '*',
        element: <div>404 Not Found</div>
    }

  ]);


export default router;
