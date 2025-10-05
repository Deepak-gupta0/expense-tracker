"use client";

import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function TotalPrice({ expenses }) {
  function getTotalAmount(expenses) {
    return expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }

  const [spentPrice, setSpentPrice] = useState(0.0);
  const [expensesCount, setExpensesCount] = useState(0);

  useEffect(() => {
    setSpentPrice(getTotalAmount(expenses));
    setExpensesCount(expenses.length);
  }, [expenses]); // 👈 Runs whenever expenses change

  return (
    <div className="my-4 w-full rounded-xl border border-gray-400 dark:border-gray-600 shadow-xl">
      <div className="dark:bg-gray-800 p-3 rounded-2xl">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-300">Total Spent</p>
            <h2 className="text-4xl font-bold text-blue-600 dark:text-gray-100">${spentPrice}</h2>
          </div>
          <div className="flex justify-between flex-col items-center text-blue-600 dark:text-gray-300">
            <TrendingUp />
            <div>{expensesCount} expenses</div>
          </div>
        </div>
      </div>
    </div>
  );
}
