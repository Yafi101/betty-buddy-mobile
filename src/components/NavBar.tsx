import { Bell, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { getUser } from "@/services/userServices";

export const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const [chatId, setChatId] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    // Check if the Telegram object and its WebApp property exist
    if (window.Telegram && window.Telegram.WebApp) {
      const { initDataUnsafe } = window.Telegram.WebApp;
      if (initDataUnsafe && Object.keys(initDataUnsafe).length !== 0) {
        const { user } = initDataUnsafe;
        if (user) {
          const { id, first_name, last_name, username, language_code } = user;
          console.log(id);
          console.log(first_name, last_name);
          setFirstName(first_name);
          setChatId(id);
          // setChatId(id);
          // setLoadedFromTelegram(true);
        }
      }
    } else {
      console.warn(
        "Telegram WebApp is not available. Make sure you're running inside Telegram."
      );
    }
  }, []);

  return (
    <div className="px-4 py-3 flex justify-between items-center bg-white">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#FACD6A] flex items-center justify-center">
          <User className="w-5 h-5 text-black" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">{t("nav.greeting")}</span>
          <span className="font-semibold">{firstName}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as "en" | "am")}
          className="bg-transparent text-sm"
        >
          <option value="en">English</option>
          <option value="am">አማርኛ</option>
        </select>
        <button className="p-2">
          <Bell className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
