import { Wallet } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import  User  from "./user";

export default function Header() {
  return (
    <div className="text-center">
      <div className="w-full flex justify-center mt-4">
        <div className="w-fit p-2 dark:bg-gradient-to-br from-blue-500 via-purple-700 to-pink-800 rounded-full scale-130">
          <Wallet className="" />
        </div>
      </div>
      <div className="w-screen flex justify-center items-center gap-2">
        <h1 className=" text-4xl my-1 font-bold text-[#2563eb] dark:text-pink-600">
          Expense Tracker
        </h1>
        <div className="flex ">
          <ThemeToggle />
          <User />
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400">Track your daily expenses</p>
    </div>
  );
}
