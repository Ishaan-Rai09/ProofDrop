# ProofDrop - Decentralized Delivery Proof System

ProofDrop is a Web3-powered supply chain and logistics tracking decentralized application (dApp). It leverages the Ethereum/Polygon Virtual Machine (EVM) architecture to provide **immutable, transparent, and cryptographically verified proofs** of delivery.

![ProofDrop Banner](https://via.placeholder.com/1000x300?text=ProofDrop+Decentralized+Delivery)

## ?? The Problem it Solves
Traditional delivery systems suffer from centralized points of failure, disputes over "delivered" statuses, and lack of transparency. ProofDrop guarantees:
1. **No Data Tampering**: Once a package is on the blockchain, no central authority can alter its timeline.
2. **Cryptographic Proof of Receipt**: The Receiver must mathematically sign the delivery using their crypto wallet, effectively eliminating "fake delivery" scams.
3. **Live GPS Tracking**: Delivery agents transmit location data integrated seamlessly into a modern React-based public verification portal.

## ?? Key Features

* **Role-Based Workflows**: Tailored smart contract interactions for Senders, Delivery Agents, and Receivers.
* **Immutable Timeline**: Real-time status updates (`Created` -> `Picked Up` -> `In Transit` -> `Out for Delivery` -> `Delivered`) written permanently to the blockchain.
* **Wallet Authentication**: Driven by `Wagmi` and `Viem` for secure MetaMask connections.
* **Interactive Live Tracker**: Real coordinates plotted on interactive maps (Leaflet/Nominatim) when a package is in transit.
* **Public Verification Portal**: A read-only explorer (`/verify`) where anyone can plug in a Package ID (e.g., `PKG-123`) to audit its journey and final GPS drop-off coordinates.

## ?? Tech Stack

* **Frontend**: Next.js 14 (App Router), React, TypeScript
* **Styling & UI**: Tailwind CSS, Framer Motion, Lucide Icons
* **Web3 Integration**: Wagmi, Viem, React Query
* **Smart Contracts**: Solidity (^0.8.20)
* **Blockchain Environment**: Hardhat (Local Node) & Polygon Amoy (Testnet)

## ?? Running the Project Locally

### 1. Start the Local Blockchain
In the root directory, start the Hardhat node to spin up 20 local test accounts with 10,000 fake ETH:
```bash
npx hardhat node
```

### 2. Deploy the Smart Contract
In a new terminal, deploy the `DeliverySystem` contract to your local node:
```bash
npx hardhat ignition deploy ignition/modules/Delivery.ts --network localhost
```

### 3. Start the Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Connect MetaMask
1. Open MetaMask and add the **Localhost 8545** network (`RPC URL: http://127.0.0.1:8545`, `Chain ID: 31337`).
2. Import one or more private keys provided by the Hardhat terminal to act as your Sender, Agent, and Receiver.

---
*Built with ?? for a decentralized logistical future.*
