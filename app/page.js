import AddExpence from "@/components/add-expence";
import Header from "@/components/header";


export default function Home() {
  
  return (
    <div className="min-h-screen h-screen overflow-y-hidden relative bg-[#eff4fa] dark:bg-gray-900">
      <div className="max-w-[367px]  mx-auto ">
     
       <div className=" flex flex-col items-center w-full">
         <Header />
         
        <AddExpence/>
       </div>
      </div>
    </div>
  );
}
