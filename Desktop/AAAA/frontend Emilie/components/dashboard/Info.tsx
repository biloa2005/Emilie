import React from "react";
//nom des different meta info
const metaData = [
  { title: "dettes des clients" },
  { title: "mes dettes" },
  { title: "produit deteriorer" },
  { title: "nombre de produits" },
];
function Info() {
  return (
    <div>
      <ul className="grid grid-cols-1 items-center flex-1 flex justify-center lg:grid-cols-4 gap-10 mt-5 w-full">
        {metaData.map((data) => (
          <li key={data.title} className="rounded-xl bg-white p-6 shadow-xl flex items-center justify-center">
            
           <h2 className="text-base"> 
            {data.title}
            </h2>
            
           </li>
        ))}
      </ul>
    </div>
  );
}

export default Info;
