<div align="center">
  
  <h1>📦 ProofDrop</h1>
  <p><b>Delivery certainty without central trust.</b></p>

</div>

## 🎥 Video Demonstration

> **How to add your video:** If you are viewing this on GitHub, click the `✎ (Edit)` button on this README. Then, **drag and drop** your `.mp4` or `.mov` video file right into this space. GitHub will automatically upload it and create a playable video player for you!

<!-- DRAG AND DROP YO

https://github.com/user-attachments/assets/24cb0337-525a-4cf6-b089-905f227ed1e5

UR VIDEO JUST BELOW THIS LINE -->


---

## 🌍 The Problem it Solves
Traditional delivery systems suffer from centralized points of failure, disputes over "delivered" statuses, and lack of transparency. ProofDrop guarantees:
1. **No Data Tampering**: Once a package is on the blockchain, no central authority can alter its timeline.
2. **Cryptographic Proof of Receipt**: The Receiver must mathematically sign the delivery using their crypto wallet, effectively eliminating "fake delivery" scams.
3. **Live GPS Tracking**: Delivery agents transmit location data integrated seamlessly into a modern React-based public verification portal.

## ✨ Key Features
* **Role-Based Workflows**: Tailored smart contract interactions for Senders, Delivery Agents, and Receivers.
* **Immutable Timeline**: Real-time status updates (`Created` ➔ `Picked Up` ➔ `In Transit` ➔ `Out for Delivery` ➔ `Delivered`) written permanently to the blockchain.
* **Live GPS Plotting**: Real physical coordinate data securely transmitted on-chain and plotted on interactive UI maps (React-Leaflet).
* **Public Verification Portal**: A fast, cache-busting read-only explorer (`/verify`) where anyone can plug in a Package ID (e.g., `PKG-133`) to audit its exact journey and final drop-off state.
* **Cryptographic Sign-off**: Final delivery can only be executed by the intended Receiver signing the transaction payload.

## 🛠️ Tech Stack
* **Frontend**: Next.js 14, React, TypeScript
* **Styling & UI**: Tailwind CSS, Framer Motion, Magic UI
* **Web3 Integration**: Wagmi / Viem v2, React Query
* **Smart Contracts**: Solidity (`^0.8.20`)
* **Blockchain Environments**: Hardhat (Local), Ethereum Sepolia (Testnet), Polygon Amoy
* **Deployment**: Vercel (Frontend), Alchemy / Infura (RPC Nodes)

---

## 🚀 Live Deployment
- **Frontend App (Vercel)**: [View Live App](https://proof-drop-flax.vercel.app/) *(Make sure to connect to Sepolia network in your Wallet)*

---

## 💻 Running the Project Locally

### 1. Requirements
- Node.js (v18+)
- MetaMask browser extension

### 2. Install Dependencies
```bash
npm install
cd frontend && npm install
cd ..
```

### 3. Smart Contract Deployment (Local Hardhat)
Start the local blockchain in terminal 1:
```bash
npx hardhat node
```

In terminal 2, deploy the smart contract to the local node:
```bash
npx hardhat ignition deploy ignition/modules/Delivery.ts --network localhost    
```

### 4. Start the Frontend
Update the `CONTRACT_ADDRESS` in `frontend/src/hooks/useContract.ts` to match your newly deployed address. Then run:
```bash
cd frontend
npm run dev
```

### 5. Connect your Wallet
1. Open MetaMask and add the **Localhost 8545** network (`RPC URL: http://127.0.0.1:8545`, `Chain ID: 31337`).                                                  
2. Import one or more private keys provided by the Hardhat terminal to act as your Sender, Agent, and Receiver. 

---
*Built for a decentralized logistical future.*
