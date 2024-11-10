import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './User.css'

function User() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  // Fetch user data from server
  async function getUserData() {
    try {
      let response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/get-stats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: localStorage.getItem('email') })
      });
      response = await response.json();
      // console.log(response);

      localStorage.setItem('userData' , JSON.stringify(response))
      setData(response);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

  // Redirect to login if no email in localStorage
  useEffect(() => {
    if (!localStorage.getItem('email')) {
      navigate('/login');
    } else {
      getUserData();
    }
  }, [navigate]);

  return (
    <div>
      <header className="header">
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <img onClick={()=>navigate('/')} src={`${process.env.REACT_APP_CLIENT_BASE_URL}/favicon.ico`}    style={{width:"150px",cursor:"pointer"}}/>

          <div className="personal-details">
            {data.userData?.plan === 'basic' ? (
              <p>Your plan is Basic. <span>Upgrade to <b>Premium</b> for more valuable insights.</span></p>
            ) : (
              <p>Your plan: <b>{data.userData?.plan || "Unknown"}</b></p>
            )}
            <p><b>{data.userData?.credits || 0} credits remaining.</b></p>


            <div>
              <button className='user-button' onClick={() => navigate('./Dashboard')}>Go to Dashboard</button>
              <button className='user-button' onClick={() => navigate('./settings')}>Settings</button>
              <button className='user-button' onClick={() => navigate('./add-site')}>Add site</button>
            </div>
          </div>

          <b><b>{data.userData?.email || "User"}</b></b>
        </div>
        
      </header>

      <main className="main-content">
        <Outlet />  
      </main>
    </div>
  );
}

export default User;
