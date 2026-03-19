"use client";

import { useState } from "react";
import { useDeliveryContract } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import { PlayCircle, PackagePlus, Truck, CheckSquare, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { isConnected, address } = useAccount();
  const { createDelivery, updateStatus, confirmDelivery } = useDeliveryContract();

  const [activeTab, setActiveTab] = useState<"sender" | "agent" | "receiver">("sender");

  const [formData, setFormData] = useState({
    id: "", receiver: "", agent: "",
    statusId: "", status: "Picked Up",
    latitude: "37.7800", longitude: "-122.3800",
    confirmId: ""
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDelivery(formData.id, formData.receiver, formData.agent);
  };
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const packedStatus = `${formData.status}|${formData.latitude},${formData.longitude}`;
    await updateStatus(formData.statusId, packedStatus);
  };
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    await confirmDelivery(formData.confirmId);
  };

  const useDemoData = () => {
    if (!address) return alert("Connect wallet first to use Demo Data");
    setFormData({
      ...formData,
      id: "PKG-" + Math.floor(Math.random() * 10000),
      receiver: address, agent: address,
      statusId: "PKG-1234", confirmId: "PKG-1234",
      latitude: "37.7800", longitude: "-122.3800"
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <PackagePlus className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold">Access Restricted</h2>
          <p className="text-gray-400">Please connect your Web3 wallet to access the Command Center.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "sender", label: "Shipper Portal", icon: PackagePlus },
    { id: "agent", label: "Agent Portal", icon: Truck },
    { id: "receiver", label: "Receiver Portal", icon: CheckSquare },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Command Center</h1>
          <p className="text-gray-400">Manage smart contracts, dispatch agents, and sign for deliveries.</p>
        </div>
        <button 
          onClick={useDemoData}
          className="flex items-center gap-2 px-4 py-2 bg-[#2a2418] text-[#C7A36F] border border-[#3d3322] rounded-lg hover:bg-[#3d3322] transition-colors text-sm font-medium"
        >
          <PlayCircle className="w-4 h-4" />
          Seed Demo Data
        </button>
      </div>

      <div className="flex gap-2 p-1 bg-gray-900 border border-gray-800 rounded-xl mb-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-black text-[#C7A36F] shadow-sm" : "text-gray-400 hover:text-white"}`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A36F] opacity-[0.03] blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {activeTab === "sender" && (
            <motion.div key="sender" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-6 border-b border-gray-800 pb-6">
                <h2 className="text-xl font-bold flex items-center gap-2"><PackagePlus /> Initialize Delivery</h2>
                <p className="text-sm text-gray-500 mt-1">Deploy a new package tracking contract onto Polygon.</p>
              </div>
              <form onSubmit={handleCreate} className="space-y-5 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Package ID</label>
                    <input type="text" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-[#C7A36F] focus:outline-none transition font-mono" placeholder="PKG-..." required />
                  </div>
                  <div className="hidden md:block"></div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Agent Address (0x)</label>
                    <input type="text" value={formData.agent} onChange={e => setFormData({...formData, agent: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-[#C7A36F] focus:outline-none transition font-mono text-sm" placeholder="0x..." required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Receiver Address (0x)</label>
                    <input type="text" value={formData.receiver} onChange={e => setFormData({...formData, receiver: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-[#C7A36F] focus:outline-none transition font-mono text-sm" placeholder="0x..." required />
                  </div>
                </div>
                <button type="submit" className="px-6 py-3 bg-[#C7A36F] text-black font-semibold rounded-lg hover:bg-[#b08d5c] transition-colors mt-4">
                  Deploy Contract
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === "agent" && (
            <motion.div key="agent" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
               <div className="mb-6 border-b border-gray-800 pb-6">
                <h2 className="text-xl font-bold flex items-center gap-2"><Truck /> Agent Operations</h2>
                <p className="text-sm text-gray-500 mt-1">Update the GPS & transit status of active deliveries.</p>
              </div>
              <form onSubmit={handleUpdate} className="space-y-5 max-w-xl">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Package ID</label>
                  <input type="text" value={formData.statusId} onChange={e => setFormData({...formData, statusId: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-[#C7A36F] focus:outline-none transition font-mono" placeholder="PKG-..." required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">New Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-[#C7A36F] focus:outline-none transition appearance-none">
                    <option value="Picked Up">Picked Up</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Latitude</label>
                    <input type="text" value={formData.latitude} onChange={e => setFormData({...formData, latitude: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-[#C7A36F] focus:outline-none transition font-mono text-sm" placeholder="37.7749" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Longitude</label>
                    <input type="text" value={formData.longitude} onChange={e => setFormData({...formData, longitude: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-[#C7A36F] focus:outline-none transition font-mono text-sm" placeholder="-122.4194" required />
                  </div>
                </div>
                <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors mt-4">
                  Broadcast Status
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === "receiver" && (
            <motion.div key="receiver" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
               <div className="mb-6 border-b border-gray-800 pb-6">
                <h2 className="text-xl font-bold flex items-center gap-2"><CheckSquare /> Sign for Delivery</h2>
                <p className="text-sm text-gray-500 mt-1">Cryptographically sign to release agent liability & complete tracking.</p>
              </div>
              <form onSubmit={handleConfirm} className="space-y-5 max-w-xl">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Package ID</label>
                  <input type="text" value={formData.confirmId} onChange={e => setFormData({...formData, confirmId: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-[#C7A36F] focus:outline-none transition font-mono" placeholder="PKG-..." required />
                </div>
                <div className="bg-yellow-900/20 border border-yellow-900/50 p-4 rounded-lg flex gap-3 text-yellow-500/80 text-sm">
                  <Info className="w-5 h-5 flex-shrink-0" />
                  <p>By signing this transaction, you verify that the parcel arrived securely and in expected condition.</p>
                </div>
                <button type="submit" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mt-4">
                  Cryptographically Sign
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

