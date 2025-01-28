import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Sites from '../common/Sites';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import StatCard from '../common/StatCard';
import { FaEye } from 'react-icons/fa';
import LineGraph from '../visuals/LineGraph';
import BarGraph from '../visuals/BarGraph';


function AdminViews() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Views' />
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
            <Sites/>
            <SiteMetrics />
        </main>
    </div>
  );
}

function SiteMetrics() {
    const siteName = localStorage.getItem("current-site");
    const [mainData, setMainData] = useState([]);
    const [filterDays, setFilterDays] = useState(90);
    
    async function getData() {
        const toastId = toast.loading("Fetching data...");
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/sites/all-sites`);
            const result = await response.json();
            if (response.ok) {
                setMainData(result.data);
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

    const filterDataByDays = (data, days) => {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        return data?.filter(entry => new Date(entry.day) >= cutoffDate);
    };

    const dayWiseData = filterDataByDays(mainData.find(data => data?.url === siteName)?.stats?.daily || [], filterDays);
    
    return (
        <div>
            <div className='flex justify-around flex-wrap bg-slate-900 rounded-lg m-3 p-3'>
            <motion.div
					className='flex justify-around  gap-3 mb-4'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
                    <StatCard name="Current Website" icon={FaEye} value={siteName} color="green" />
                    <StatCard name="Total views" icon={FaEye} value={mainData.find(data => data?.url === siteName)?.views} color="green" />
                    <StatCard name="Last Day Viewed" icon={FaEye} value={mainData.find(data => data?.url === siteName)?.stats?.daily[ mainData.find(data => data?.url === siteName)?.stats?.daily.length - 1  ]?.day} color="green" />
            </motion.div>
            </div>

            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold'>Day-wise Views</h2>
                <select className='bg-gray-800 text-white p-2 rounded' 
                onChange={(e) => setFilterDays(Number(e.target.value))}
                value={filterDays}
                >
                    <option value={7}>Last 7 days</option>
                    <option value={15}>Last 15 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={90}>Last 90 days</option>
                    <option value={180}>Last 180 days</option>
                    <option value={365}>Last 1 year</option>
                    <option value={730}>Last 2 years</option>
                    <option value={1825}>Last 5 years</option>
                </select>
            </div>

            <LineGraph arr={dayWiseData} dataKey="day" value="cnt" description="Day-wise Line Chart" />
            <br/>
            <BarGraph arr={dayWiseData} dataKey="day" value="cnt" description="Day-wise Bar Chart"   />
            <br />
            <LineGraph arr={mainData.find(data => data?.url === siteName)?.stats?.monthly} dataKey="month" value="cnt" description="Month-wise" />
            <br/>
            <BarGraph arr={mainData.find(data => data?.url === siteName)?.stats?.monthly} dataKey="month" value="cnt" description="Month-wise" />
        </div>
    );
}

export default AdminViews;
