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
    <div className="bg-white backdrop-blur-lg border border-gray-700 rounded-2xl flex justify-around items-center p-2 shadow-lg">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`flex flex-col items-center justify-center px-4 ${
            location.pathname === tab.path
              ? "text-gray-900 bg-[#FACD6A] p-2 rounded-full h-full"
              : "text-gray-400"
          }`}
          onClick={() => navigate(tab.path)}
        >
          <tab.icon className="w-4 h-4" />
          {/* <span className="text-xs mt-1">{tab.label}</span> */}
        </button>
      ))}
    </div>
  );
};
