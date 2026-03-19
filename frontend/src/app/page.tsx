"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } } };  
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] text-center py-10 relative overflow-hidden">
      
      {/* Decorative gradient glow behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C7A36F]/5 blur-[120px] rounded-full point-events-none z-[-1]" />

      <motion.div 
        className="max-w-5xl mx-auto px-4 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-sm text-gray-400 mb-8 mx-auto">
          <span className="w-2 h-2 rounded-full bg-[#C7A36F] animate-pulse" />
          Blockchain Verified Delivery
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-tight"
        >
          <span className="text-white">Trustless Delivery</span>
          <br />
          <span className="text-[#C7A36F]">Verification.</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants} 
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          A decentralized system where every delivery action is cryptographically recorded on the blockchain, eliminating disputes and fake delivery claims.
        </motion.p>

        <motion.div 
          variants={itemVariants} 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-24"
        >
          <Link 
            href="/dashboard" 
            className="px-8 py-3.5 bg-[#C7A36F] text-black font-semibold rounded-lg hover:bg-[#b08d5c] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(199,163,111,0.15)] hover:shadow-[0_0_30px_rgba(199,163,111,0.3)]"
          >
            Open Dashboard
          </Link>
          <Link 
            href="/verify" 
            className="px-8 py-3.5 bg-gray-900 border border-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Verify a Delivery
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <FeatureCard 
            icon={<Package className="w-6 h-6 text-[#C7A36F]" />}
            title="1. Create Orders"
            description="Generate a unique on-chain ID for your package locking in the sender and receiver rules."
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-[#C7A36F]" />}
            title="2. Live Tracking"
            description="Delivery agents update the status in transit, secured immutably on the ledger."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6 text-[#C7A36F]" />}
            title="3. Cryptographic Proof"
            description="The receiver signs the final handover with their own wallet. Nobody can fake the drop."
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:bg-gray-800/80 transition-colors group">
      <div className="w-12 h-12 bg-black border border-gray-800 rounded-lg flex items-center justify-center mb-6 group-hover:border-[#C7A36F]/50 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
