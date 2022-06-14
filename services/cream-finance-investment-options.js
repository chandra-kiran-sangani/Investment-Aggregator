const axios = require("axios");
const protocolsService = require("./protocols");
const blockchainsService = require("./blockchains");

const chainIdToComptrollerConfig = {
  1: "eth",
  43114: "avalanche",
  56: "bsc",
  137: "polygon"
};

const getCreamFinanceInvestmentOptions = async (chainId) => {
  const creamFinanceProtocolConfig = protocolsService.getProtocols().CREAM_FINANCE;
  const creamFinanceSupportedBlockchainsList = creamFinanceProtocolConfig.blockchains;

  const blockchains = blockchainsService.getBlockChains();

  const creamFinanceSupportedBlockchains = Object.entries(blockchains)
    .filter(([key, value]) => creamFinanceSupportedBlockchainsList.includes(key))
    .map(([key, value]) => value);

  const isChainIdSupported = creamFinanceSupportedBlockchains.some(blockchain => blockchain.chainId === Number(chainId));

  if (!isChainIdSupported) {
    throw new Error(`chainId: ${chainId} is not supported by ${creamFinanceProtocolConfig.name}`);
  }

  const axiosResponse = await axios.get(`https://api.cream.finance/api/v1/rates?comptroller=${chainIdToComptrollerConfig[Number(chainId)]}`)

  if (axiosResponse.status !== 200) {
    throw new Error(`failed to get investment options from ${creamFinanceProtocolConfig.name}`);
  }

  const investmentOptions = axiosResponse.data.lendRates;

  const transformedInvestmentOptions = investmentOptions.map(investmentOption => {
    return {
      name: investmentOption.tokenSymbol,
      apy: investmentOption.apy,
      tokens: [investmentOption.tokenSymbol],
      protocol: creamFinanceProtocolConfig.name,
    }
  });

  return transformedInvestmentOptions;
}

module.exports = {
  getCreamFinanceInvestmentOptions
}