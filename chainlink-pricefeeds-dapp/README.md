
# ⛓️ Chainlink Price Feeds dApp — On-Chain Crypto Price Reader (Ethereum Sepolia)

Full-stack example that reads real-world crypto prices **on-chain** using **Chainlink Data Feeds**.
Includes a Solidity contract that consumes a Chainlink aggregator and a React (Vite) frontend
to connect with MetaMask and display live prices.

> Educational demo. Use **Sepolia testnet** and test ETH only.

## What it shows
- How to read **BTC/USD** or **ETH/USD** from a Chainlink **AggregatorV3Interface**
- A minimal **PriceConsumer** Solidity contract with `latestPrice()`
- React + ethers.js dApp that reads from the deployed contract
- Env-driven addresses so you can point to any Chainlink feed

## Tech
Solidity · Hardhat · TypeScript · React 18 · Vite 5 · ethers v6 · Chainlink

---

## Quick Start

### Contracts
```bash
cd contracts
npm install
cp .env.example .env
# Edit .env with SEPOLIA_RPC_URL, PRIVATE_KEY, and FEED_ADDRESS (Chainlink aggregator)
npm run build
npm run deploy:sepolia
# Copy printed CONSUMER_ADDRESS for the frontend
```

### Frontend
```bash
cd ../dapp
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_CONSUMER_ADDRESS to your deployed consumer contract address
# (Optional) NEXT_PUBLIC_FEED_ADDRESS if you want to read the feed directly too
npm run dev
# open http://localhost:5173
```

---

## Env hints
You can find Sepolia Chainlink feed addresses on docs.chain.link. Populate:
- FEED_ADDRESS (contracts/.env)
- NEXT_PUBLIC_FEED_ADDRESS (dapp/.env.local, optional)
- NEXT_PUBLIC_CONSUMER_ADDRESS (dapp/.env.local)

---

## Safety
- Never commit real PRIVATE_KEY
- Use testnet only
- Verify addresses are correct for the network

## License
MIT © 2025
