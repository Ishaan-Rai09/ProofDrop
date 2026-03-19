"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useDeliveryContract } from "@/hooks/useContract";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { createDelivery, updateStatus, confirmDelivery } = useDeliveryContract();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Create Form
  const [cDeliveryId, setCDeliveryId] = useState("");
  const [cReceiver, setCReceiver] = useState("");
  const [cAgent, setCAgent] = useState("");

  // Update Form
  const [uDeliveryId, setUDeliveryId] = useState("");
  const [uStatus, setUStatus] = useState("Picked Up");

  // Confirm Form
  const [confDeliveryId, setConfDeliveryId] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    try {
      const tx = await createDelivery(cDeliveryId, cReceiver, cAgent);
      setSuccess(`Delivery created! TX: ${tx}`);
    } catch (err: any) {
      setError(err.message || "Failed to create delivery");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    try {
      const tx = await updateStatus(uDeliveryId, uStatus);
      setSuccess(`Status updated to ${uStatus}! TX: ${tx}`);
    } catch (err: any) {
      setError(err.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    try {
      const tx = await confirmDelivery(confDeliveryId);
      setSuccess(`Delivery confirmed! TX: ${tx}`);
    } catch (err: any) {
      setError(err.message || "Failed to confirm delivery");
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Please connect your wallet</h2>
        <p className="text-gray-400">You need to connect your wallet to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400">Manage deliveries safely on the blockchain.</p>
      </div>

      {error && <div className="p-4 bg-red-900/30 text-red-400 border border-red-800 rounded">{error}</div>}
      {success && <div className="p-4 bg-green-900/30 text-green-400 border border-green-800 rounded">{success}</div>}

      <div className="grid md:grid-cols-2 gap-8 pt-4">
        {/* Create Delivery */}
        <section className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-[#C7A36F]">Create Delivery</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Delivery ID</label>
              <input required value={cDeliveryId} onChange={e => setCDeliveryId(e.target.value)} type="text" className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A36F]" placeholder="PKG-001" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm text-gray-400">Receiver Address</label>
                <button type="button" onClick={() => address && setCReceiver(address)} className="text-xs text-[#C7A36F] hover:underline">Use My Wallet (Demo)</button>
              </div>
              <input required value={cReceiver} onChange={e => setCReceiver(e.target.value)} type="text" className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A36F]" placeholder="0x..." />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm text-gray-400">Delivery Agent Address</label>
                <button type="button" onClick={() => address && setCAgent(address)} className="text-xs text-[#C7A36F] hover:underline">Use My Wallet (Demo)</button>
              </div>
              <input required value={cAgent} onChange={e => setCAgent(e.target.value)} type="text" className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A36F]" placeholder="0x..." />
            </div>
            <button disabled={loading} type="submit" className="w-full py-2 bg-[#C7A36F] text-black font-medium rounded hover:bg-[#b08d5c] disabled:opacity-50 flex items-center justify-center">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create"}
            </button>
          </form>
        </section>

        <div className="space-y-8">
          {/* Update Status */}
          <section className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-[#C7A36F]">Update Status</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Delivery ID</label>
                <input required value={uDeliveryId} onChange={e => setUDeliveryId(e.target.value)} type="text" className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A36F]" placeholder="PKG-001" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">New Status</label>
                <select value={uStatus} onChange={e => setUStatus(e.target.value)} className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C7A36F]">
                  <option value="Picked Up">Picked Up</option>
                  <option value="In Transit">In Transit</option>
                </select>
              </div>
              <button disabled={loading} type="submit" className="w-full py-2 bg-transparent border border-[#C7A36F] text-[#C7A36F] font-medium rounded hover:bg-[#C7A36F]/10 disabled:opacity-50 flex items-center justify-center">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update"}
              </button>
            </form>
          </section>

          {/* Confirm Delivery */}
          <section className="bg-[#1a1c1a] border border-[#2E7D32]/30 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-[#2E7D32]">Confirm Handover</h2>
            <p className="text-sm text-gray-400 mb-4">Receiver signs transaction to verify actual drop-off.</p>
            <form onSubmit={handleConfirm} className="space-y-4">
              <div>
                <input required value={confDeliveryId} onChange={e => setConfDeliveryId(e.target.value)} type="text" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#2E7D32]" placeholder="PKG-001" />
              </div>
              <button disabled={loading} type="submit" className="w-full py-2 bg-[#2E7D32] text-white font-medium rounded hover:bg-[#206023] disabled:opacity-50 flex items-center justify-center">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign & Confirm"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}