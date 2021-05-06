const utils = require("./utils");

const _nft = {};

const transactionType = {
  NFT_DEPLOY: "NFT Deploy",
  NFT_MINT: "NFT Mint",
  NFT_TRANSFER: "NFT Transfer",
};

const erc721ExampleTokenTxDesc = "ERC721 Example Token Deployment Transaction";

const tokenTxList = [
  {
    name: "Rare NFT",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0xb78615d79cf590588c055319f96617c842040db9",
    txHash:
      "0xc886a1475f07fdf3566c60e27f28c1dcecf3562a493ba28b1071cfe202385267",
    type: transactionType.NFT_DEPLOY,
  },
  {
    name: "Rare NFT",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0xb78615d79cf590588c055319f96617c842040db9",
    txHash:
      "0xc886a1475f07fdf3566c60e27f28c1dcecf3562a493ba28b1071cfe202385267",
    type: transactionType.NFT_MINT,
  },
  {
    name: "Rare NFT",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0xb78615d79cf590588c055319f96617c842040db9",
    txHash:
      "0xc886a1475f07fdf3566c60e27f28c1dcecf3562a493ba28b1071cfe202385267",
    type: transactionType.NFT_TRANSFER,
  },
];

const tokenList = [
  {
    name: "Rare NFT",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0xb78615d79cf590588c055319f96617c842040db9",
    txHash:
      "0xc886a1475f07fdf3566c60e27f28c1dcecf3562a493ba28b1071cfe202385267",
  },
];

_nft.getHash = async function () {
  return {
    ethHash: tokenList.map((elem) => elem.txHash),
    ethNFT: tokenList,
    // rskHash: [],
  };
};

_nft.calculateCarbonIntensity = async function (payloadData) {
  const transactions = tokenTxList.filter(
    (elem) => elem.name === payloadData.nftName
  );
  const deployTransaction = transactions.find(
    (elem) => elem.type === transactionType.NFT_DEPLOY
  );
  const deployGCO2e = await utils.calculateCarbonIntensityForTransaction(
    payloadData.energyProfile,
    deployTransaction
  );
  const mintTransaction = transactions.find(
    (elem) => elem.type === transactionType.NFT_DEPLOY
  );
  const mintGCO2e = await utils.calculateCarbonIntensityForTransaction(
    payloadData.energyProfile,
    mintTransaction
  );
  const transferTransaction = transactions.find(
    (elem) => elem.type === transactionType.NFT_DEPLOY
  );
  const transferGCO2e = await utils.calculateCarbonIntensityForTransaction(
    payloadData.energyProfile,
    transferTransaction
  );
  return { mintGCO2e, deployGCO2e, transferGCO2e };
};

module.exports = _nft;
