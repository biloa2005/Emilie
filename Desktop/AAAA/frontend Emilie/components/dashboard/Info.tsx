import React from "react";
//nom des different meta info
const metaData = [
  { title: "dettes des clients",nombre:2 },
  { title: "mes dettes",nombre:2 },
  { title: "produit deteriorer",nombre:2 },
  { title: "nombre de produits",nombre:2 },
];
function Info() {
  return (
    <div>
      <ul className="grid grid-cols-1 items-center flex-1 flex justify-center lg:grid-cols-4 gap-10 mt-5 w-full">
        {metaData.map((data) => (
          <li key={data.title} className="rounded-xl bg-white p-6 shadow-xl flex items-center justify-center">
            
           <h2 className="text-base grid grid-cols-1"> 
           <div className="flex justify-center items-center"> {data.title}</div> 
            <div className="flex justify-center items-center">{data.nombre}</div>
            </h2>
            
           </li>
        ))}
      </ul>
    </div>
  );
}

export default Info;
