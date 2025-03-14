import { Receipt, ArrowDown, ArrowUp, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { BottomNav } from "@/components/BottomNav";
import { TransactionHistory } from "@/components/TransactionHistory";
import { Button } from "@/components/ui/button";
import { WalletCard } from "@/components/WalletCard";

const Transactions = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: ArrowUp,
      label: "Total Deposits",
      value: "$2,345",
      trend: "+12%",
      positive: true,
    },
    {
      icon: ArrowDown,
      label: "Total Withdrawals",
      value: "$1,111",
      trend: "-8%",
      positive: false,
    },
    {
      icon: Clock,
      label: "Pending",
      value: "$234",
      trend: "2 transactions",
      positive: true,
    },
  ];

  const PendingIcon = stats[2].icon; // Extract the icon component before rendering

  return (
    <div className="min-h-screen bg-gray-900 p-4 pb-32">
      <div className="pb-10">
        {/* Wallet Card */}
        <WalletCard />
      </div>
      {/* Stats Grid */}
      <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700 p-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {stats.slice(0, 2).map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <stat.icon className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </div>
                <span
                  className={`text-sm ${
                    stat.positive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
          <div
            key={stats[2].label}
            className="col-span-2 p-4 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <PendingIcon className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-gray-400">{stats[2].label}</p>
                <p className="text-xl font-bold text-white">{stats[2].value}</p>
              </div>
              <span className="text-sm text-green-400">{stats[2].trend}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Transaction History */}
      <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">
              Transaction History
            </h2>
          </div>
          <Button variant="ghost" className="text-sm text-gray-400">
            See all
          </Button>
        </div>
        <TransactionHistory />
      </Card>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-4">
        <BottomNav />
      </div>
    </div>
  );
};

export default Transactions;
