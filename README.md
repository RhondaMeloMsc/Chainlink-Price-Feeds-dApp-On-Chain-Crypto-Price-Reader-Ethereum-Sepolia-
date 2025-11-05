⛓️ Chainlink Price Feeds dApp — On-Chain Crypto Price Reader (Ethereum Sepolia)

Full-stack demo that reads real-world crypto prices on-chain using Chainlink Data Feeds.
Includes a Solidity consumer contract and a React (Vite) frontend that connects with MetaMask and displays live prices.

Educational / testnet only. Do not use on mainnet. Never commit private keys.

✨ Features

Read BTC/USD or ETH/USD from a Chainlink AggregatorV3Interface on Sepolia

Minimal Solidity consumer contract: latestPrice() returns price, decimals, description, timestamp

React + Vite frontend with MetaMask connect and on-chain reads

Env-driven addresses for flexible configuration (feed + consumer)

🧱 Tech Stack

Solidity 0.8.x, Hardhat (+ TypeScript)

React 18, Vite 5, ethers v6

Chainlink Data Feeds (AggregatorV3Interface)

📁 Project Structure
chainlink-pricefeeds-dapp/
├─ contracts/                # Hardhat + TS
│  ├─ contracts/
│  │  ├─ AggregatorV3Interface.sol
│  │  └─ PriceConsumer.sol
│  ├─ scripts/
│  │  └─ deploy.ts
│  ├─ test/
│  │  └─ consumer.test.ts
│  ├─ hardhat.config.ts
│  └─ .env.example
├─ dapp/                     # React + Vite + ethers v6
│  ├─ src/
│  │  ├─ App.jsx
│  │  └─ components/PriceViewer.jsx
│  ├─ index.html
│  ├─ vite.config.js
│  └─ .env.example
├─ README.md
├─ LICENSE
└─ .gitignore

⚙️ Setup — Contracts

Install deps

cd contracts
npm install
cp .env.example .env


Configure .env

SEPOLIA_RPC_URL= https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY= 0xYOUR_TESTNET_PRIVATE_KEY
FEED_ADDRESS= 0x...   # Chainlink feed (e.g., BTC/USD or ETH/USD on Sepolia)


Get Sepolia feed addresses from the Chainlink docs (search “Chainlink data feeds addresses Sepolia”).

Build & deploy

npm run build
npm run deploy:sepolia
# Copy the printed CONSUMER_ADDRESS

🖥️ Setup — Frontend

Install deps

cd ../dapp
npm install
cp .env.example .env.local


Configure .env.local

NEXT_PUBLIC_CONSUMER_ADDRESS= 0x...   # from your deploy step
# Optional: read feed directly, too
NEXT_PUBLIC_FEED_ADDRESS= 0x...       # Chainlink feed addr


Run the app

npm run dev
# Open the printed URL (usually http://localhost:5173)

🧪 How It Works

On-chain read via consumer
The frontend calls PriceConsumer.latestPrice() which returns:

price (int256): latest answer from the feed

decimals (uint8): decimal precision

desc (string): pair name (e.g., “BTC / USD”)

updatedAt (uint256): UNIX timestamp

Optional direct feed read
If NEXT_PUBLIC_FEED_ADDRESS is set, the UI will also call the Chainlink feed’s latestRoundData() for comparison.

✅ Verifying It Works

Wallet connects successfully (MetaMask prompt appears)

UI shows pair description, a non-zero price, and a recent “updated” timestamp

Changing the feed address in .env and refreshing updates the pair

🧰 Troubleshooting

Empty / wrong price: Check you used a Sepolia feed address and the network in MetaMask is Sepolia.

RPC errors: Verify SEPOLIA_RPC_URL and that your account has Sepolia ETH for gas.

CORS or provider errors: Ensure MetaMask is installed and you allowed site access to your accounts.

🔐 Security Notes

Never hardcode or commit real private keys.

This repo is for learning; contracts are not audited.

Always validate contract addresses and network before interacting.

📝 License

MIT © 2025 Rhonda Melo

🙌 Credits

Built with Chainlink Data Feeds, Hardhat, React, Vite, and ethers.
