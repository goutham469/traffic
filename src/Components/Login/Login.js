import React, { useEffect, useState } from 'react';
import './Login.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Notification1 from '../Notification';

const Login = () => {
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null);

  async function onSuccess(response)
  {
    let data = response.credential
    let credential = jwtDecode(data)

    let res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/login`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        email : credential.email,
        img:credential.img
      })
    })
    res = await res.json()
    // alert(res.message)
    setNotification({ message: res.message , color: 'green' });
    
    // alert(credential.email)
    localStorage.setItem('email' , credential.email)
    navigate('/user')
  }

  useEffect(()=>{
    let user_email = localStorage.getItem('email')
    if(user_email)
    {
      navigate('/user')
    }
  },[])

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login/Signup</h2>
        
        <center>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
            <GoogleLogin onSuccess={onSuccess}/>
          </GoogleOAuthProvider>
        </center>
      </div>
      {notification && (
          <Notification1
              message={notification.message} 
              color={notification.color}
              onClose={() => setNotification(null)} 
          />
      )}
    </div>
  );
};

export default Login;
