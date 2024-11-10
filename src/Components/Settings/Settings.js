import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notification1 from '../Notification';

function Settings() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const [notification, setNotification] = useState(null);

  function logout() {
    localStorage.clear();
    navigate('/');
  }

  async function deleteSite(url) {
    let site_url = prompt("re enter site name : ")
    if(site_url != url)
    {
      setNotification({ message: "deletion failed" , color: 'yellow' });
      // alert("deletion failed")
    }
    else
    {
      try {
        let result = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/delete-site`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: localStorage.getItem('email'),
            url: url,
          }),
        });
  
        result = await result.json();
        // alert("Site deleted!");
        setNotification({ message: "Site deleted!" , color: 'green' });
        navigate('/');
      } catch (error) {
        console.error("Error deleting site:", error);
        // alert("Failed to delete site.");
        setNotification({ message: " Failed to delete site. " , color: 'yellow' });
      }
    }
  }

  useEffect(() => {
    const ls = localStorage.getItem('userData');
    if (ls) {
      setUserData(JSON.parse(ls));
    }
  }, []);

  return (
    <div>
      <h3>Settings</h3>
      <button onClick={logout}>Log out</button>

      <div>
        <p>Email: {userData.userData&&userData.userData.email}</p>
        <p>Plan: <b>{userData.userData&&userData.userData.plan}</b></p>
        <p>Remaining credits to upload sites: {userData.userData&&userData.userData.credits}</p>
      </div>

      {
        userData.data&&userData.data.length > 0 && 
        <div>
          <b style={{ color: "red" }}>Delete sites</b>
          <div>
            {userData.data?.map((site, idx) => (
              <span>
                  <button key={idx} onClick={() => deleteSite(site.url)}>{site.url}</button>
                  <br/>
              </span>
            ))}
          </div>
        </div>
      }

      {notification && (
          <Notification1
              message={notification.message} 
              color={notification.color}
              onClose={() => setNotification(null)} 
          />
      )}
    </div>
  );
}

export default Settings;
