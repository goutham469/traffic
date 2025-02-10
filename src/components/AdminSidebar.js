import { BarChart2, Menu, Settings, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdApi, MdDevices, MdPriceChange } from "react-icons/md";
import { FcOnlineSupport , FcGlobe, FcViewDetails } from "react-icons/fc";
import { AiFillFileAdd } from "react-icons/ai";
import { FaEye, FaUsers } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { SiLogseq } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import { GoCrossReference } from "react-icons/go";
import { CiCircleList } from "react-icons/ci";

const SIDEBAR_ITEMS = [
	{
		name: "Overview",
		icon: BarChart2,
		color: "#6366f1",
		href: "./",
	},
    { name: "users", icon: FaUsers, color: "#10B981", href: "./users" },
	{ name: "Sites", icon: CgWebsite, color: "#6EE7B7", href: "./sites" },

	{ name: "Views", icon: FaEye, color: "#10B981", href: "./views" },
	{ name: "Country Based", icon: FcGlobe, color: "#EC4899", href: "./country-based" },
	{ name: "Device Based", icon: MdDevices, color: "#F59E0B", href: "./device-based" },
	{ name: "IP address Based", icon: TrendingUp, color: "#3B82F6", href: "./ip-based" },
	{ name: "Referer Data", icon: GoCrossReference, color: "#6EE7B7", href: "./referer-data" },

	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "./settings" },
	{ name: "CRM", icon: FcOnlineSupport, color: "#10B981", href: "./crm" },
	{ name: "Export/Download Data", icon: FaDownload, color: "#6EE7B7", href: "./export" },
	{ name: "Log Data", icon: CiCircleList, color: "#6EE7B7", href: "./log-data" },
	{ name: "Server Health", icon: MdApi, color: "#6EE7B7", href: "./server-health" },
];

const AdminSidebar = () => {
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
							<div className="flex items-center p-2 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
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

export default AdminSidebar;
