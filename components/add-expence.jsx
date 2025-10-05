"use client";
import clsx from "clsx";
import {
  Car,
  Coffee,
  Gamepad2,
  House,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Expenses from "./expenses";
import TotalPrice from "./total-price";
import { useRouter } from "next/navigation";

export default function AddExpence() {
  const [expenses, setExpenses] = useState([]);
  const [isAddExpense, setIsAddExpense] = useState(false);
  const categories = [
    { key: "coffee", icon: <Coffee /> },
    { key: "car", icon: <Car /> },
    { key: "house", icon: <House /> },
    { key: "shopping", icon: <ShoppingBag /> },
    { key: "games", icon: <Gamepad2 /> },
  ];

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [timeObj, setTime] = useState(new Date());
  const [time, setNowTime] = useState(timeObj.toLocaleTimeString());
  const [date, setNowDate] = useState(timeObj.toLocaleDateString());
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAddExpense(false);
    sendExpenseData({ amount, description, expenseType, time, date });
    setAmount("");
    setDescription("");
    setExpenseType("");
  };

  useEffect(() => {
    getExpensesData();
  }, []);

  const getExpensesData = async () => {
    const response = await fetch("/api/expenses", { method: "GET" });

    if (response.status === 401) {
      return router.push("/login");
    }
    const expenseData = await response.json();
    if (!expenseData.error) {
      setExpenses(expenseData.reverse());
    }
  };

  const sendExpenseData = async (data) => {
    const response = await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify(data),
    });
    getExpensesData()
  };

  const deleteExpense = async (id) => {
    const response = await fetch(`/api/expenses/${id}`, {
      method: "DELETE",
    });
    getExpensesData();
  };
  return (
    <div className="w-full">
      <TotalPrice expenses={expenses} />
      <button
        onClick={() => setIsAddExpense((prev) => !prev)}
        className="w-full rounded-lg cursor-pointer overflow-hidden text-gray-600 dark:text-white border border-gray-400 dark:border-gray-600 shadow-xl"
      >
        <div>
          {isAddExpense ? (
            <div className="hover:bg-gray-400/20 dark:border-gray-600 dark:text-red-500 py-2 flex justify-center ">
              <X className="scale-75" />
            </div>
          ) : (
            <div className="flex py-2 justify-center">
              <span>
                <Plus />
              </span>
              <span>Add a New Expense</span>
            </div>
          )}
        </div>
      </button>
      <form onSubmit={handleSubmit}>
        {isAddExpense && (
          <div className="dark:bg-gray-800/60 rounded-xl  my-2 border dark:border-gray-600 border-gray-400 shadow-xl p-4 flex flex-col gap-3">
            <div className="dark:bg-gray-900 rounded-md  outline dark:outline-gray-600">
              <input
                type="number"
                className="w-full p-2 pl-3"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="dark:bg-gray-900 rounded-md  outline dark:outline-gray-600">
              <input
                type="text"
                className="w-full p-2 pl-3"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              {categories.map((category) => (
                <div
                  key={category.key}
                  onClick={() => setExpenseType(category.key)}
                  className={clsx(
                    "p-4  rounded-xl  outline dark:outline-gray-600 cursor-pointer dark:text-white text-gray-600",
                    category.key === expenseType &&
                      expenseType === "coffee" &&
                      "bg-amber-500  text-gray-600 dark:text-black",
                    category.key === expenseType &&
                      expenseType === "car" &&
                      "bg-blue-500 text-gray-600 dark:text-black",
                    category.key === expenseType &&
                      expenseType === "house" &&
                      "bg-yellow-900 text-gray-600 dark:text-black",
                    category.key === expenseType &&
                      expenseType === "shopping" &&
                      "bg-purple-500 text-gray-600 dark:text-black",
                    category.key === expenseType &&
                      expenseType === "games" &&
                      "bg-red-500 text-gray-600 dark:text-black"
                  )}
                >
                  {category.icon}
                </div>
              ))}
            </div>
            <button
              className={`  py-2 text-center rounded-xl text-gray-600 dark:text-white   ${
                expenseType && amount && description
                  ? "dark:bg-green-500 dark:hover:bg-green-600 bg-blue-500"
                  : " outline dark:bg-gray-700 cursor-not-allowed"
              }`}
              disabled={!expenseType}
            >
              Add Expense
            </button>
          </div>
        )}
      </form>
      {!isAddExpense && (
      <div className="w-full outline shadow-xl dark:bg-gray-800 rounded-xl dark:outline-gray-600 ">
      <p className="text-xl font-semibold text-gray-600 dark:text-gray-100 my-4 px-3 flex items-center">
        <span className="mt-3">Recents Expenses</span>
      </p>
      <div className="bg-gray-100 dark:bg-gray-800 border-t border-gray-400">
      <Expenses deleteExpense={deleteExpense} expenses={expenses} />
      </div>
      </div>
      )}
    </div>
  );
}
