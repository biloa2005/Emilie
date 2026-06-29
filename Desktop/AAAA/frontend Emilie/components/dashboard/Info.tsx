"use client";
import React, { useEffect, useState } from "react";
// Optionnel : Importe des icônes de lucide-react si tu les as, sinon des SVG natifs sont intégrés ci-dessous
import { Wallet, Users, Package, AlertTriangle } from "lucide-react";

function Info() {
  const [myDebt, setMyDebt] = useState<number>(0);
  const [displayDebt, setDisplayDebt] = useState<number>(0);
  const [clientDebts, setClientDebts] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [damagedProducts, setDamagedProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    async function loadDashboardData() {
      try {
        
        // Chargement simultané de toutes les routes de l'API
        const [myDebtRes, productsRes, debtRes, damageRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/mydebt/total`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/produit/total`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/debt/total`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/damage/total`),
        ]);

        const myDebtVal = Number(await myDebtRes.text());
        const productsVal = Number(await productsRes.text());
        const clientDebtsVal = Number(await debtRes.text());
        const damageVal = Number(await damageRes.text());

        // Mise à jour des états
        setMyDebt(myDebtVal);
        setTotalProducts(productsVal);
        setClientDebts(clientDebtsVal);
        setDamagedProducts(damageVal);
        setLoading(false);

        // Animation du compteur de "Mes Dettes"
        let start = 0;
        const duration = 800; // Animation légèrement plus rapide et fluide
        const stepTime = 15;
        const increment = myDebtVal / (duration / stepTime);

        intervalId = setInterval(() => {
          start += increment;
          if (start >= myDebtVal) {
            start = myDebtVal;
            clearInterval(intervalId);
          }
          setDisplayDebt(Math.floor(start));
        }, stepTime);

      } catch (err) {
        console.error("Erreur lors du chargement des données ERP", err);
        setLoading(false);
      }
    }

    loadDashboardData();

    // Nettoyage de l'intervalle si le composant est démonté
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Détermination de la couleur de la dette personnelle
  const getMyDebtColor = () => {
    if (myDebt === 0) return "text-success";
    if (myDebt > 50000) return "text-error";
    return "text-warning";
  };

  // Formatage des nombres pour l'affichage (ex: 50 000 FCFA)
  const formatNumber = (val: number) => {
    return new Intl.NumberFormat("fr-FR").format(val);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      {/* Conteneur Grid Responsive adaptatif */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        
        {/* Carte 1 : Montant de mes dettes */}
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-200">
          <div className="card-body flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-base-content/70 uppercase tracking-wider">
                Mes Dettes
              </p>
              <h3 className={`text-3xl font-bold tracking-tight ${getMyDebtColor()}`}>
                {formatNumber(displayDebt)} <span className="text-sm font-normal">XAF</span>
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-error/10 text-error">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Carte 2 : Dettes Clients */}
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-200">
          <div className="card-body flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-base-content/70 uppercase tracking-wider">
                Créances Clients
              </p>
              <h3 className="text-3xl font-bold tracking-tight text-info">
                {formatNumber(clientDebts)} <span className="text-sm font-normal">XAF</span>
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-info/10 text-info">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Carte 3 : Nombre de Produits */}
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-200">
          <div className="card-body flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-base-content/70 uppercase tracking-wider">
                Stock Produits
              </p>
              <h3 className="text-3xl font-bold tracking-tight text-primary">
                {formatNumber(totalProducts)}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Carte 4 : Produits Avariés / Pertes */}
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-200">
          <div className="card-body flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-base-content/70 uppercase tracking-wider">
                Pertes & Avaries
              </p>
              <h3 className="text-3xl font-bold tracking-tight text-error">
                {formatNumber(damagedProducts)}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-error/10 text-error">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Info;
