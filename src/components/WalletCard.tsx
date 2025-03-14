import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const WalletCard = () => {
  const { t } = useLanguage();

  return (
    <div className="  p-6">
      <div className="mb-6">
        <p className="text-gray-400 mb-1">{t("wallet.currentBalance")}</p>
        {/* <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"> */}
        <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent">
          500.00 Birr
        </h1>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 text-white rounded-2xl hover:text-gray-400"
        >
          {t("wallet.withdraw")}
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-pink-500 backdrop-blur-lg border-white/10 hover:bg-pink-300 rounded-2xl"
        >
          {t("wallet.deposit")}
        </Button>
      </div>
    </div>
  );
};
