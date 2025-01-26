import { BarChart, Bar } from "recharts";
import { CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

function BarGraph({ arr, dataKey, value, description }) {
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
                    <BarChart data={arr}>
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
                        <Bar
                            dataKey={value}
                            fill='#6366F1'
                            radius={[10, 10, 0, 0]} // Optional: Rounded corners for the bars
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

export default BarGraph;
