import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Sites from '../common/Sites';
import BarGraph from './BarGraph';
import StatCard from '../common/StatCard';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';

function RefererGraph() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Referer Based insights' />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <Sites />
        <SiteMetrics />
      </main>
    </div>
  );
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
        const refData = result.data.find(data => data.url === siteName)?.referrers || [];
        const nullCount = refData.filter(referer => !referer.referrer).length;
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

  const refData = mainData.find(data => data.url === siteName)?.referrers || [];
  // Filter out countries with null or undefined names
  const filteredrefData = refData.filter(ref => ref.referrer);

  // Sort IP data by 'cnt' in descending order
  const sortedfilteredrefData = filteredrefData.sort((a, b) => b.cnt - a.cnt);

  return (
    <div>
      <div className='flex justify-around flex-wrap bg-slate-900 rounded-lg m-3 p-3'>
        <motion.div
          className='flex justify-around gap-3 mb-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total views" icon={FaEye} value={siteName} color="green" />
          <StatCard name="Total views" icon={FaEye} value={mainData.find(data => data.url === siteName)?.views} color="green" />
          <StatCard name="Last Day Viewed" icon={FaEye} value={mainData.find(data => data.url === siteName)?.stats?.daily[ mainData.find(data => data.url === siteName)?.stats?.daily.length - 1 ]?.day} color="green" />
          <StatCard name="Null Country Count" icon={FaEye} value={nullCountriesCount} color="red" />
        </motion.div>
      </div>

      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-semibold'>Referrer-wise traffic Distribution</h2>
      </div>

      <br />
      <br />
      <BarGraph arr={sortedfilteredrefData} dataKey="referrer" value="cnt" description="Referer wise traffic" />

      {/* Table for displaying IP data */}
      <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-lg mt-6">
        <table className="min-w-full bg-slate-900 text-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Referrer</th>
              <th className="py-2 px-4 text-left">Count</th>
            </tr>
          </thead>
          <tbody>
            {sortedfilteredrefData.map((ref, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-2 px-4">{ref.referrer || "Unknown IP"}</td>
                <td className="py-2 px-4">{ref.cnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RefererGraph;
