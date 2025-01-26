import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

function PieGraph({ arr, dataKey, value, description , radius }) {
    const COLORS = ["#6366F1", "#4CAF50", "#FF9800", "#F44336", "#2196F3", "#9C27B0"];

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
                    <PieChart>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend
                            wrapperStyle={{ color: "#9ca3af" }}
                            iconSize={16}
                            layout="vertical"
                            align="right"
                        />
                        <Pie
                            data={arr}
                            dataKey={value}
                            nameKey={dataKey}
                            cx="50%"
                            cy="50%"
                            outerRadius={radius}
                            fill="#6366F1"
                            label
                        >
                            {arr.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

export default PieGraph;
