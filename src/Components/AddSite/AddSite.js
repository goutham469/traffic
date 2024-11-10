import React, { useState } from 'react';
import './AddSite.css'
import { useNavigate } from 'react-router-dom';

function AddSite() {
  const navigate = useNavigate()

  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    
    alert(response.message)
    navigate('./')
  };

  return (
    <div className="add-site-container">
      <h3>Add New Site</h3>
      
      <form onSubmit={handleSubmit}>
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

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default AddSite;
