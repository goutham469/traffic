import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Sites from '../common/Sites'
import StatCard from '../common/StatCard';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import PieGraph from '../visuals/PieGraph';
import BarGraph from '../visuals/BarGraph';

function AdminCountryBased() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Country Based insights' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <Sites />
        <SiteMetrics />
      </main>
    </div>
  )
}

function SiteMetrics() {
    const siteName = localStorage.getItem("current-site");
    const [mainData, setMainData] = useState([]);
    const [nullCountriesCount, setNullCountriesCount] = useState(0);
    
    async function getData() {
        const toastId = toast.loading("Fetching data...");
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/sites/all-sites`);
            const result = await response.json();
            if (response.ok) {
                setMainData(result.data);

                // Count null or undefined country names
                const countryData = result.data.find(data => data.url === siteName)?.countrys || [];
                const nullCount = countryData.filter(country => !country.name).length;
                setNullCountriesCount(nullCount);

                toast.update(toastId, { render: "✅ Data loaded successfully!", type: "success", isLoading: false, autoClose: 3000 });
            } else {
                toast.update(toastId, { render: "⚠️ Problem at server!", type: "warning", isLoading: false, autoClose: 3000 });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.update(toastId, { render: "❌ Unable to fetch data.", type: "error", isLoading: false, autoClose: 3000 });
        }
    }
    
    useEffect(() => { getData(); }, []);
    
    const countryData = mainData?.find(data => data.url === siteName)?.countrys || [];
    // Filter out countries with null or undefined names
    const filteredCountryData = countryData?.filter(country => country.name);

    return (
        <div>
            <div className='flex justify-around flex-wrap bg-slate-900 rounded-lg m-3 p-3'>
                <motion.div
                    className='flex justify-around gap-3 mb-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Current Website" icon={FaEye} value={siteName} color="green" />
                    <StatCard name="Total views" icon={FaEye} value={mainData.find(data => data.url === siteName)?.views} color="green" />
                    <StatCard name="Last Day Viewed" icon={FaEye} value={mainData.find(data => data.url === siteName)?.stats?.daily[ mainData.find(data => data.url === siteName)?.stats?.daily.length - 1 ]?.day} color="green" />
                    <StatCard name="Null Country Count" icon={FaEye} value={nullCountriesCount} color="red" />
                </motion.div>
            </div>

            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold'>Country-wise traffic Distribution</h2>
            </div>

            {/* <MapVisualization 
            locations={
                mainData?.find(data => data.url === siteName)?.stats?.daily[ mainData.find(data => data.url === siteName)?.stats?.daily.length - 1 ]
            }
            /> */}

            <div className="overflow-x-auto p-6 flex justify-center">
                <table className="min-w-full bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg">
                    <thead>
                        <tr className="bg-gray-800 text-left">
                            <th className="p-2 text-lg font-semibold">Country</th>
                            <th className="p-2 text-lg font-semibold">Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCountryData.map((item, index) => (
                            <tr key={index} className="border-b border-gray-700 hover:bg-gray-800 transition">
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.cnt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br/><br/>
			
			<PieGraph arr={filteredCountryData} dataKey="name" value="cnt" description="Country-wise traffic" radius={160}/>
			<br/>
			<br/>
            <BarGraph arr={filteredCountryData} dataKey="name" value="cnt" description="Country-wise traffic" />
            

        </div>
    );
}

export default AdminCountryBased;
