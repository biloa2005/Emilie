import Devise from '@/components/dashboard/Devise'
import Sidebar from "@/components/dashboard/Sidebar";
import Dialog from "@/components/tchatboot/dialogue";
import React from 'react'

function page() {
  return (
       <div className="flex items-center h-screen">
      <aside className="w-64 h-full hidden lg:block">
        <Sidebar/>
      </aside>
      <div className="h-full flex-1 flex justify-center p-5">
        <div className="">
          <Devise />
         <Dialog/>
        </div>
        
      </div>
    </div>
  )
}

export default page