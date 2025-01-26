import React, { useEffect, useState } from 'react';
import Header from '../common/Header';

function Plan() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("user-data"));
    setUserDetails(data);
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="My Plan" />

      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8 bg-gray-900 text-white rounded-lg shadow-md">
        {userDetails && userDetails.plan === "premium" ? (
          <UserPlan userDetails={userDetails} />
        ) : (
          <UpgradePlan />
        )}
      </main>
    </div>
  );
}

function UpgradePlan() {
  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-semibold text-red-400">No Paid Plan Yet</h1>
      <p className="text-gray-300 mt-2">
        Upgrade to <span className="font-bold text-green-400">Premium</span> and access all features of the application.
      </p>

      <div className='flex justify-around'>
        <div className='bg-slate-800 text-left m-3 p-4 rounded-lg'>
          <h2 className="text-lg font-semibold mt-6">🌟 Benefits of Pro Plan</h2>
          <ul className="mt-2 space-y-2 text-gray-400 text-lg">
            <li>✅ Customer Support</li>
            <li>✅ Up to <b>100 Sites</b>!</li>
            <li>✅ Access to <b>Logs Data</b></li>
            <li>✅ Access to <b>Maps Data</b></li>
          </ul>
        </div>
      </div>

      <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold">
        🚀 Get Pro Plan Today
      </button>
    </div>
  );
}

function UserPlan({ userDetails }) {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-green-400">✨ Premium Plan</h1>
      <p className="mt-2"><b>Email:</b> {userDetails.email}</p>
      <p className="mt-1"><b>API Key:</b> <span className="text-yellow-400">{userDetails.APIKEY}</span></p>
      <p className="mt-1"><b>Plan Type:</b> {userDetails.plan}</p>
      <p className="mt-1"><b>Purchased On:</b> {userDetails.purchasedOn}</p>
      <p className="mt-1"><b>Credits Remaining:</b> <span className="text-blue-400">{userDetails.credits}</span></p>
    </div>
  );
}

export default Plan;
