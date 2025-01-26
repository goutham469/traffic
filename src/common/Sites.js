import React, { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";

function Sites() { 
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const storedSites = JSON.parse(localStorage.getItem("sites")) || [];
    setSites(storedSites);
  }, []);

  const handleClick = (siteName) => {
    localStorage.setItem("current-site", siteName);
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Your Sites</h2>
      <ul className="flex flex-wrap gap-3 justify-start">
        {sites.length > 0 ? (
            sites.map((site) => (
            <li
                key={site.id}
                onClick={() => handleClick(site.name)}
                className="flex items-center gap-2 p-1 bg-gray-800 rounded-md shadow-md hover:bg-gray-700 transition cursor-pointer w-100%"
            >
                <FaGlobe className="text-blue-400" size={24} />
                <span className="text-white text-lg truncate">{site.name}</span>
            </li>
            ))
        ) : (
            <p className="text-gray-400">No sites found.</p>
        )}
        </ul>
    </div>
  );
}

export default Sites;
