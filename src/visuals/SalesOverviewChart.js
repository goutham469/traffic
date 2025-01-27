import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const salesData = [
	{ name: "1", sales: 6100 },
	{ name: "2", sales: 5900 },
	{ name: "3", sales: 6800 },
	{ name: "4", sales: 6300 },
	{ name: "5", sales: 7100 },
	{ name: "6", sales: 7500 },
	{ name: "7", sales: 4200 },
	{ name: "8", sales: 3800 },
	{ name: "9", sales: 5100 },
	{ name: "10", sales: 4600 },
	{ name: "11", sales: 6100 },
	{ name: "12", sales: 5900 },
	{ name: "13", sales: 6800 },
	{ name: "14", sales: 6300 },
	{ name: "15", sales: 7100 },
	{ name: "16", sales: 7500 },
	{ name: "17", sales: 4200 },
	{ name: "18", sales: 3800 },
	{ name: "19", sales: 5100 },
	{ name: "20", sales: 4600 },
	{ name: "21", sales: 6100 },
	{ name: "22", sales: 5900 },
	{ name: "23", sales: 6800 },
	{ name: "24", sales: 6300 },
	{ name: "25", sales: 7100 },
	{ name: "26", sales: 7500 },
	{ name: "27", sales: 4200 },
	{ name: "28", sales: 3800 },
	{ name: "29", sales: 5100 },
	{ name: "30", sales: 4600 },
];

const SalesOverviewChart = ( ) => {

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Views for this month</h2>

			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={salesData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey={"name"} stroke='#9ca3af' />
						<YAxis stroke='#9ca3af' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type='monotone'
							dataKey='sales'
							stroke='#6366F1'
							strokeWidth={2}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 2 }}
							activeDot={{ r: 4, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default SalesOverviewChart;
