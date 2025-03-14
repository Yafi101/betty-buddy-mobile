
import { ArrowDown, ArrowUp } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "deposit",
    amount: 500,
    status: "completed",
    date: "2024-03-07",
    description: "Bank Transfer Deposit",
  },
  {
    id: 2,
    type: "withdrawal",
    amount: 200,
    status: "completed",
    date: "2024-03-06",
    description: "Withdrawal to Bank",
  },
  {
    id: 3,
    type: "deposit",
    amount: 100,
    status: "pending",
    date: "2024-03-05",
    description: "Card Deposit",
  },
  {
    id: 4,
    type: "withdrawal",
    amount: 150,
    status: "completed",
    date: "2024-03-04",
    description: "Withdrawal to Card",
  },
];

export const TransactionHistory = () => {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30 border border-gray-700"
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-2 rounded-full ${
                transaction.type === "deposit"
                  ? "bg-green-500/20 text-green-500"
                  : "bg-red-500/20 text-red-500"
              }`}
            >
              {transaction.type === "deposit" ? (
                <ArrowDown className="h-5 w-5" />
              ) : (
                <ArrowUp className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="font-medium text-white">{transaction.description}</p>
              <p className="text-sm text-gray-400">{transaction.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`font-semibold ${
                transaction.type === "deposit"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {transaction.type === "deposit" ? "+" : "-"}${transaction.amount}
            </p>
            <p
              className={`text-sm ${
                transaction.status === "completed"
                  ? "text-gray-400"
                  : "text-yellow-400"
              }`}
            >
              {transaction.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
