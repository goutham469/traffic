import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminSidebar from '../../components/AdminSidebar'

function AdminDashboard() {
  const navigate = useNavigate()

  async function getData() 
  {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/all-sites-names`,);
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
    if( !localStorage.getItem('adminEmail') ){
      toast.warning("Unaothorized access");
      navigate('/login')
    }
      getData();
  }, []);

    

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      <AdminSidebar/>
      <Outlet />
    </div>
  )
}

export default AdminDashboard;