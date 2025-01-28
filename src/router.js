import { createBrowserRouter } from "react-router-dom";

import Views from "./visuals/Views";
import ExportData from "./visuals/ExportData";
import LogData from "./visuals/LogData";
import RefererGraph from "./visuals/RefererGraph";
import Admin from "./pages/Admin/Dashboard";
import AdminLogin from "./pages/Admin/Login";
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
import AdminOverview from "./adminComponents/AdminOverview";
import AdminViews from "./adminComponents/AdminViews";
import AdminCountryBased from "./adminComponents/AdminCountryBased";
import AdminDeviceBased from "./adminComponents/AdminDeviceBased";
import AdminIpBased from "./adminComponents/AdminIpBased";
import AdminRefererGraph from "./adminComponents/AdminReferrerBased";
import AdminExportData from "./adminComponents/AdminExportData";
import AdminLogData from "./adminComponents/AdminLogData";
import AllSites from "./pages/Admin/Sites";

export const router = createBrowserRouter([
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
      path:'admin-login',
      element:<AdminLogin />
    },
    {
      path:'admin-dashboard',
      element:<Admin/>,
      children:[
        {
          path:'',
          element:<AdminOverview/>
        },
        {
          path:'views',
          element:<AdminViews/>
        },
        {
          path:'add-site',
          element:<AddSite/>
        },
        {
          path:'country-based',
          element:<AdminCountryBased/>
        },
        {
          path:'device-based',
          element:<AdminDeviceBased/>
        },
        {
          path:'ip-based',
          element:<AdminIpBased/>
        },
        {
          path:'settings',
          element:<Settings/>
        },
        {
          path:'crm',
          element:<Help/>
        },
        {
          path:'plan',
          element:<Plan/>
        },
        {
          path:'export',
          element:<AdminExportData/>
        },
        {
          path:'log-data',
          element:<AdminLogData/>
        },
        {
          path:'referer-data',
          element:<AdminRefererGraph/>
        },
        {
          path:'sites',
          element:<AllSites/>
        }
      ]
    },
    {
      path:'*',
      element:<h1 className="text-red-500 text-center text-3xl">OOP'S , you have gone to invalid URL</h1>
    }
  ])