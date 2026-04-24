import  { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export function Layout(){

    const [sidebarOpen,setSidebarOpen]=useState(false)


    return (
        <>
        <div className="min-h-screen bg-gray-50">
            <Header onMenuClick={()=> setSidebarOpen(!sidebarOpen)}/>
            <Sidebar isOpen={sidebarOpen} onClose={()=> setSidebarOpen(false)}/>
            <main className="max-w-6xl mx-auto px-4 py-6">
                <Outlet/>
            </main>

        </div>
            
        </>
    )
}