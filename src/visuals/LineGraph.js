import { LineChart } from "recharts";
import { CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

function LineGraph({ arr, dataKey, value, description }) {
    if(!arr || arr.length == 0){
        return <h1 className='text-lg font-medium mb-4 text-gray-100' >Not enought Data to show</h1>
    }
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className='text-lg font-medium mb-4 text-gray-100'>{description}</h2>

            <div className='h-80'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={arr}>   
                        <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
                        <XAxis dataKey={dataKey} stroke='#9ca3af' />
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
                            dataKey={value}
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
}

export default LineGraph;
