import { BarChart2, Menu, Settings, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdDevices, MdPriceChange } from "react-icons/md";
import { FcOnlineSupport , FcGlobe } from "react-icons/fc";
import { AiFillFileAdd } from "react-icons/ai";
import { FaEye } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { SiLogseq } from "react-icons/si";

const SIDEBAR_ITEMS = [
	{
		name: "Overview",
		icon: BarChart2,
		color: "#6366f1",
		href: "./",
	},
	{ name: "Add Site", icon: AiFillFileAdd, color: "#8B5CF6", href: "./add-site" },
	{ name: "Views", icon: FaEye, color: "#10B981", href: "./views" },
	{ name: "Country Based", icon: FcGlobe, color: "#EC4899", href: "./country-based" },
	{ name: "Device Based", icon: MdDevices, color: "#F59E0B", href: "./device-based" },
	{ name: "IP address Based", icon: TrendingUp, color: "#3B82F6", href: "./ip-based" },
	{ name: "Referer Data", icon: SiLogseq, color: "#6EE7B7", href: "./referer-data" },
	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "./settings" },
	{ name: "Help And Support", icon: FcOnlineSupport, color: "#10B981", href: "./help-and-support" },
	{ name: "My Plan", icon: MdPriceChange, color: "#10B981", href: "./plan" },
	{ name: "Export/Download Data", icon: FaDownload, color: "#6EE7B7", href: "./export" },
	{ name: "Log Data", icon: SiLogseq, color: "#6EE7B7", href: "./log-data" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
		>
			<div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
				<button
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
				>
					<Menu size={24} />
				</button>

				<div className="mt-8 flex-grow">
					{
                    SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<div className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								{isSidebarOpen && (
									<span className="ml-4 whitespace-nowrap">{item.name}</span>
								)}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
