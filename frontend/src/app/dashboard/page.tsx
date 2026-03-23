"use client";

import { useState } from "react";
import { useDeliveryContract } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import { PlayCircle, PackagePlus, Truck, CheckSquare, Info, MapPin, Search, AlertCircle, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type DashboardTab = "sender" | "agent" | "receiver";
type TxState = {
  status: "idle" | "pending" | "success" | "error";
  msg: string;
  hash?: string;
};

export default function Dashboard() {
  const { isConnected, address, chain } = useAccount();
  const { createDelivery, updateStatus, confirmDelivery } = useDeliveryContract();

  const [activeTab, setActiveTab] = useState<DashboardTab>("sender");

  const [formData, setFormData] = useState({
    id: "", receiver: "", agent: "",
    statusId: "", status: "Picked Up",
    latitude: "37.7800", longitude: "-122.3800",
    confirmId: ""
  });

  const [addressSearch, setAddressSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // New Transaction State Indicator
  const [txState, setTxState] = useState<TxState>({ status: "idle", msg: "" });

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        });
      },
      (err) => alert("Could not fetch location: " + err.message)
    );
  };

  const handleSearchAddress = async () => {
    if (!addressSearch) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressSearch)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setFormData({
          ...formData,
          latitude: parseFloat(data[0].lat).toFixed(6),
          longitude: parseFloat(data[0].lon).toFixed(6),
        });
      } else {
        alert("Address not found. Please try adding more details like City or Pincode.");
      }
    } catch {
      alert("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const getErrorMessage = (error: unknown) => {
    if (typeof error === "object" && error !== null) {
      if ("message" in error && typeof error.message === "string") {
        if (error.message.includes("User denied") || error.message.includes("User rejected")) {
          return "Transaction was cancelled / rejected by user.";
        }
      }

      if ("shortMessage" in error && typeof error.shortMessage === "string") {
        return error.shortMessage;
      }
    }

    return "Transaction failed. Please check the contract requirements.";
  };

  // Wrapper for all blockchain transactions to control loading UI
  const handleTx = async (action: () => Promise<string>, successMsg: string) => {
    setTxState({ status: "pending", msg: "Please review and confirm the transaction in MetaMask..." });
    try {
      const hash = await action();
      setTxState({ status: "success", msg: successMsg, hash });
    } catch (error: unknown) {
      setTxState({ status: "error", msg: getErrorMessage(error) });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleTx(() => createDelivery(formData.id, formData.receiver, formData.agent), "Contract Initialize Request Sent!");
  };
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const packedStatus = `${formData.status}|${formData.latitude},${formData.longitude}`;
    await handleTx(() => updateStatus(formData.statusId, packedStatus), "Status GPS Broadcasted Successfully!");
  };
  
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleTx(() => confirmDelivery(formData.confirmId), "Receiver Cryptographic Signature applied!");
  };

  const useDemoData = () => {
    if (!address) return alert("Connect wallet first to use Demo Data");
    const newId = "PKG-" + Math.floor(Math.random() * 10000);
    setFormData({
      ...formData,
      id: newId,
      receiver: address, agent: address,
      statusId: newId, confirmId: newId,
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

  const tabs: Array<{ id: DashboardTab; label: string; icon: typeof PackagePlus }> = [
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
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-black text-[#C7A36F] shadow-sm" : "text-gray-400 hover:text-white"}`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Transaction Banner Notification UI */}
      {txState.status !== "idle" && (
        <div className={`mb-6 p-5 rounded-xl border flex items-start gap-4 transition-all animate-in fade-in slide-in-from-top-4 ${
          txState.status === "pending" ? "bg-blue-900/20 border-blue-500/50 text-blue-400" :
          txState.status === "success" ? "bg-green-900/20 border-green-500/50 text-green-400" :
          "bg-red-900/20 border-red-500/50 text-red-500"
        }`}>
          {txState.status === "pending" && <Loader2 className="w-6 h-6 animate-spin flex-shrink-0" />}
          {txState.status === "success" && <CheckCircle2 className="w-6 h-6 flex-shrink-0" />}
          {txState.status === "error" && <AlertCircle className="w-6 h-6 flex-shrink-0" />}
          
          <div className="flex-1">
            <h4 className="font-bold text-base mb-1">
              {txState.status === "pending" ? "Transaction Pending" : 
               txState.status === "success" ? "Transaction Successful!" : "Transaction Failed"}
            </h4>
            <p className="text-sm opacity-90">{txState.msg}</p>
            {txState.hash && (
              chain?.id === 80002 ? (
                <a 
                  href={`https://amoy.polygonscan.com/tx/${txState.hash}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs bg-black/30 px-3 py-1.5 rounded border border-green-500/30 hover:bg-black/50 transition-colors font-mono"
                >
                  View on Polygonscan <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <div className="mt-3 inline-flex items-center gap-2 text-xs bg-black/30 px-3 py-2 rounded border border-green-500/30 font-mono text-gray-300">
                  <span>Tx Hash: {txState.hash.slice(0,10)}...{txState.hash.slice(-8)}</span>
                  <span className="text-gray-500 bg-gray-900 px-2 py-0.5 rounded">See VS Code Terminal for Hardhat Logs</span>
                </div>
              )
            )}
          </div>
          <button onClick={() => setTxState({status: "idle", msg: ""})} className="opacity-50 hover:opacity-100 text-2xl leading-none">&times;</button>
        </div>
      )}

      <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
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
                <button type="submit" disabled={txState.status === "pending"} className="px-6 py-3 bg-[#C7A36F] text-black font-semibold rounded-lg hover:bg-[#b08d5c] disabled:opacity-50 transition-colors mt-4">
                  {txState.status === "pending" ? "Confirm in Wallet..." : "Deploy Contract"}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Package ID</label>
                    <input type="text" value={formData.statusId} onChange={e => setFormData({...formData, statusId: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-[#C7A36F] focus:outline-none transition font-mono" placeholder="PKG-..." required />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">New Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-[#C7A36F] focus:outline-none transition appearance-none">
                      <option value="Picked Up">Picked Up</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 p-5 border border-gray-800 rounded-xl bg-gray-950 space-y-4">
                  <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C7A36F]" /> Location Tracking
                  </h3>
                  
                  <div className="flex gap-2">
                    <button type="button" onClick={handleGetCurrentLocation} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg border border-gray-700 transition flex items-center justify-center gap-2 text-sm font-medium">
                      Use Device GPS
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={addressSearch} onChange={e => setAddressSearch(e.target.value)} className="flex-1 bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-[#C7A36F] focus:outline-none transition text-sm" placeholder="Enter Pincode, City, or Address..." />
                    <button type="button" onClick={handleSearchAddress} disabled={isSearching} className="bg-gray-800 hover:bg-gray-700 text-white px-4 rounded-lg border border-gray-700 transition flex items-center justify-center gap-2 min-w-[3rem]">
                      {isSearching ? <span className="animate-spin text-[#C7A36F]">?</span> : <Search className="w-4 h-4 text-[#C7A36F]" />}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <input type="text" value={formData.latitude} onChange={e => setFormData({...formData, latitude: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-gray-400 focus:border-[#C7A36F] focus:outline-none transition font-mono text-xs" placeholder="Lat" required />
                    </div>
                    <div>
                      <input type="text" value={formData.longitude} onChange={e => setFormData({...formData, longitude: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-gray-400 focus:border-[#C7A36F] focus:outline-none transition font-mono text-xs" placeholder="Lng" required />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={txState.status === "pending"} className="w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors mt-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {txState.status === "pending" ? "Confirm in Wallet..." : "Broadcast GPS Status On-Chain"}
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
                <button type="submit" disabled={txState.status === "pending"} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mt-4 disabled:opacity-50">
                  {txState.status === "pending" ? "Confirming in Web3..." : "Cryptographically Sign"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
