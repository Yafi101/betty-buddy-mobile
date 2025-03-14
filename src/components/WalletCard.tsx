import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getUser } from "@/services/userServices";
import { deposit } from "@/services/transactionService";

export const WalletCard = () => {
  const { t } = useLanguage();
  const [chatId, setChatId] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [showDepositInput, setShowDepositInput] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");

  useEffect(() => {
    // Check if the Telegram object and its WebApp property exist
    if (window.Telegram && window.Telegram.WebApp) {
      const { initDataUnsafe } = window.Telegram.WebApp;
      if (initDataUnsafe && Object.keys(initDataUnsafe).length !== 0) {
        const { user } = initDataUnsafe;
        if (user) {
          const { id, first_name, last_name } = user;
          setChatId(id);
          setFirstName(first_name);
          setLastName(last_name);
        }
      }
    } else {
      console.warn(
        "Telegram WebApp is not available. Make sure you're running inside Telegram."
      );
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (chatId) {
        try {
          const user = await getUser(chatId);
          console.log("Fetched User:", user);
          setWalletBalance(user.balance);
          setUserData(user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [chatId]);

  const handleDepositClick = () => {
    // Toggle the deposit input visibility
    setShowDepositInput((prev) => !prev);
  };

  const handleDeposit = async () => {
    if (!depositAmount || !userData) return;
    try {
      console.log(userData);
      const response = await deposit(
        Number(depositAmount),
        "placeholder@gmail.com",
        firstName,
        lastName,
        userData.phone, // User phone number
        Number(userData._id) // Chat ID
      );
      console.log("Payment URL:", response.paymentUrl);
    } catch (error) {
      console.error("Error depositing money:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-3">
      <div className="mb-6">
        <p className="text-black font-semibold mb-1">
          {t("wallet.currentBalance")}
        </p>
        <h1 className="text-4xl font-bold text-black bg-clip-text text-gray-900">
          {walletBalance} Birr
        </h1>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 bg-gray-900 backdrop-blur-lg border-white/10 hover:bg-gray-900/50 text-white hover:text-black rounded-2xl"
        >
          {t("wallet.withdraw")}
        </Button>
        <Button
          variant="outline"
          onClick={handleDepositClick}
          className={`flex-1 text-gray-900 backdrop-blur-lg border-white/10 hover:bg-[#FACD6A]/50 rounded-2xl ${
            showDepositInput ? "bg-gray-300" : "bg-[#FACD6A]"
          }`}
        >
          {t("wallet.deposit")}
        </Button>
      </div>
      {showDepositInput && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder={"Enter Amount"}
            className="border rounded px-2 py-1 text-sm w-32"
          />
          <Button
            onClick={handleDeposit}
            className="bg-[#FACD6A] text-gray-900 rounded-xl px-2 py-1 text-sm"
          >
            Confirm
          </Button>
        </div>
      )}
    </div>
  );
};
