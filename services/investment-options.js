const protocolsService = require("./protocols");

const {getCreamFinanceInvestmentOptions} = require("./cream-finance-investment-options");
const {getYearnFinanceInvestmentOptions} = require("./yearn-finance-investment-options");

/*
standard datastructure of an investment option
{
  name
  apy
  tokens
  protocol
}
 */
const getInvestmentOptions = async (options = {}) => {
  const { chainId } = options;

  if (!chainId) {
    throw new Error(`chainId is a required query parameter`);
  }

  //TODO: add filtering based on
  //1. protocol

  const investmentOptions = [];

  const protocols = protocolsService.getProtocols(options);

  for (let [protocolName, protocolConfig] in Object.entries(protocols)) {
    switch (protocolName) {
      case "CREAM_FINANCE": {
        const creamFinanceInvestmentOptions = await getCreamFinanceInvestmentOptions(chainId);
        investmentOptions.push(...creamFinanceInvestmentOptions);
        break;
      }
      case "YEARN_FINANCE": {
        const yearnFinanceInvestmentOptions = await getYearnFinanceInvestmentOptions(chainId);
        investmentOptions.push(...yearnFinanceInvestmentOptions);
        break;
      }
    }
  }

  return investmentOptions;
}

module.exports = {
  getInvestmentOptions
}