import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();

    async function getData() 
    {
      try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/get-stats`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: localStorage.getItem('email') })
          });
          const result = await response.json();
          if (response.ok) {
              let sites = []
              result.data.forEach( site => sites.push({name:site.url , id:site._id}) )
              localStorage.setItem("user-data" , JSON.stringify(result.userData) )
              localStorage.setItem("sites" , JSON.stringify(sites) )

          } else {
              toast.error("Problem at server!");
          }

      } catch (error) {
          console.error("Error fetching data:", error);
          toast.warning("Unable to fetch data.");
      }
    }

    useEffect(() => {
      if( !localStorage.getItem('email') ){
        toast.warning("Unauthorized access");
        navigate('/login')
      }
        getData();
    }, []);

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
        <Sidebar />
        <Outlet />  
    </div>
  )
}

export default Dashboard