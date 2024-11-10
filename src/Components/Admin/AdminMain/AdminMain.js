import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import './AdminMain.css'
import Notification1 from '../../Notification'

function AdminMain() {
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null);

  const [logged,setLogged] = useState(localStorage.getItem('adminEmail')) 

  function onSuccess(response)
  {
    let credential = response.credential
    credential = jwtDecode(credential)
    if(credential.email == "uppinurigouthamreddy@gmail.com")
    {
      setLogged(true)
      localStorage.setItem('adminEmail' , credential.email)
      setNotification({ message: 'login success !', color: 'green' });
    }
    else
    {
      setNotification({ message: 'invalid email-id !', color: 'yellow' });
    }
  }

  return (
    <div>
        <h3>Admin Dashboard</h3>
        {
          logged ?
          <div>
            <header>
                <button onClick={()=>navigate('./all-users')}>all-users</button>
                <button onClick={()=>navigate('./all-sites')}>all-sites</button>
                <button onClick={()=>localStorage.clear()}>Log out</button>
            </header>
            <div>
                <Outlet/>
            </div>
          </div>
          :
          <center>
            <div className='admin-login'>
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
                <b>Traffic Monitor</b>
                <p>Login to use the Service.</p>
                <center>
                  <GoogleLogin onSuccess={onSuccess}/>
                </center>
                <p style={{fontSize:"14px",color:"red"}}>*you should be logged-in with admin e-mail only*</p>
              </GoogleOAuthProvider>
            </div>
          </center>
        }
        {
          notification && (
            <Notification1
                message={notification.message} 
                color={notification.color}
                onClose={() => setNotification(null)} 
            />
                          )
        }
    </div>
  )
}

export default AdminMain