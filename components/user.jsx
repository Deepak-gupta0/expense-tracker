"use client"
import { getProfileData } from "@/lib/profile";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState({
    fullname : "",
    email : ""
  })
  const router = useRouter();

  const [isUserOpen, setIsUserOpen] = useState(false)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const userData = await getProfileData()
    setUser(userData)
  }

  const hanleLogout = async () => {
    const response = await fetch("/api/logout", {method : 'POST'})
    if(response.status === 204){
      return router.push("/login")
    }

  }

  return (
    <div onClick={() => setIsUserOpen(prev => !prev)} className="w-fit  px-2 py-1 rounded-full relative ">
      <button>
        <UserIcon className="scale-75 cursor-pointer"/>
      </button>
      {isUserOpen && (
        <div className="absolute dark:bg-gray-800 dark:text-white bg-gray-100 text-gray-700 border border-gray-400  rounded-md h-fit px-4 py-2">
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold ">{user.fullname}</h3>
            <p className="dark:text-gray-400 text-gray-600">{user.email}</p>
            <button onClick={hanleLogout} className="flex justify-center border w-full bg-red-600 mt-3 py-1 text-white font-semibold cursor-pointer dark:bg-gray-900 dark:text-red-500 dark:font-normal tracking-wider"><span>Logout</span></button>
          </div>
        </div>
      )}
    </div>
  )
}


