import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';

function Settings() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear all localStorage data
    localStorage.clear();
	window.location.reload()
    
    // Navigate to home ("" assumed to be the home page or login page)
    navigate("");
  };

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Settings' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <button 
          onClick={handleSignOut} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
        >
          Sign Out
        </button>
      </main>
    </div>
  );
}

export default Settings;
