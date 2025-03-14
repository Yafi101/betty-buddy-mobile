import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { BottomNav } from "@/components/BottomNav";
import { BettingActivityCalendar } from "@/components/BettingActivityCalendar";
import { WinRateChart } from "@/components/WinRateChart";
import { Trophy, TrendingUp, Wallet } from "lucide-react";

const Performance = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Trophy,
      label: "Total Bets Won",
      value: "89",
      trend: "+12%",
      positive: true,
    },
    {
      icon: TrendingUp,
      label: "Win Rate",
      value: "57%",
      trend: "+5%",
      positive: true,
    },
    {
      icon: Wallet,
      label: "Total Winnings",
      value: "$1,234",
      trend: "+$245",
      positive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-4 pb-32">
      <h1 className="text-2xl font-bold text-white mb-6">
        Performance Overview
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <stat.icon className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <span
                className={`text-sm ${
                  stat.positive ? "text-green-400" : "text-red-400"
                }`}
              >
                {stat.trend}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Win Rate Chart */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 pr-4 pt-4  mb-6 flex items-center justify-center flex-col">
        <h2 className="text-lg font-semibold text-white mb-4">
          Win Rate Trend
        </h2>
        <div className="h-[300px] mr-4 w-full ">
          <WinRateChart />
        </div>
      </Card>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-4">
        <BottomNav />
      </div>
    </div>
  );
};

export default Performance;
