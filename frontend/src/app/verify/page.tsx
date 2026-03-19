"use client";

import { useState } from "react";
import { useDeliveryInfo } from "@/hooks/useContract";
import { Search, CheckCircle2, CircleDashed } from "lucide-react";
import { motion } from "framer-motion";

export default function Verify() {
  const [searchInput, setSearchInput] = useState("");
  const [deliveryId, setDeliveryId] = useState("");

  const { data: delivery, isLoading, isError, error } = useDeliveryInfo(deliveryId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchInput) {
      setDeliveryId(searchInput);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Public Verification</h1>
        <p className="text-gray-400">Enter a delivery ID to view its immutable history and proof on the blockchain.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input 
          type="text" 
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Enter Delivery ID (e.g. PKG-001)" 
          className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C7A36F] transition-colors"
        />
        <button type="submit" className="bg-[#C7A36F] text-black px-6 rounded-lg font-medium hover:bg-[#b08d5c] active:scale-95 transition-all flex gap-2 items-center">
          <Search className="w-5 h-5" />
          Verify
        </button>
      </form>

      {isLoading && (
        <div className="text-center py-12 text-gray-500 animate-pulse">
          Searching blockchain network...
        </div>
      )}

      {isError && !isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-900/20 border border-red-900/50 p-6 rounded-xl text-center"
        >
          <p className="text-red-400">Delivery not found or an error occurred.</p>
          <p className="text-sm text-red-500/70 mt-2">
            Details: {error?.message ? error.message.split('\n')[0] : "Check if you are on the correct network (Localhost vs Polygon Amoy) and the contract address is correct."}
          </p>
        </motion.div>
      )}

      {delivery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl mt-8"
        >
          <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-950">
            <div>
              <p className="text-sm text-gray-500 mb-1">Delivery ID</p>
              <h2 className="text-2xl font-mono font-bold text-[#C7A36F]">{delivery.deliveryId}</h2>
            </div>
            
            <div className={`px-4 py-2 rounded-full text-sm font-bold border ${delivery.isConfirmed ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-yellow-900/30 text-yellow-500 border-yellow-800'}`}>
              {delivery.status}
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-500 mb-2">Sender</p>
                <p className="font-mono text-sm break-all">{delivery.sender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Agent</p>
                <p className="font-mono text-sm break-all">{delivery.agent}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Receiver</p>
                <p className="font-mono text-sm break-all">{delivery.receiver}</p>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 mt-8">
              <h3 className="text-lg font-semibold mb-6">Delivery Timeline</h3>
              
              <div className="space-y-6">
                <TimelineItem 
                  title="Delivery Created" 
                  date={new Date(Number(delivery.timestamp) * 1000).toLocaleString()} 
                  completed={true} 
                  delay={0.1}
                />
                <TimelineItem 
                  title="Handed to Agent" 
                  date={delivery.status === "Picked Up" || delivery.status === "In Transit" || delivery.isConfirmed ? new Date(Number(delivery.timestamp) * 1000).toLocaleString() : ""} 
                  completed={delivery.status === "Picked Up" || delivery.status === "In Transit" || delivery.isConfirmed} 
                  delay={0.2}
                />
                <TimelineItem 
                  title="In Transit" 
                  date={delivery.status === "In Transit" || delivery.isConfirmed ? new Date(Number(delivery.timestamp) * 1000).toLocaleString() : ""} 
                  completed={delivery.status === "In Transit" || delivery.isConfirmed} 
                  delay={0.3}
                />
                <TimelineItem 
                  title="Securely Delivered (Signed)" 
                  date={delivery.isConfirmed ? new Date(Number(delivery.timestamp) * 1000).toLocaleString() : ""} 
                  completed={delivery.isConfirmed} 
                  isFinal
                  delay={0.4}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function TimelineItem({ title, date, completed, isFinal = false, delay }: { title: string, date: string, completed: boolean, isFinal?: boolean, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-start gap-4"
    >
      <div className="flex flex-col items-center">
        {completed ? (
          <CheckCircle2 className={`w-6 h-6 ${isFinal ? 'text-green-500' : 'text-[#C7A36F]'}`} />
        ) : (
          <CircleDashed className="w-6 h-6 text-gray-600" />
        )}
        {!isFinal && <div className={`w-0.5 h-10 my-1 ${completed ? 'bg-[#C7A36F]' : 'bg-gray-800'}`}></div>}
      </div>
      <div className="pt-0.5">
        <p className={`font-medium ${completed ? 'text-white' : 'text-gray-500'}`}>{title}</p>
        {date && <p className="text-sm text-gray-500 mt-1">{date}</p>}
      </div>
    </motion.div>
  );
}