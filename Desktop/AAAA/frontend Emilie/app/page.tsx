"use client";
import React, { useEffect, useState } from "react";
//MONTANT MA  DETTE

export default function Home() {
  const [product, setProduct] = useState<number>(0);
useEffect(() => {
  async function totalDebt() {
    try {
     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mydebt/total`);
        const data = await response.text();
        setProduct(Number(data));
        
    } catch (err) {
      console.error("erreur sur le montant de ma dette", err);
    }
  }
  totalDebt();
}, []);
  return (
  
    <div className="p-10">
      <button className="btn btn-primary">Mon bouton DaisyUI</button>
      <div>{product}</div>
    </div>
  


  );
}
