import React, { useState } from 'react';
import './AddSite.css'
import { useNavigate } from 'react-router-dom';
import Notification1 from '../Notification';
import PersonalDetails from '../PersonalDetails/PersonalDetails';

function AddSite() {
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null);

  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [scriptTag , setScriptTag] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/add-new-site`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        email:localStorage.getItem('email'),
        url:url
      })
    })

    response = await response.json()

    console.log(response)
    setScriptTag(true)
    
    // alert(response.message)
    setNotification({ message: response.message , color: 'green' });
    // navigate('./')
  };

  return (
    <div className="add-site-container">
      <h3>Add New Site</h3>
      
      {
        !scriptTag && <form onSubmit={handleSubmit}>
                          <div className="input-group">
                            <label htmlFor="url">URL: {url}</label>
                            <input 
                              type="text"
                              id="url"
                              className='add-site-input'
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              placeholder="https://example.com"
                              required
                            />
                          </div>
                          <button type="submit" onClick={(event)=>handleSubmit(event)}>Add Site</button>
                        </form>
      }

      {
        scriptTag && <div>
          <b>From our side every thing was made, You need to add the &lt;script&gt; tag in your application.</b>
          <br/><br/>
          <p style={{fontSize:"12px"}}>paste this code snippet in the <b>index.html</b> of your application.</p>
          <hr/>
          <div style={{backgroundColor:"black",borderRadius:"5px",color:"white",padding:"5px"}}> 
              <label>{`<script src="https://traff.netlify.app/cdn-2.js"></script>`}</label>
          </div>
          <br/>

          <button onClick={()=>{
            navigator.clipboard.writeText(`<script src="https://traff.netlify.app/cdn-2.js"></script>`)
            setNotification({ message: "code copied to clipboard" , color: 'green' });
          }}>📄COPY Code</button>

          <ul style={{fontSize:"13px",textAlign:"left"}}>
            <li>If the application is a normal HTML site made by you/ <b>By Google sites</b>, you can add this .</li>
            <li>If the application is made using React.js / Next.js , even this works. Paste this in the <b>public/index.html</b> </li>
          </ul>
          <br/>
          <p>*If you need any guidance , please feel free to contact me.</p>
          <PersonalDetails/>
        </div>
      }

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

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

export default AddSite;
