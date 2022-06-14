const axios = require("axios");
const protocolsService = require("./protocols");
const blockchainsService = require("./blockchains");

const getYearnFinanceInvestmentOptions = async (chainId) => {
  const yearnFinanceProtocolConfig = protocolsService.getProtocols().YEARN_FINANCE;
  const yearnFinanceSupportedBlockchainsList = yearnFinanceProtocolConfig.blockchains;

  const blockchains = blockchainsService.getBlockChains();

  const creamFinanceSupportedBlockchains = Object.entries(blockchains)
    .filter(([key, value]) => yearnFinanceSupportedBlockchainsList.includes(key))
    .map(([key, value]) => value);

  const isChainIdSupported = creamFinanceSupportedBlockchains.some(blockchain => blockchain.chainId === Number(chainId));

  if (!isChainIdSupported) {
    throw new Error(`chainId: ${chainId} is not supported by ${yearnFinanceProtocolConfig.name}`);
  }

  const axiosResponse = await axios.get(`https://api.yearn.finance/v1/chains/1/vaults/all`)

  if (axiosResponse.status !== 200) {
    throw new Error(`failed to get investment options from ${yearnFinanceProtocolConfig.name}`);
  }

  const investmentOptions = axiosResponse.data;

  const transformedInvestmentOptions = investmentOptions.map(investmentOption => {
    return {
      name: investmentOption.name,
      apy: investmentOption.apy.net_apy,
      tokens: [investmentOption.token.symbol],
      protocol: yearnFinanceProtocolConfig.name,
    }
  });

  return transformedInvestmentOptions;
}

module.exports = {
  getYearnFinanceInvestmentOptions
}