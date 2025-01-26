import { BarChart2, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoTodaySharp } from "react-icons/io5";

import Header from "../common/Header";
import StatCard from "../common/StatCard";
import SalesOverviewChart from "../visuals/SalesOverviewChart";


const Overview = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total views' icon={Zap} value='12,345' color='#6366F1' />
					<StatCard name='Today views' icon={IoTodaySharp} value='1,234' color='#8B5CF6' />
					<StatCard name='Growth with Yesterday' icon={FaArrowTrendUp} value='-5' color='#EC4899' />
					<StatCard name='Organic traffic' icon={BarChart2} value='12' color='#10B981' />
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					{/* <CategoryDistributionChart />
					<SalesChannelChart /> */}
				</div>
			</main>
		</div>
	);
};
export default Overview;
