"use client";
import React, { useEffect, useState } from "react";

function Info() {
  
  const [product, setProduct] = useState<number>(0);
const [displayValue,setDisplayValue]=useState<number>(0);
  
  useEffect(() => {
    async function totalDebt() {
      try {
        console.log(process.env.NEXT_PUBLIC_API_URL);
        //  l'URL API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mydebt/total`);
        
        // mon api nestjs renvoie un chiffre
        const textData = await response.text();
        const target=Number(textData)
        setProduct(target);

let start=0;
const duration=1000;
const stepTime=10;
const increment=target/(duration/stepTime);
//animation
const interval= setInterval(()=>{
  start+=increment;
  if(start>=target){
    start=target;
    clearInterval(interval)
  }
  setDisplayValue(Math.floor(start));
},stepTime)

        //cry et catch gere les erreur
        
      } catch (err) {
        console.error("Erreur sur le montant de ma dette", err);
      }
    }
    totalDebt();
  }, []);
  //variation des couleurs en fonction du montant de la dettes
  const getColor=()=>{
    if(product===0) return "text-green-500";
    if(product > 50000) return "text-red-500";
      return "text-accent";
  }

  return (
    <div>
      <div className="grid grid-cols-1 items-center flex-1 flex justify-center lg:grid-cols-4 gap-10 mt-5 w-full">
        <div className="rounded-xl bg-white p-6 shadow-xl flex items-center justify-center">
          <h2 className="text-base grid grid-cols-1">
            <div className="flex justify-center items-center">
              Montant de mes dettes
            </div>
            <div className={`flex justify-center items-center text-2xl font-bold ${getColor()}`}>
              {displayValue}
            </div>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Info;

