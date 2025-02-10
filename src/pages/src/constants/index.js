import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  // discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "New account",
    url: "/login",
    onlyMobile: true,
  },
  {
    id: "4",
    title: "Sign in",
    url: "/login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Automated Reporting",
  "Advanced Security Features",
  "Customizable Dashboards",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "Personalize your dashboard to display the most relevant metrics and data, giving you a clear view of your website's performance.";

export const collabContent = [
  {
    id: "0",
    title: "Customizable Dashboards",
    text: collabText,
  },
  {
    id: "1",
    title: "Automated Reporting",
  },
  {
    id: "2",
    title: "Advanced Security Features",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "Get Started with Powerful Insights at an Affordable Price",
    price: "0",
    features: [
      "Easy Installation: Quick and hassle-free setup",
      "Platform-Based Traffic Insights: Track where your visitors are coming from",
      "Device Usage Distribution: Analyze mobile vs. desktop traffic",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Unlock Advanced Features and Take Your Analysis to the Next Level",
    price: "49/-",
    features: [
      "Geo-Location Tracking: Real-time insights by country and state.",
      "Browser-Level Traffic Analysis: Detailed insights into user browser preferences.",
      "Unique Visitor Tracking: Monitor and analyze real visitor data.",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Empower Your Business with AI-Powered Insights and Complete Control",
    price: null,
    features: [
      "AI-Powered Traffic Predictions: Forecast trends and behaviors with AI-driven insights.",
      "Heatmap Analytics: Visualize user interactions for improved UX",
      "Advanced Security Features: Protect your data with top-tier encryption and protocols",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Effortless Installation",
    text: "Get started with just a few clicks! Our easy installation process ensures you can begin analyzing your website traffic without any hassle or technical expertise.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Platform-Based Traffic Insights",
    text: "Understand where your visitors are coming from—whether it's desktop, mobile. Gain insights-drive the most traffic to your user experience.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Geo-Location Tracking",
    text: "See where your visitors are located in real-time, from countries to states. Offerings to your target audience’s geographical preferences.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Device Usage Distribution",
    text: " Analyze the distribution of traffic between mobile devices and desktops. Understand your audience's preferred devices and optimize your website design accordingly.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Browser-Level Traffic Analysis",
    text: "Dive deep into browser-specific data, helping you optimize performance for users across different browsers and ensuring a seamless experience on all platforms.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Unique Visitor Tracking",
    text: "Get a clear view of your unique visitors. Track and analyze individual user behavior to gain insights into engagement and retention, improving your site’s performance over time.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
 
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "https://www.instagram.com/go.utham8129/",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "https://ftrack.netlify.app/login  ",
  },
];
