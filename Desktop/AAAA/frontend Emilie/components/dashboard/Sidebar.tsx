// import Link from "next/link";
// import React from "react";

// const dash = [
//   { name: "Mes Produit", href: "/produits" },
//   { name: "Dettes Client", href: "/dettes-client" },
//   { name: "Mes Dettes", href: "/mes-dettes" },
//   { name: "Produit Endommagé", href: "/produits-endommages" },
//   { name: "Historique", href: "/historique" },
//   { name: "ChatBot", href: "/chatbot" },
// ];

// function Sidebar() {
//   return (
//     <ul className="menu bg-blue-500 text-white w-full min-h-screen p-4">
//       <li className="text-3xl font-bold mb-6 ml-3">Emilie</li>

//       {dash.map((das) => (
//         <li key={das.name} className="mt-2">
//           <Link href={das.href}>{das.name}</Link>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default Sidebar;
import Link from "next/link";
import React from "react";
// Importation des icônes choisies
import { 
  Package, 
  UserMinus, 
  HandCoins, 
  PackageX, 
  History, 
  Bot 
} from "lucide-react";

const dash = [
  { name: "Mes Produit", href: "/produits", icon: Package },
  { name: "Dettes Client", href: "/dettes-client", icon: UserMinus },
  { name: "Mes Dettes", href: "/mes-dettes", icon: HandCoins },
  { name: "Produit Endommagé", href: "/produits-endommages", icon: PackageX },
  { name: "Historique", href: "/historique", icon: History },
  { name: "ChatBot", href: "/chatbot", icon: Bot },
];

function Sidebar() {
  return (
    <ul className="menu bg-blue-500 text-white w-full min-h-screen p-4">
      <li className="text-3xl font-bold mb-6 ml-3">Emilie</li>

      {dash.map((das) => {
        // Extraction de l'icône pour l'utiliser comme composant
        const IconComponent = das.icon;
        
        return (
          <li key={das.name} className="mt-2">
            <Link href={das.href} className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 rounded-lg transition-colors">
              <IconComponent size={20} strokeWidth={2} />
              <span>{das.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Sidebar;
