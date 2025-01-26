import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Overview from "./components/Overview";
import AddSite from "./components/AddSite";
import CountryBased from "./visuals/CountryBased";
import DeviceBased from "./visuals/DeviceBased";
import IpBased from "./visuals/IpBased";
import Settings from "./components/Settings";
import Help from "./components/Help";
import Plan from "./components/Plan";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import Views from "./visuals/Views";
import ExportData from "./visuals/ExportData";
import LogData from "./visuals/LogData";
import RefererGraph from "./visuals/RefererGraph";


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Login/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'dashboard',
      element: <Dashboard />,
      children:[
        {
          path:'',
          element:<Overview/>
        },
        {
          path:'views',
          element:<Views/>
        },
        {
          path:'add-site',
          element:<AddSite/>
        },
        {
          path:'country-based',
          element:<CountryBased/>
        },
        {
          path:'device-based',
          element:<DeviceBased/>
        },
        {
          path:'ip-based',
          element:<IpBased/>
        },
        {
          path:'settings',
          element:<Settings/>
        },
        {
          path:'help-and-support',
          element:<Help/>
        },
        {
          path:'plan',
          element:<Plan/>
        },
        {
          path:'export',
          element:<ExportData/>
        },
        {
          path:'log-data',
          element:<LogData/>
        },
        {
          path:'referer-data',
          element:<RefererGraph/>
        }
      ]
    },
    {
      path:'/*',
      element:<h1>404 Route not found.</h1>
    }
  ])

  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
