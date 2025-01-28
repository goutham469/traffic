import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Sites from '../../common/Sites';
import Header from '../../common/Header';
import { calculateSize } from '../../utils/calculateSize';

function AllSites() {
    const [sites, setSites] = useState([]);

    async function getAllSites() {
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/sites/all-sites`);
        data = await data.json();
        console.log(data.data)
        setSites(data.data);
    }

    useEffect(() => {
        getAllSites();
    }, []);

    return (
        <div className='flex-1 overflow-auto relative z-10 bg-gray-950 text-white min-h-screen'>
            <Header title='Admin Dashboard - ALL Sites at a Glance' />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <Sites />
                <div className='overflow-x-auto mt-6'>
                    <table className='min-w-full border border-gray-800 text-white'>
                        <thead className='bg-blue-700'>
                            <tr>
                                <th className='px-4 py-2 border border-gray-800'>Site URL</th>
                                <th className='px-4 py-2 border border-gray-800'>Owner</th>
                                <th className='px-4 py-2 border border-gray-800'>Views</th>
                                <th className='px-4 py-2 border border-gray-800'>Plan</th>
                                <th className='p1 border border-gray-800'>Size on MongoDB<br/>(in bytes)</th>
                                <th className='px-4 py-2 border border-gray-800'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sites.map((site, idx) => <Site key={idx} site={site} />)}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

function Site({ site }) {
    async function upgradeSiteToPremium(e) {
        e.preventDefault();
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/sites/upgrade-to-premium`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: site.url })
        });

        data = await data.json();
        if (data.acknowledged) {
            toast.success("Upgrade successful");
        } else {
            toast.error("Failed to upgrade site");
        }
    }

    return (
        <tr className='bg-gray-900 border border-gray-800 text-center'>
            <td className='px-4 py-2 border border-gray-800 text-blue-400 cursor-pointer' onClick={() => window.open(site.url , "_blank")}>{site.url}</td>
            <td className='px-4 py-2 border border-gray-800 text-gray-400'>{site.email}</td>
            <td className='px-4 py-2 border border-gray-800 text-gray-400'>{site.views}</td>
            <td className='px-4 py-2 border border-gray-800'>
                {site.plan && site.plan === 'premium' ? (
                    <span className='text-green-400'>Premium</span>
                ) : (
                    <span className='text-yellow-400'>Normal</span>
                )}
            </td>
            <td className='px-4 py-2 border border-gray-800 text-gray-400'>{calculateSize(site)}</td>
            <td className='px-4 py-2 border border-gray-800'>
                {site.plan !== 'premium' && (
                    <button 
                        onClick={(e) => upgradeSiteToPremium(e)}
                        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-lg transition'
                    >
                        Upgrade!
                    </button>
                )}
            </td>
        </tr>
    );
}

export default AllSites;
