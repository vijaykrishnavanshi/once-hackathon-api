/* eslint-disable security/detect-object-injection */
/* eslint-disable node/no-unsupported-features/es-syntax */
const axios = require("axios");
const dotenv = require("dotenv");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

dotenv.config();

const energyData = require("./energy-data.json");

const accountPrivateKey = process.env.ONCE_HACKATHON_WALLET_PRIVATE_KEY || "";

const infuraProjectId = process.env.ONCE_HACKATHON_INFURA_PROJECT_ID || "";

function initialiseEthTestnet() {
  return new HDWalletProvider({
    privateKeys: [accountPrivateKey],
    providerOrUrl: `https://kovan.infura.io/v3/${infuraProjectId}`,
    derivationPath: "m/44'/60'/0'/0/",
    // Higher polling interval to check for blocks less frequently
    pollingInterval: 15e3,
  });
}

function initialiseEthMainnet() {
  return new HDWalletProvider({
    privateKeys: [accountPrivateKey],
    providerOrUrl: `https://mainnet.infura.io/v3/${infuraProjectId}`,
    derivationPath: "m/44'/60'/0'/0/",
    // Higher polling interval to check for blocks less frequently
    pollingInterval: 15e3,
  });
}

function cleanUp({ web3ProviderTestnet, web3ProviderMainnet }) {
  web3ProviderTestnet.engine.stop();
  web3ProviderMainnet.engine.stop();
}

async function getBlockNumber({ web3InstanceTestnet }) {
  const block = await web3InstanceTestnet.eth.getBlock("latest", false);
  const blockNumber = block.number;
  return blockNumber;
}

async function getGasUsedForTx({ web3InstanceTestnet, txHash }) {
  const txReceipt = await web3InstanceTestnet.eth.getTransactionReceipt(txHash);
  const gasUsed = txReceipt.gasUsed;
  return gasUsed;
}

async function getGasPrice({ web3InstanceMainnet }) {
  return web3InstanceMainnet.eth.getGasPrice();
}

async function getCoinPrice({ coinSymbol, fiatSymbol }) {
  const url = `https://min-api.cryptocompare.com/data/price?fsym=${coinSymbol}&tsyms=${fiatSymbol}`;

  const response = await axios({
    method: "get",
    url,
    responseType: "json",
    responseEncoding: "utf8",
  });
  return response.data;
}

async function getEnergyData({ network, energyProfileId }) {
  const energyProfile = energyData.energyProfiles[energyProfileId];
  if (!energyProfile) {
    throw new Error(`No energy profile found for "${energyProfileId}"`);
  }
  const networkProfile = energyData.networkProfiles[network];
  if (!networkProfile) {
    throw new Error(`No network profile found for "${network}"`);
  }
  const {
    carbonEnergyIntensity, // gCO2e/kWh
  } = energyProfile;
  const {
    networkEnergyConsumption, // kWh
    networkAverageGasPerDay, // Gwei
  } = networkProfile;
  return {
    carbonEnergyIntensity,
    networkEnergyConsumption,
    networkAverageGasPerDay,
  };
}

// gCo2e --> grams of carbon dioxide equivalent for selected transaction
async function calculateCarbon({
  web3InstanceTestnet,
  gasUsed, // wei
  carbonEnergyIntensity, // gCO2e/kWh
  networkEnergyConsumption, // kWh
  networkAverageGasPerDay, // Gwei
}) {
  const toBN = web3InstanceTestnet.utils.toBN;
  return toBN(gasUsed)
    .mul(toBN(Math.floor(carbonEnergyIntensity * 10e3)))
    .mul(toBN(Math.floor(networkEnergyConsumption * 10e3)))
    .div(toBN(Math.floor((networkAverageGasPerDay / 24) * 10e9)))
    .div(toBN(10e6))
    .toNumber()
    .toFixed(2);
}

function calculateFees({
  web3InstanceTestnet,
  gasUsed,
  gasPrice,
  coinPrice,
  decimalPoints = 18,
}) {
  const fiatRateInCents = web3InstanceTestnet.utils.toBN(
    Math.floor(coinPrice.USD * 100)
  );
  const decimalPointMultiplier = web3InstanceTestnet.utils.toBN(
    Math.pow(10, decimalPoints)
  );
  const cryptoFee = web3InstanceTestnet.utils
    .toBN(gasUsed)
    .mul(web3InstanceTestnet.utils.toBN(gasPrice));
  const fiatFeeCents = cryptoFee
    .mul(fiatRateInCents)
    .div(decimalPointMultiplier);
  const fiatFee = (fiatFeeCents.toNumber() / 100).toFixed(2);
  return {
    cryptoFee: cryptoFee.toString(),
    fiatFee,
  };
}

async function init(item) {
  const [blockNumber, coinPrice, gasPrice, energyData] = await Promise.all([
    getBlockNumber(item),
    getCoinPrice(item),
    getGasPrice(item),
    getEnergyData(item),
  ]);
  return {
    blockNumber,
    coinPrice,
    gasPrice,
    energyData,
  };
}

async function getCompleteTxProfile(networkConfig, transaction) {
  const {
    web3InstanceTestnet,
    network,
    coinPrice,
    gasPrice,
    decimalPoints,
    energyData,
  } = networkConfig;
  const { description, address, txHash } = transaction;
  const gasUsed = await getGasUsedForTx({ web3InstanceTestnet, txHash });
  const fees = calculateFees({
    web3InstanceTestnet,
    gasUsed,
    gasPrice,
    coinPrice,
    decimalPoints,
  });
  const { cryptoFee, fiatFee } = fees;

  const {
    carbonEnergyIntensity,
    networkEnergyConsumption,
    networkAverageGasPerDay,
  } = energyData;
  const carbon = await calculateCarbon({
    web3InstanceTestnet,
    gasUsed,
    carbonEnergyIntensity,
    networkEnergyConsumption,
    networkAverageGasPerDay,
  });

  return {
    network,
    description,
    coinPrice,
    gasPrice,
    address,
    txHash,
    gasUsed,
    cryptoFee,
    fiatFee,
    carbonEnergyIntensity,
    carbon,
  };
}

const _util = {};

_util.calculateCarbonCostForTransaction = async function calculateCarbonCostForTransaction(
  energyProfile,
  transaction
) {
  const networkConfig = {
    network: "ethereum",
    web3ProviderTestnet: initialiseEthTestnet(),
    web3ProviderMainnet: initialiseEthMainnet(),
    coinSymbol: "ETH",
    fiatSymbol: "USD",
    decimalPoints: 18,
    energyProfileId: energyProfile,
  };
  networkConfig.web3InstanceTestnet = new Web3(
    networkConfig.web3ProviderTestnet
  );
  networkConfig.web3InstanceMainnet = new Web3(
    networkConfig.web3ProviderMainnet
  );
  const initialisedNetworkConfig = await init(networkConfig);
  const completeNetworkConfig = {
    ...networkConfig,
    ...initialisedNetworkConfig,
  };
  const feeResult = await getCompleteTxProfile(
    completeNetworkConfig,
    transaction
  );
  await cleanUp(completeNetworkConfig);
  return feeResult.carbon;
};

module.exports = _util;
