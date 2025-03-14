import { Shield, History, Wallet, Mail, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { useEffect, useState } from "react";

const Profile = () => {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const { initDataUnsafe } = window.Telegram.WebApp;
      if (initDataUnsafe && initDataUnsafe.user) {
        const { first_name, last_name, username, photo_url } =
          initDataUnsafe.user;
        setFullName(`${first_name} ${last_name}`);
        setUserName(username);
        if (photo_url) {
          setProfilePhoto(photo_url);
        }
      }
    } else {
      console.warn(
        "Telegram WebApp is not available. Make sure you're running inside Telegram."
      );
    }
  }, []);

  const handleClose = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.close();
    } else {
      console.warn("Telegram WebApp is not available.");
    }
  };

  const stats = [
    { label: "Total Bets", value: "156" },
    { label: "Won", value: "89" },
    { label: "Win Rate", value: "57%" },
  ];

  const menuItems = [
    { icon: History, label: "Bet History", onClick: () => {} },
    { icon: Wallet, label: "Transaction History", onClick: () => {} },
    { icon: Shield, label: "Security Settings", onClick: () => {} },
    { icon: Mail, label: "Support", onClick: () => {} },
  ];

  return (
    <div className="min-h-screen bg-[#ECE8E5] p-4 pb-32">
      {/* Profile Header */}
      <div className="flex flex-col items-center  pb-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={profilePhoto || "https://github.com/shadcn.png"} />
          <AvatarFallback>{fullName ? fullName[0] : "U"}</AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-bold mb-2">{fullName}</h1>
        <p className="text-gray-600">{"@" + userName || "N/A"}</p>
      </div>

      {/* Stats Section */}
      <Card className="bg-[#FACD6A] shadow-2xl p-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold ">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Menu Items */}
      <Card className="bg-gray-700 shadow-xl  overflow-hidden">
        {menuItems.map((item, index) => (
          <div key={item.label}>
            <button
              className="w-full p-4 flex items-center gap-4 text-white hover:bg-gray-200/50 transition-colors"
              onClick={item.onClick}
            >
              <item.icon className="h-5 w-5 text-white" />
              <span>{item.label}</span>
            </button>
            {index < menuItems.length - 1 && (
              <Separator className="bg-gray-400" />
            )}
          </div>
        ))}
      </Card>

      {/* Logout Button */}
      <div className="mt-6">
        <Button
          variant="destructive"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleClose}
        >
          <LogOut className="h-5 w-5" />
          Close App
        </Button>
      </div>
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-full max-w-sm px-4">
        <BottomNav />
      </div>
    </div>
  );
};

export default Profile;
