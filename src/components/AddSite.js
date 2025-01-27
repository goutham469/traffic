import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Sites from '../common/Sites'
import { useNavigate } from 'react-router-dom'
import { FaCopy, FaCheckCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";


function AddSite() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
			<Header title='Add new Site' />
			<main>
				 <Sites />
				 <NewSite />
         <Update />
			</main>
		</div>
  )
}



function NewSite() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [url, setUrl] = useState("");
  const [scriptTag, setScriptTag] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
	toast.warning("Your request is being processed.")

    let response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/add-new-site`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        url: url
      })
    });

    response = await response.json();
    console.log(response);
    setScriptTag(true);

    setNotification({ message: response.message, color: "green" });
	toast.success("Your site was added successfully.") 
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg text-white">
      <h3 className="text-2xl font-bold text-center mb-4">Add New Site</h3>

      {!scriptTag ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-300">
              Website URL:
            </label>
            <input
              type="text"
              id="url"
              className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Add Site
          </button>
        </form>
      ) : (
        <div className="mt-6 text-center">
          <p className="text-green-400 text-lg font-semibold flex items-center justify-center gap-2">
            <FaCheckCircle className="text-green-500" /> Site Added Successfully!
          </p>
          <p className="text-sm text-gray-400 mt-2">Paste this script tag in your app:</p>

          <div className="mt-3 p-3 bg-gray-900 rounded-lg text-left text-sm overflow-auto">
            <code className="text-green-400">
              {`<script src="https://traff.netlify.app/cdn.js"></script>`}
            </code>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(`<script src="https://traff.netlify.app/cdn.js"></script>`);
              setNotification({ message: "Code copied to clipboard", color: "green" });
            }}
            className="mt-4 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            <FaCopy /> Copy Code
          </button>

          <ul className="mt-4 text-sm text-gray-300 text-left space-y-2">
            <li>📌 If your site is a simple HTML page or <b>Google Sites</b>, add this directly.</li>
            <li>📌 For React.js / Next.js, place this in <b>public/index.html</b>.</li>
          </ul>

          <p className="mt-4 text-gray-400 text-sm">*Need help? Feel free to contact us.</p>
        </div>
      )}

      {notification && (
        <p className={`mt-4 text-center text-sm text-${notification.color}-400`}>{notification.message}</p>
      )}
    </div>
  );
}



function Update() {
  const [sites, setSites] = useState([]);
  const [randomString, setRandomString] = useState("");
  const [urlToDelete, setUrlToDelete] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [inputString, setInputString] = useState("");
  
  useEffect(() => {
    const storedSites = JSON.parse(localStorage.getItem("sites")) || [];
    setSites(storedSites);
  }, []);

  async function deleteSite(url) {
    let response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/sites/delete-site`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url })
    });

    if (response.ok) {
      response = await response.json();
      console.log(response);
      toast.success(response.acknowledges);
      // Remove the site from the state after successful deletion
      setSites(sites.filter(site => site.name !== url));
    } else {
      toast.error("Deletion failed");
    }
  }

  function initiateSiteDelete(e, siteUrl) {
    e.preventDefault();
    const randStr = generateRandomString(10); // Generate random string
    setRandomString(randStr);
    setUrlToDelete(siteUrl);

    // Open a confirmation modal (can be a simple pop-up for now)
    const userInputUrl = prompt("Enter the URL of the site to delete:");
    const userInputString = prompt(`Enter the verification code: ${randStr}`);

    if (userInputUrl === siteUrl && userInputString === randStr) {
      deleteSite(siteUrl);
    } else {
      toast.error("Verification failed. Deletion cancelled.");
    }
  }

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  return (
    <ul className='text-center m-5'>
      {
        sites.map(site => (
          <li
            key={site.id}
            className="flex items-center gap-2 p-1 bg-gray-800 rounded-md shadow-md hover:bg-gray-700 transition cursor-pointer w-full max-w-[300px] m-2"
          >
            <MdDelete
              onClick={(e) => initiateSiteDelete(e, site.name)}
              className="text-red-600 cursor-pointer"
            />
            <span className="text-white text-lg truncate">{site.name}</span>
          </li>
        ))
      }
    </ul>
  );
}


export default AddSite;