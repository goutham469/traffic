import { BarChart2, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoTodaySharp } from "react-icons/io5";

import Header from "../common/Header";
import StatCard from "../common/StatCard";
import LineGraph from "../visuals/LineGraph";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Overview = () => {
    const [totalViews, setTotalViews] = useState(0);
    const [todayViews, setTodayViews] = useState(0);
    const [growthRate, setGrowthRate] = useState(0);
    const [organicTraffic, setOrganicTraffic] = useState(0);
    const [salesOverviewData, setSalesOverviewData] = useState([]);
	const [ipsOverview , setIpsOverview] = useState([])

    async function getData() {
        const toastId = toast.loading("Fetching data...");
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/get-stats`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: localStorage.getItem("email") }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result.data);

                const total = result.data.reduce((sum, item) => sum + item.views, 0);

                // Get today's and yesterday's date
                const todayDate = new Date().toISOString().split("T")[0];
                const yesterdayDate = new Date(new Date().setDate(new Date().getDate() - 1))
                    .toISOString()
                    .split("T")[0];

                let today = 0,
                    yesterday = 0,
                    organic = 0;
                let graphData = [];
				let ipsData = [];

                result.data.forEach((site) => {
                    site.stats.daily.forEach((day) => {
                        if (day.day === todayDate) {
                            today += day.cnt;
                        }
                        if (day.day === yesterdayDate) {
                            yesterday += day.cnt;
                        }

                        // Populate graph data
                        let existing = graphData.find((entry) => entry.day === day.day);
                        if (existing) {
                            existing.cnt += day.cnt;
                        } else {
                            graphData.push({ day: day.day, cnt: day.cnt });
                        }
						

                    });

					
					site.ips.forEach(ip => {
						if (!ipsData.includes(ip.address)) {
							ipsData.push(ip.address);
						}
					});

                    // Count organic traffic
                    site.referrers.forEach((x) => {
                        if (x.referrer.includes("google.com")) {
                            organic += x.cnt;
                        }
                    });
                });

                console.log(today, yesterday);

                const growth = yesterday !== 0 ? (((today - yesterday) / yesterday) * 100).toFixed(2) : 0;

                setTotalViews(total);
                setTodayViews(today);
                setGrowthRate(growth);
                setOrganicTraffic(organic);
                setSalesOverviewData(graphData);
				setIpsOverview(ipsData)

                toast.update(toastId, {
                    render: "✅ Data loaded successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            } else {
                toast.update(toastId, {
                    render: "⚠️ Problem at server!",
                    type: "warning",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.update(toastId, {
                render: "❌ Unable to fetch data.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Overview" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Total views" icon={Zap} value={totalViews.toLocaleString()} color="#6366F1" />
					<StatCard name="Unique Visitors" icon={BarChart2} value={ipsOverview.length} color="#10B981" />
                    <StatCard name="Today views" icon={IoTodaySharp} value={todayViews.toLocaleString()} color="#8B5CF6" />
                    <StatCard name="Growth with Yesterday" icon={FaArrowTrendUp} value={`${growthRate}%`} color="#EC4899" />
                    <StatCard name="Organic traffic" icon={BarChart2} value={organicTraffic} color="#10B981" />
                </motion.div>

                {/* CHARTS */}
                <div className=" ">
                    <LineGraph arr={salesOverviewData} dataKey="day" value="cnt" description="Views from all websites" />
                </div>
            </main>
        </div>
    );
};

export default Overview;
