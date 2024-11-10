import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import Landing from './Components/Landing/Landing';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Login/Login';
import User from './Components/User/User';
import AddSite from './Components/AddSite/AddSite';
import Settings from './Components/Settings/Settings';
import AdminMain from './Components/Admin/AdminMain/AdminMain';
import AllUsers from './Components/Admin/AllUsers/AllUsers';
import AllSites from './Components/Admin/AllSites/AllSites';

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Landing/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/user',
      element:<User/>,
      children:[
        {
          path:'Dashboard',
          element:<Dashboard/>
        },
        {
          path:'add-site',
          element:<AddSite/>
        },
        {
          path:'settings',
          element:<Settings/>
        }
      ]
    },
    {
      path:'/admin',
      element:<AdminMain/>,
      children:[
        {
          path:'all-users',
          element:<AllUsers/>
        },
        {
          path:'all-sites',
          element:<AllSites/>
        }
      ]
    }
  ])

  return (
    <div className="App">
      {/* <a href='http://192.168.1.102:3000' target='_blank'>click here</a>
      <Dashboard siteUrl="localhost"/> */}
      {/* <Landing/> */}
      {/* <Login/> */}
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
