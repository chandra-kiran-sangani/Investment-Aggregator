//source: https://chainlist.org
const blockchains = {
  ETHEREUM_MAINNET: {
    name: "Ethereum Mainnet",
    chainId: 1,
    iconUrl: "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_ethereum.jpg&w=64&q=75",
    currency: "ETH"
  },
  BINANCE_SMART_CHAIN_MAINNET: {
    name: "Binance Smart Chain Mainnet",
    chainId: 56,
    iconUrl: "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_binance.jpg&w=64&q=75",
    currency: "BNB"
  },
  AVALANCHE_C_CHAIN: {
    name: "Avalanche C-Chain",
    chainId: 43114,
    iconUrl: "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_avalanche.jpg&w=64&q=75",
    currency: "AVAX"
  },
  POLYGON_MAINNET: {
    name: "Polygon Mainnet",
    chainId: 137,
    iconUrl: "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_polygon.jpg&w=64&q=75",
    currency: "MATIC"
  },
}

const getBlockChains = () => {
  return blockchains;
}

module.exports = {
  getBlockChains
}