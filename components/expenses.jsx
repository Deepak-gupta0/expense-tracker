import { Car, Coffee, Gamepad2, House, ShoppingBag, Trash2 } from "lucide-react";
import React from "react";

const Expenses = ({ expenses, deleteExpense }) => {
  const spliceTime = (fullTime) => {
    const time = fullTime.slice(0, 5) + fullTime.slice(8);
    return time;
  };

  return (
    <div className="w-full h-[370px] overflow-y-scroll">
      {expenses?.map((expense) => (
        <div
          key={expense.id}
          className="my-2  flex border-b border-gray-400 shadow-xl dark:border-b-gray-600 justify-between items-center rounded-xl dark:bg-gray-900 py-2 px-4 w-full pl-0"
        >
          <div>
            <div className="flex items-center gap-5 ">
              <div>{expenses.id}</div>
              <div className=" p-3 rounded-full text-blue-600 dark:bg-gray-800 dark:text-white">
                {expense.expenseType === "coffee" && (<Coffee />)}
                {expense.expenseType === "house" && (<House/>)}
                {expense.expenseType === "car" && (<Car/>)}
                {expense.expenseType === "shopping" && (<ShoppingBag/>)}
                {expense.expenseType === "games" && (<Gamepad2/>)}
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-gray-700 dark:text-gray-100">{expense.description}</p>
                <div className="flex gap-2 text-gray-500 dark:text-gray-400">
                  <p>
                    {spliceTime(expense.time)}, {expense.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="  flex gap-2 items-center">
            <p className="font-bold text-xl text-red-500 dark:text-orange-700">-${expense.amount}</p>
            <button
              onClick={() => deleteExpense(expense.id)}
              className="hover:bg-gray-900/30 py-2 px-2 rounded-md"
            >
              <Trash2 className="scale-75" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Expenses);
