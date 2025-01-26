import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Sites from '../common/Sites'
import BarGraph from './BarGraph';
import StatCard from '../common/StatCard';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import PieGraph from './PieGraph';
import MapVisualization from './MapVisual';

function CountryBased() {
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
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/get-stats`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: localStorage.getItem('email') })
            });
            const result = await response.json();
            if (response.ok) {
                setMainData(result.data);
                console.log(result.data);

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
    
    const countryData = mainData.find(data => data.url === siteName)?.countrys || [];
    // Filter out countries with null or undefined names
    const filteredCountryData = countryData.filter(country => country.name);

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

            <MapVisualization 
            locations={
                mainData.find(data => data.url === siteName)?.stats?.daily[ mainData.find(data => data.url === siteName)?.stats?.daily.length - 1 ]?.day
            }
            />
            <br/>
            <br/>
			
			<PieGraph arr={filteredCountryData} dataKey="name" value="cnt" description="Country-wise traffic" radius={160}/>
			<br/>
			<br/>
            <BarGraph arr={filteredCountryData} dataKey="name" value="cnt" description="Country-wise traffic" />
        </div>
    );
}

export default CountryBased;
