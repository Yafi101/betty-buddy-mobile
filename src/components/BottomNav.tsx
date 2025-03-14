import { Home, BarChart, List, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const tabs = [
    { icon: Home, label: t("tabs.home"), path: "/" },
    { icon: BarChart, label: t("tabs.performance"), path: "/performance" },
    { icon: List, label: t("tabs.transactions"), path: "/transactions" },
    { icon: User, label: t("tabs.profile"), path: "/profile" },
  ];

  return (
    <div className="bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl flex justify-around items-center h-16 shadow-lg">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`flex flex-col items-center px-4 ${
            location.pathname === tab.path ? "text-primary" : "text-gray-400"
          }`}
          onClick={() => navigate(tab.path)}
        >
          <tab.icon className="w-6 h-6" />
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
