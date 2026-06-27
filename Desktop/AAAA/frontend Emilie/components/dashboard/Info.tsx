"use client";
import React, { useEffect, useState } from "react";

function Info() {
  
  const [product, setProduct] = useState<number>(0);

  
  useEffect(() => {
    async function totalDebt() {
      try {
        //  l'URL API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mydebt/total`);
        
        // mon api nestjs renvoie un chiffre
        const textData = await response.text();
        setProduct(Number(textData));
console.log(product)

        //cry et catch gere les erreur
        
      } catch (err) {
        console.error("Erreur sur le montant de ma dette", err);
      }
    }
    totalDebt();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 items-center flex-1 flex justify-center lg:grid-cols-4 gap-10 mt-5 w-full">
        <div className="rounded-xl bg-white p-6 shadow-xl flex items-center justify-center">
          <h2 className="text-base grid grid-cols-1">
            <div className="flex justify-center items-center">
              Montant de mes dettes
            </div>
            <div className="flex justify-center items-center text-accent text-2xl font-bold">
              {product}
            </div>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Info;

