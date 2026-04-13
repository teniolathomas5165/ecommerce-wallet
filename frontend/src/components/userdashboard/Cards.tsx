// // pages/dashboard/CardsPage.tsx
// const CARDS = [
//   {
//     id: 1,
//     type: 'Visa',
//     number: '**** **** **** 4532',
//     holder: 'John Doe',
//     expiry: '12/26',
//     balance: 1_250_000,
//     color: 'from-blue-600 to-blue-800',
//     accent: '#3b82f6',
//   },
//   {
//     id: 2,
//     type: 'Mastercard',
//     number: '**** **** **** 7891',
//     holder: 'John Doe',
//     expiry: '08/25',
//     balance: 480_500,
//     color: 'from-orange-500 to-red-600',
//     accent: '#f97316',
//   },
//   {
//     id: 3,
//     type: 'Visa',
//     number: '**** **** **** 1123',
//     holder: 'John Doe',
//     expiry: '03/27',
//     balance: 3_200_000,
//     color: 'from-emerald-500 to-teal-700',
//     accent: '#10b981',
//   },
// ];

// const RECENT_CARD_TRANSACTIONS = [
//   { id: 1, merchant: 'Apple Store', category: 'Shopping', amount: -129_000, date: '2 hours ago', icon: '🍎' },
//   { id: 2, merchant: 'Netflix', category: 'Entertainment', amount: -4_600, date: 'Yesterday', icon: '🎬' },
//   { id: 3, merchant: 'Bolt Food', category: 'Food & Dining', amount: -8_200, date: '2 days ago', icon: '🍔' },
//   { id: 4, merchant: 'Salary Credit', category: 'Income', amount: 450_000, date: '5 days ago', icon: '💼' },
//   { id: 5, merchant: 'MTN Airtime', category: 'Utilities', amount: -5_000, date: '6 days ago', icon: '📱' },
// ];

// const formatCurrency = (n: number) =>
//   new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(Math.abs(n));

// const Cards = () => {
//   return (
//     <div className="space-y-8">
//       {/* Cards grid */}
//       <div>
//         <div className="flex items-center justify-between mb-5">
//           <h2 className="text-lg font-semibold text-white">My Cards</h2>
//           <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2">
//             <span>+</span> Add New Card
//           </button>
//         </div>

//         <div className="grid grid-cols-3 gap-5">
//           {CARDS.map((card) => (
//             <div
//               key={card.id}
//               className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-200`}
//             >
//               <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
//               <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full -ml-14 -mb-14" />
//               <div className="relative z-10">
//                 <div className="flex items-center justify-between mb-8">
//                   <span className="text-white/80 text-sm font-medium">{card.type}</span>
//                   <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm">💳</span>
//                   </div>
//                 </div>
//                 <p className="text-white text-lg font-mono tracking-widest mb-6">{card.number}</p>
//                 <div className="flex items-end justify-between">
//                   <div>
//                     <p className="text-white/60 text-xs mb-1">Card Holder</p>
//                     <p className="text-white text-sm font-semibold">{card.holder}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-white/60 text-xs mb-1">Expires</p>
//                     <p className="text-white text-sm font-semibold">{card.expiry}</p>
//                   </div>
//                 </div>
//                 <div className="mt-4 pt-4 border-t border-white/20">
//                   <p className="text-white/60 text-xs mb-1">Balance</p>
//                   <p className="text-white text-xl font-bold">{formatCurrency(card.balance)}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Stats row */}
//       <div className="grid grid-cols-4 gap-4">
//         {[
//           { label: 'Total Limit', value: '₦10,000,000', icon: '🏦', color: 'text-blue-400' },
//           { label: 'Used Credit', value: '₦4,930,500', icon: '📊', color: 'text-orange-400' },
//           { label: 'Available', value: '₦5,069,500', icon: '✅', color: 'text-emerald-400' },
//           { label: 'Cashback', value: '₦12,300', icon: '🎁', color: 'text-purple-400' },
//         ].map((stat) => (
//           <div key={stat.label} className="bg-[#0f1629] border border-gray-800/50 rounded-2xl p-5">
//             <div className="flex items-center gap-3 mb-3">
//               <span className="text-2xl">{stat.icon}</span>
//               <p className="text-sm text-gray-400">{stat.label}</p>
//             </div>
//             <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Recent card transactions */}
//       <div className="bg-[#0f1629] border border-gray-800/50 rounded-2xl p-6">
//         <div className="flex items-center justify-between mb-5">
//           <h3 className="text-lg font-semibold text-white">Recent Card Activity</h3>
//           <select className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-gray-300 focus:outline-none">
//             <option>All Cards</option>
//             <option>**** 4532</option>
//             <option>**** 7891</option>
//             <option>**** 1123</option>
//           </select>
//         </div>
//         <div className="space-y-1">
//           {RECENT_CARD_TRANSACTIONS.map((txn) => (
//             <div key={txn.id} className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-800/30 transition-colors">
//               <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-lg">
//                 {txn.icon}
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-white">{txn.merchant}</p>
//                 <p className="text-xs text-gray-500">{txn.category} · {txn.date}</p>
//               </div>
//               <span className={`font-semibold text-sm ${txn.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
//                 {txn.amount > 0 ? '+' : '-'}{formatCurrency(txn.amount)}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cards;

// pages/dashboard/CardsPage.tsx
// "use client";
// import React, {useState} from 'react'
// import { useCards } from "../../context/CardContext";
// import type { CardType, CreateCardPayload } from '../../types/cards_types'




// type NewCardForm = CreateCardPayload & {
//   number?: string;
//   expiry?: string;
// };


// const formatCurrency = (n: number) =>
//   new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     maximumFractionDigits: 0,
//   }).format(Math.abs(n));

// const Cards = () => {
//   const {
//     cards,
//     cardsLoading,
//     stats,
//     transactions,
//     transactionsLoading,
//     cardActionLoading,
//     activeFilters,
//     setFilters,
//     createCard,
//     freezeCard,
//     unfreezeCard,
//   } = useCards();

//   const [showAddModal, setShowAddModal] = useState(false)
//   const [newCard, setNewCard] = useState<NewCardForm>({
//   card_type: "VISA",
//   card_category: "VIRTUAL",
//   holder_name: "",
//   number: "",
//   expiry: "",
// });

//   // ── Stats row config ─────────────────────────────────────────────────────
//   const statsRow = [
//     { label: "Total Limit",  value: stats ? formatCurrency(stats.total_limit)  : "—", icon: "🏦", color: "text-blue-400"    },
//     { label: "Used Credit",  value: stats ? formatCurrency(stats.used_credit)  : "—", icon: "📊", color: "text-orange-400"  },
//     { label: "Available",    value: stats ? formatCurrency(stats.available)    : "—", icon: "✅", color: "text-emerald-400" },
//     { label: "Cashback",     value: stats ? formatCurrency(stats.cashback)     : "—", icon: "🎁", color: "text-purple-400"  },
//   ];

//   return (
//     <div className="space-y-8">

//       {/* ── Cards grid ──────────────────────────────────────────────────── */}
//       <div>
//         <div className="flex items-center justify-between mb-5">
//           <h2 className="text-lg font-semibold text-white">My Cards</h2>
//           <button
//             onClick={() =>
//               createCard({
//                 card_type: "VISA",
//                 card_category: "VIRTUAL",
//                 holder_name: "John Doe",
//                 color_gradient: "from-blue-600 to-blue-800",
//                 accent_color: "#3b82f6",
//               })
//             }
//             className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2"
//           >
//             <span>+</span> Add New Card
//           </button>
//         </div>

//         {cardsLoading ? (
//           <div className="grid grid-cols-3 gap-5">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="h-52 rounded-2xl bg-gray-800/50 animate-pulse"
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-3 gap-5">
//             {cards.map((card) => {
//               const actionInProgress = cardActionLoading[card.id];
//               return (
//                 <div
//                   key={card.id}
//                   className={`bg-gradient-to-br ${card.color_gradient} rounded-2xl p-6 relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-200`}
//                 >
//                   {/* Decorative circles */}
//                   <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
//                   <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full -ml-14 -mb-14" />

//                   <div className="relative z-10">
//                     {/* Card header */}
//                     <div className="flex items-center justify-between mb-8">
//                       <span className="text-white/80 text-sm font-medium">{card.card_type}</span>
//                       <div className="flex items-center gap-2">
//                         {/* Freeze / unfreeze toggle */}
//                         <button
//                           disabled={!!actionInProgress || card.status === "BLOCKED"}
//                           onClick={() =>
//                             card.status === "FROZEN"
//                               ? unfreezeCard(card.id)
//                               : freezeCard(card.id)
//                           }
//                           className="text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-lg transition-colors disabled:opacity-40"
//                         >
//                           {actionInProgress === "freezing"   ? "Freezing…"   :
//                            actionInProgress === "unfreezing" ? "Unfreezing…" :
//                            card.status === "FROZEN"          ? "❄️ Frozen"    : "Freeze"}
//                         </button>
//                         <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//                           <span className="text-white text-sm">💳</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Card number */}
//                     <p className="text-white text-lg font-mono tracking-widest mb-6">
//                       **** **** **** {card.last_four}
//                     </p>

//                     {/* Holder + expiry */}
//                     <div className="flex items-end justify-between">
//                       <div>
//                         <p className="text-white/60 text-xs mb-1">Card Holder</p>
//                         <p className="text-white text-sm font-semibold">{card.holder_name}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-white/60 text-xs mb-1">Expires</p>
//                         <p className="text-white text-sm font-semibold">{card.expiry_display}</p>
//                       </div>
//                     </div>

//                     {/* Balance */}
//                     <div className="mt-4 pt-4 border-t border-white/20">
//                       <p className="text-white/60 text-xs mb-1">Balance</p>
//                       <p className="text-white text-xl font-bold">
//                         {formatCurrency(card.balance)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* ── Stats row ───────────────────────────────────────────────────── */}
//       <div className="grid grid-cols-4 gap-4">
//         {statsRow.map((stat) => (
//           <div key={stat.label} className="bg-[#0f1629] border border-gray-800/50 rounded-2xl p-5">
//             <div className="flex items-center gap-3 mb-3">
//               <span className="text-2xl">{stat.icon}</span>
//               <p className="text-sm text-gray-400">{stat.label}</p>
//             </div>
//             <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* ── Recent card activity ─────────────────────────────────────────── */}
//       <div className="bg-[#0f1629] border border-gray-800/50 rounded-2xl p-6">
//         <div className="flex items-center justify-between mb-5">
//           <h3 className="text-lg font-semibold text-white">Recent Card Activity</h3>

//           {/* Card filter dropdown — maps to ?card_last_four= filter */}
//           <select
//             className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-gray-300 focus:outline-none"
//             value={activeFilters.card_last_four ?? ""}
//             onChange={(e) =>
//               setFilters({
//                 card_last_four: e.target.value || undefined,
//               })
//             }
//           >
//             <option value="">All Cards</option>
//             {cards.map((card) => (
//               <option key={card.id} value={card.last_four}>
//                 **** {card.last_four}
//               </option>
//             ))}
//           </select>
//         </div>

//         {transactionsLoading ? (
//           <div className="space-y-3">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div key={i} className="h-14 rounded-xl bg-gray-800/40 animate-pulse" />
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-1">
//             {transactions.map((txn) => (
//               <div
//                 key={txn.id}
//                 className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-800/30 transition-colors"
//               >
//                 <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-lg">
//                   {txn.merchant_icon || "💳"}
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium text-white">{txn.merchant}</p>
//                   <p className="text-xs text-gray-500">
//                     {txn.category.replace("_", " ")} · {new Date(txn.created_at).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <span
//                   className={`font-semibold text-sm ${
//                     txn.is_credit ? "text-emerald-400" : "text-red-400"
//                   }`}
//                 >
//                   {txn.is_credit ? "+" : "-"}
//                   {formatCurrency(txn.amount)}
//                 </span>
//               </div>
//             ))}

//             {transactions.length === 0 && (
//               <p className="text-center text-gray-500 text-sm py-6">No transactions found.</p>
//             )}
//           </div>
//         )}
//       </div>

//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-[#0f1629] border border-gray-800 rounded-2xl p-6 w-full max-w-md">
//             <h3 className="text-lg font-semibold text-white mb-5">Add New Card</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-xs text-gray-400 mb-1 block">Card Type</label>
//                 <select
//                   value={newCard.type}
//                   onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
//                   className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
//                 >
//                   <option value="">Select type</option>
//                   <option value="Visa">Visa</option>
//                   <option value="Mastercard">Mastercard</option>
//                   <option value="Verve">Verve</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 mb-1 block">Card Number</label>
//                 <input
//                   type="text"
//                   placeholder="**** **** **** 0000"
//                   value={newCard.number}
//                   onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
//                   className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 mb-1 block">Card Holder Name</label>
//                 <input
//                   type="text"
//                   placeholder="John Doe"
//                   value={newCard.holder}
//                   onChange={(e) => setNewCard({ ...newCard, holder: e.target.value })}
//                   className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 mb-1 block">Expiry Date</label>
//                 <input
//                   type="text"
//                   placeholder="MM/YY"
//                   value={newCard.expiry}
//                   onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
//                   className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
//                 />
//               </div>
//             </div>
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => setShowAddModal(false)}
//                 className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-xl transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddCard}
//                 className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-xl transition-colors"
//               >
//                 Add Card
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default Cards;


import  { useState } from "react";
import { useCards } from "../../context/CardContext";
import type { CardType, CreateCardPayload, AddCardViaPaystackPayload  } from "../../types/cards_types";

type NewCardForm = CreateCardPayload & {
  number?: string;
  expiry?: string;
};

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Math.abs(n));

const Cards = () => {
  const {
    cards,
    cardsLoading,
    stats,
    transactions,
    transactionsLoading,
    cardActionLoading,
    activeFilters,
    setFilters,
    addCardViaPaystack,
    freezeCard,
    unfreezeCard,
  } = useCards();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const [newCard, setNewCard] = useState<NewCardForm>({
    card_type: "VISA",
    card_category: "VIRTUAL",
    holder_name: "",
    number: "",
    expiry: "",
  });

const handleAddCard = async () => {
  if (!(window as any).PaystackPop) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    }).catch(() => {
      alert("Failed to load Paystack. Check your internet connection.");
      return;
    });
  }

  if (!(window as any).PaystackPop) return;

  if (!newCard.holder_name.trim()) {
    alert("Please enter the card holder name.");
    return;
  }

  const handler = (window as any).PaystackPop.setup({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    email: "user@example.com",
    amount: 50 * 100,
    currency: "NGN",
    callback: (response: any) => {           // ✅ not async
      const payload: AddCardViaPaystackPayload = {
        reference: response.reference,
        card_type: newCard.card_type,
        holder_name: newCard.holder_name,
        card_category: newCard.card_category,
        color_gradient: newCard.color_gradient,
        accent_color: newCard.accent_color,
      };

      addCardViaPaystack(payload)
        .then((cardData) => {
          alert(`Card ****${cardData.last_four} added successfully!`);
          setShowAddModal(false);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to add card. Please try again.");
        });
    },
    onClose: () => console.log("Paystack modal closed"),
  });

  handler.openIframe();
};

  const statsRow = [
    {
      label: "Total Limit",
      value: stats ? formatCurrency(stats.total_limit) : "—",
      icon: "🏦",
      color: "text-blue-400",
    },
    {
      label: "Used Credit",
      value: stats ? formatCurrency(stats.used_credit) : "—",
      icon: "📊",
      color: "text-orange-400",
    },
    {
      label: "Available",
      value: stats ? formatCurrency(stats.available) : "—",
      icon: "✅",
      color: "text-emerald-400",
    },
    {
      label: "Cashback",
      value: stats ? formatCurrency(stats.cashback) : "—",
      icon: "🎁",
      color: "text-purple-400",
    },
  ];

  return (
  <div className="space-y-8">
    {/* Cards grid */}
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white">My Cards</h2>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-xl flex items-center gap-2"
        >
          <span>+</span> Add New Card
        </button>
      </div>

      {cardsLoading ? (
        <div className="grid grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-52 rounded-2xl bg-gray-800/50 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {(cards ?? []).map((card) => {
            const actionInProgress = cardActionLoading?.[card.id];

            return (
              <div
                key={card.id}
                className={`bg-gradient-to-br ${card.color_gradient} rounded-2xl p-6 relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-white/80 text-sm font-medium">
                      {card.card_type}
                    </span>

                    <button
                      disabled={!!actionInProgress || card.status === "BLOCKED"}
                      onClick={() =>
                        card.status === "FROZEN"
                          ? unfreezeCard(card.id)
                          : freezeCard(card.id)
                      }
                      className="text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-lg disabled:opacity-40"
                    >
                      {actionInProgress === "freezing"
                        ? "Freezing..."
                        : actionInProgress === "unfreezing"
                        ? "Unfreezing..."
                        : card.status === "FROZEN"
                        ? "❄ Frozen"
                        : "Freeze"}
                    </button>
                  </div>

                  <p className="text-white text-lg font-mono mb-6">
                    **** **** **** {card.last_four}
                  </p>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-white/60">Card Holder</p>
                      <p className="text-sm text-white font-semibold">
                        {card.holder_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-white/60">Expires</p>
                      <p className="text-sm text-white font-semibold">
                        {card.expiry_display}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-xs text-white/60">Balance</p>
                    <p className="text-xl text-white font-bold">
                      {formatCurrency(card.balance)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>

    {/* Stats */}
    <div className="grid grid-cols-4 gap-4">
      {statsRow.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#0f1629] border border-gray-800/50 rounded-2xl p-5"
        >
          <p className="text-sm text-gray-400">{stat.label}</p>
          <p className={`text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>

    {/* Transactions Section */}
    <div className="bg-[#0f1629] border border-gray-800/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-white">
          Recent Card Activity
        </h3>

        {/* Card Filter */}
        <select
          value={activeFilters.card_last_four ?? ""}
          onChange={(e) =>
            setFilters({
              card_last_four: e.target.value || undefined,
            })
          }
          className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300"
        >
          <option value="">All Cards</option>

          {cards.map((card) => (
            <option key={card.id} value={card.last_four}>
              **** {card.last_four}
            </option>
          ))}
        </select>
      </div>

      {transactionsLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-14 rounded-xl bg-gray-800/40 animate-pulse"
            />
          ))}
        </div>
      ) : (transactions ?? []).length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">
          No transactions found.
        </p>
      ) : (
        <div className="space-y-1">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-800/30"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-lg">
                {txn.merchant_icon || "💳"}
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {txn.merchant}
                </p>

                <p className="text-xs text-gray-500">
                  {txn.category.replace("_", " ")} ·{" "}
                  {new Date(txn.created_at).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`font-semibold text-sm ${
                  txn.is_credit ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {txn.is_credit ? "+" : "-"}
                {formatCurrency(txn.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Add Card Modal */}
    {showAddModal && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="bg-[#0f1629] border border-gray-800 rounded-2xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-white mb-5">
            Add New Card
          </h3>

          <div className="space-y-4">
            <select
              value={newCard.card_type}
              onChange={(e) =>
                setNewCard({
                  ...newCard,
                  card_type: e.target.value as CardType,
                })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white"
            >
              <option value="VISA">Visa</option>
              <option value="MASTERCARD">Mastercard</option>
              <option value="VERVE">Verve</option>
            </select>

            <input
              placeholder="Card Holder Name"
              value={newCard.holder_name}
              onChange={(e) =>
                setNewCard({
                  ...newCard,
                  holder_name: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowAddModal(false)}
              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={handleAddCard}
              className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-xl"
            >
              Add Card
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)};
export default Cards