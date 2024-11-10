import React from 'react';
import { FaEnvelope, FaLinkedin, FaGlobe } from 'react-icons/fa'; // Importing relevant icons
import './PersonalDetails.css'

function PersonalDetails() {
  // Replace the URLs below with your actual URLs
  const email = 'mailto:uppinurigouthamreddy@gmail.com';
  const linkedin = 'https://linkedin.com/in/gouthamreddy2005';
  const portfolio = 'https://goutham469.netlify.app';

  const handleLinkClick = (url) => {
    window.open(url, '_blank'); // Opens the link in a new window/tab
  };

  return (
    <div className="p-personal-details">
      <div className="p-detail" onClick={() => handleLinkClick(email)}>
        <FaEnvelope className="p-icon" />
        <span>Email</span>
      </div>
      <div className="p-detail" onClick={() => handleLinkClick(linkedin)}>
        <FaLinkedin className="p-icon" />
        <span>LinkedIn</span>
      </div>
      <div className="p-detail" onClick={() => handleLinkClick(portfolio)}>
        <FaGlobe className="p-icon" />
        <span>Portfolio</span>
      </div>
    </div>
  );
}

export default PersonalDetails;
