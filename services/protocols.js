const protocolTypes = require("../enums/protocol-types");

const blockchainsService = require("./blockchains");

const protocols = {
  CREAM_FINANCE: {
    name: "Cream Finance",
    //source: https://app.cream.finance/
    iconUrl: "https://app.cream.finance/static/media/logo.d28cd339.svg",
    blockchains: ["ETHEREUM_MAINNET", "POLYGON_MAINNET", "BINANCE_SMART_CHAIN_MAINNET", "AVALANCHE_C_CHAIN"],
    type: [protocolTypes.LENDING_BORROWING],
  },
  YEARN_FINANCE: {
    name: "Yearn Finance",
    //source: https://coinmarketcap.com/currencies/yearn-finance/
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5864.png",
    blockchains: ["ETHEREUM_MAINNET"],
    type: [protocolTypes.LENDING_BORROWING],
  }
}

const getProtocols = (filters = {}) => {
  const blockchains = blockchainsService.getBlockChains();

  const { chainId, protocolType } = filters;

  let result = protocols;

  if (chainId) {
    const blockchainKey = Object.entries(blockchains).find(([key, value]) => value.chainId === Number(chainId)).map(([key, value]) => key);
    result = Object.fromEntries(Object.entries(result).filter(([key, value]) => value.blockchains.includes(blockchainKey)));
  }

  if (protocolType) {
    if(!Object.keys(protocolTypes).includes(protocolType)) {
      throw new Error(`protocolType: ${protocolType} is not supported`);
    }

    result = Object.fromEntries(Object.entries(result).filter(([key, value]) => value.type.includes(protocolType)));
  }

  return result;
}

module.exports = {
  getProtocols
}