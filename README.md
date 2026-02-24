# 🛡️ Mantra AI
![Project Banner](https://cdn.dorahacks.io/static/files/19c79e332ed98004139ff294311ace62.png)


![Project Banner](https://cdn.dorahacks.io/static/files/19c79dfa8b7ea49af7d31844687a5086.png)
<div align="center">

![Mantra AI Banner](https://img.shields.io/badge/Mantra_AI-Real--Time_Fraud_Detection-blue?style=for-the-badge&logo=ethereum)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-mantra--ai--midl.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://mantra-ai-midl.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-namanbansal102%2FMantra--AI-black?style=for-the-badge&logo=github)](https://github.com/namanbansal102/Mantra-AI)
[![midl Chain](https://img.shields.io/badge/Chain-midl%20Chain-yellow?style=for-the-badge&logo=binance)](https://www.midlchain.org/)

> **An intelligent, adaptive framework for detecting blockchain risks on midl Chain through graph visualization that evolves and responds to transactions in real-time.**

</div>

---

## 🌐 Live Links

| Resource | URL |
|----------|-----|
| 🚀 Deployed App | [https://mantra-ai-midl.vercel.app/](https://mantra-ai-midl.vercel.app/) |
| 📦 GitHub Repository | [https://github.com/namanbansal102/Mantra-AI-Midl](https://github.com/namanbansal102/Mantra-AI-Midl) |

---

## 📖 Overview

**Mantra AI** is a real-time blockchain fraud detection and risk analysis platform built for the **midl Chain** ecosystem. It uses graph-based transaction analysis to trace wallet interactions up to 3 layers deep, scoring each wallet and connection for suspicious behaviour using a multi-signal fraud detection engine.

Users can connect their wallet, enter any address, and instantly visualise the transaction graph — with every node and edge colour-coded by risk level and annotated with plain-English explanations of why each address was flagged.

---

## ✨ Features

- 🔍 **Deep Wallet Analysis** — Traverses up to 3 hops from any wallet address, analysing every connected peer
- 📊 **Multi-Signal Risk Scoring** — 15+ fraud indicators including scam adjacency, rapid forwarding, looping transactions, bot patterns, NFT flipping, and balance spikes
- 🕸️ **Interactive Graph Visualization** — Force-directed graph with colour-coded nodes (wallet / contract / exchange / scam) and weighted edges
- 💬 **Plain-English Hover Tooltips** — Every node and edge explains itself in one natural-language sentence
- ⚡ **Real-Time Detection** — Risk scores computed live as graph is built, no pre-indexed data required
- 🦊 **Wallet Connect** — MetaMask / Web3 wallet connection with address display in the navbar
- 🌐 **midl Chain Native** — Optimised for midl Chain transaction patterns and token standards (BEP-20, BEP-721, BEP-1155)

---

## 🧠 How the Risk Engine Works

The fraud detection engine runs a **BFS (Breadth-First Search)** traversal from the root wallet and scores each wallet using these signals:

| Signal | Score Impact |
|--------|-------------|
| 🚨 Direct scam sender/recipient | +60 |
| 🆕 New wallet (<30 days) with large tx | +25 |
| 💸 Many small incoming payments (dusting) | +25 |
| 🔁 Looping transactions (A→B→A) | +20 |
| ⚡ Rapid fund forwarding (<5 min) | +20 |
| 🤖 High transaction frequency | +20 |
| 🕸️ Too many unique peers | +20 |
| 🪙 Token approval to unknown contract | +20 |
| 📄 Interacts with unverified contract | +15 |
| 🤖 Repeated identical tx pattern (bot) | +15 |
| 📈 Sudden transfer amount spike | +15 |
| 💰 Large single transfer (>1 ETH) | +10 |
| ⛽ Gas price anomaly | +10 |
| 🔗 Indirect scam adjacency (child wallet) | +30 |
| 📊 Balance spike/drain/saw-tooth pattern | +20–30 |
| 🪙 NFT rapid flip (<1 hour) | +25 |
| ✅ Validator (trusted block producer) | −20 |

**Risk Bands:**

```
0  – 30   ✅  SAFE
31 – 60   ⚠️  SUSPICIOUS
61 – 100  🔴  HIGH RISK
100+      🚨  VERY HIGH FRAUD PROBABILITY
```

---

## 🗂️ Project Structure

```
Mantra-AI/
│
├── frontend/                        # Next.js / React frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── app/                     # Next.js App Router pages
│   │   │   ├── page.tsx             # Landing page (Hero)
│   │   │   ├── risk-analysis/       # Risk Analysis page
│   │   │   │   └── page.tsx
│   │   │   └── about/               # About Us page
│   │   │       └── page.tsx
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Top nav with wallet connect + links
│   │   │   ├── Hero.tsx             # Landing hero section
│   │   │   ├── GraphVisualization/  # Force-directed graph component
│   │   │   │   ├── Graph.tsx        # Main graph renderer
│   │   │   │   ├── NodeTooltip.tsx  # Hover tooltip for nodes
│   │   │   │   └── EdgeTooltip.tsx  # Hover tooltip for edges
│   │   │   ├── RiskPanel.tsx        # Right-side risk score panel
│   │   │   ├── WalletSearch.tsx     # Wallet address input + submit
│   │   │   └── RiskBadge.tsx        # Colour-coded risk indicator
│   │   ├── hooks/
│   │   │   ├── useWallet.ts         # MetaMask / wallet connection hook
│   │   │   └── useGraphData.ts      # Fetches + caches graph from API
│   │   ├── lib/
│   │   │   └── api.ts               # API client for backend calls
│   │   └── types/
│   │       └── graph.ts             # TypeScript types for nodes/edges
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
│
├── backend/                         # Python fraud analysis engine
│   ├── fraud_analysis.py            # Core risk engine (BFS + scoring)
│   ├── api_server.py                # FastAPI / Flask server exposing /graph
│   └── requirements.txt
│
├── .env.example                     # Environment variable template
├── vercel.json                      # Vercel deployment config
└── README.md
```

---

## 🔌 API Reference

### `POST /graph`

Runs the full fraud analysis for a given wallet address.

**Request:**
```json
{
  "wallet": "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe",
  "chain_id": "56"
}
```

**Response:**
```json
{
  "risk_score": 85,
  "root_wallet": "0xde0B...",
  "nodes": [
    {
      "id": "0xde0B295...",
      "label": "0xde0B29…97BAe",
      "type": "wallet",
      "layer": 0,
      "distance": 0,
      "risk_score": 85,
      "suspicious_score": 85,
      "is_scam": false,
      "balance": 1.2345,
      "tx_count": 120,
      "message": "This wallet sits at layer 0..."
    }
  ],
  "edges": [
    {
      "source": "0xde0B...",
      "target": "0xABCD...",
      "transaction_value": 0.5,
      "transaction_count": 3,
      "weight": 0.5,
      "timestamp": "2024-01-15T10:30:00+00:00",
      "risk_flag": true,
      "message": "Address 0xde0B… sent 3 transactions totalling 0.5000 ETH..."
    }
  ]
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- A BSCScan / Etherscan API key

### 1. Clone the repository

```bash
git clone https://github.com/namanbansal102/Mantra-AI-Midl.git
cd Mantra-AI
```

### 2. Setup the backend

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file:
```env
ETHERSCAN_API_KEY=your_api_key_here
CHAIN_ID=56           # 56 = midl Chain mainnet
MAX_DEPTH=3
RATE_LIMIT_DELAY=0.4
```

Start the server:
```bash
python api_server.py
```

### 3. Setup the frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_CHAIN_ID=56
```

Start the dev server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing with a Known Wallet

To quickly test the engine, use a known active wallet on midl Chain:

```
0x8894E0a0c962CB723c1976a4421c95949bE2D4E3   # Binance Hot Wallet
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, TypeScript, TailwindCSS |
| Graph Rendering | D3.js / Force Graph |
| Blockchain Data | BSCScan API / Etherscan API v2 |
| Backend Engine | Python 3.11, FastAPI |
| HTTP Client | `requests` with connection pooling |
| Wallet Connect | MetaMask / ethers.js |
| Deployment | Vercel (frontend), Railway / Render (backend) |

---

## 🔒 Security & Rate Limits

- The backend enforces a **0.4s delay between API calls** to stay within free-tier limits (3 req/sec)
- Automatic **exponential backoff** (up to 4 retries) on rate-limit errors
- All wallet addresses are normalised to lowercase before processing to prevent duplicate analysis
- DP cache (`dp_cache`) prevents re-scoring already-visited wallets in the same session

---

## 📸 Screenshots

### Landing Page
> Interactive particle graph background with Real-Time Fraud Detection badge and wallet connection

### Risk Analysis Page
> Force-directed graph showing transaction network — nodes colour-coded by risk level, hover tooltips with plain-English explanations

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 👤 Author

**Naman Bansal**

[![GitHub](https://img.shields.io/badge/GitHub-namanbansal102-black?style=flat&logo=github)](https://github.com/namanbansal102)

---

<div align="center">

Built with ❤️ for the midl Chain ecosystem

⭐ Star this repo if you found it useful!

</div>

