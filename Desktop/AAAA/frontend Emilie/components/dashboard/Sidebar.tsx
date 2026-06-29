"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Package, 
  UserMinus, 
  HandCoins, 
  PackageX, 
  History, 
  Bot,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut
} from "lucide-react";

const dash = [
  { name: "Mes Produits", href: "/produits", icon: Package },
  { name: "Dettes Client", href: "/dettes-client", icon: UserMinus },
  { name: "Mes Dettes", href: "/mes-dettes", icon: HandCoins },
  { name: "Produits Endommagés", href: "/produits-endommages", icon: PackageX },
  { name: "Historique", href: "/historique", icon: History },
  { name: "ChatBot", href: "/chatbot", icon: Bot },
];

function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <>
      {/* --- MENU MOBILE (Top Bar pour Écrans Tactiles) --- */}
      <div className="lg:hidden flex items-center justify-between bg-slate-900 text-white p-4 w-full sticky top-0 z-50 shadow-md">
        <span className="text-xl font-bold tracking-wider text-blue-400">Emilie <span className="text-xs text-slate-400 font-normal">ERP</span></span>
        <button 
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isOpenMobile ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- SIDEBAR PRINCIPALE (Desktop & Mobile Wrapper) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 lg:sticky top-0
        flex flex-col bg-slate-900 text-slate-200 border-r border-slate-800
        transition-all duration-300 ease-in-out
        ${isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-20" : "lg:w-64"} 
        w-64 min-h-screen
      `}>
        
        {/* Header / Logo */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 h-20">
          {!isCollapsed && (
            <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
              Emilie <span className="text-xs font-semibold text-slate-500 uppercase">v1.0</span>
            </span>
          )}
          {isCollapsed && <span className="text-xl font-black text-blue-400 mx-auto">E.</span>}
          
          {/* Bouton pour rétracter (Desktop seulement) */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Liste des Liens de Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          {dash.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            return (
              <div key={item.name}>
                <Link 
                  href={item.href}
                  onClick={() => setIsOpenMobile(false)} // Ferme le menu sur mobile après clic
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm
                    transition-all duration-200 group relative
                    ${isActive 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold" 
                      : "hover:bg-slate-800 hover:text-white text-slate-400"}
                  `}
                >
                  <IconComponent 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2} 
                    className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"}`}
                  />
                  
                  {/* Cache le texte si la sidebar est repliée */}
                  <span className={`transition-opacity duration-200 ${isCollapsed ? "lg:opacity-0 lg:w-0 overflow-hidden" : "opacity-100"}`}>
                    {item.name}
                  </span>

                  {/* Tooltip ultra-pro quand la barre est repliée */}
                  {isCollapsed && (
                    <div className="hidden lg:block absolute left-full rounded-md px-2 py-1 ml-6 bg-slate-950 text-white text-xs font-semibold opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all z-50 pointer-events-none whitespace-nowrap border border-slate-800 shadow-xl">
                      {item.name}
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* --- Section Bas de Page (Profil / Déconnexion) --- */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} gap-3`}>
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md text-sm">
                  EM
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-200">Gérant</span>
                  <span className="text-xs text-slate-500">Session active</span>
                </div>
              </div>
            )}
            
            <button 
              title="Déconnexion"
              className="p-2.5 rounded-xl text-slate-400 hover:text-error hover:bg-error/10 transition-all duration-200"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

      </aside>

      {/* Arrière-plan flouté pour fermer le menu mobile en cliquant à côté */}
      {isOpenMobile && (
        <div 
          onClick={() => setIsOpenMobile(false)}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
}

export default Sidebar;