import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import StatCard from '../common/StatCard';
import { FaEye } from 'react-icons/fa6';
import LineGraph from '../visuals/LineGraph';
import AreaGraph from '../visuals/AreaGraph';

function ServerHealth() {
    const [data , setData] = useState({})
    const [weekly , setWeekly] = useState([])

    async function getData()
    {
        let response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/meta`)
        response = await response.json()
        console.log(response)
        let week = groupByWeek(response.api.stats.daily)
        console.log(week)
        setWeekly(week)

        setData(response)

    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Server Health!' />

        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
            <div className='flex justify-around flex-wrap'>
                <StatCard  name="API calls" icon={FaEye} value={data.apiCalls} color="green"   />
                <StatCard name="Total IPs visited" icon={FaEye} value={data?.api?.ipAdrs?.length} color="green"   />
            </div>

            <br/>
            <AreaGraph arr={weekly} dataKey="weekStart" value="totalViews" description="Weekly requests Load" />
            <br/>

            <LineGraph arr={data.api?.ipAdrs} dataKey="ip" value="views" description="Total IPS at a glance" />

            <br/>
            <AreaGraph arr={data.api?.stats?.monthly} dataKey="monthly" value="views" description="Monthly requests Load" />
            <AreaGraph arr={data.api?.stats?.daily} dataKey="date" value="views" description="Daily requests Load" />
        </main> 
    </div>
  )
}

export default ServerHealth;


function groupByWeek(dailyStats) {
    const weekData = new Map();

    dailyStats?.forEach(({ date, views }) => {
        const [day, month, year] = date.split("/").map(Number);
        const currentDate = new Date(year, month - 1, day); // Convert to Date object

        // Find the Monday of the current week
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Adjust to Monday

        const weekKey = startOfWeek.toISOString().split("T")[0]; // YYYY-MM-DD format

        if (!weekData.has(weekKey)) {
            weekData.set(weekKey, { weekStart: weekKey, weekEnd: "", totalViews: 0 });
        }

        weekData.get(weekKey).totalViews += views;
    });

    // Update the weekEnd (Sunday) for each week
    for (const [weekStart, data] of weekData) {
        const startDate = new Date(weekStart);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6); // Get the Sunday of that week

        data.weekEnd = endDate.toISOString().split("T")[0]; // YYYY-MM-DD format
    }

    return Array.from(weekData.values());
}