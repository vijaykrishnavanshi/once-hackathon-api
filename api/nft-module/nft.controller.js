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
  {
    name: "Mypt NFT",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0x71bb16e970db47fd0252856b17642972a81388b2",
    txHash:
      "0xd71837c583607caa4e7ee93ce3eec9f8aa2dc2dd79db5a557250faf641ce8769",
    type: transactionType.NFT_DEPLOY,
  },
  {
    name: "Mypt NFT",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0x71bb16e970db47fd0252856b17642972a81388b2",
    txHash:
      "0xc6edd87683c28d070db12cdf19bbf190737b53bac3db51eb7a32c6771a08f922",
    type: transactionType.NFT_MINT,
  },
  {
    name: "Mypt NFT",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0x71bb16e970db47fd0252856b17642972a81388b2",
    txHash:
      "0x0cf5583f933c4cd21e4f0532a9abed288747e44e8aa2482dfa9d0f05ef6f3d28",
    type: transactionType.NFT_TRANSFER,
  },
];

const tokenList = [
  {
    name: "Rare NFT",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0xb78615d79cf590588c055319f96617c842040db9",
  },
  {
    name: "Mypt NFT",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0x71bb16e970db47fd0252856b17642972a81388b2",
  },
];

_nft.getHash = async function () {
  return {
    ethHash: tokenTxList.map((elem) => elem.txHash),
    ethNFT: tokenList,
    // rskHash: [],
  };
};

_nft.calculateCarbonCost = async function (payloadData) {
  const transactions = tokenTxList.filter(
    (elem) => elem.name === payloadData.nftName
  );
  console.log(transactions);
  const deployTransaction = transactions.find(
    (elem) => elem.type === transactionType.NFT_DEPLOY
  );
  const deployGCO2e = await utils.calculateCarbonCostForTransaction(
    payloadData.energyProfile,
    deployTransaction
  );
  const mintTransaction = transactions.find(
    (elem) => elem.type === transactionType.NFT_MINT
  );
  const mintGCO2e = await utils.calculateCarbonCostForTransaction(
    payloadData.energyProfile,
    mintTransaction
  );
  const transferTransaction = transactions.find(
    (elem) => elem.type === transactionType.NFT_TRANSFER
  );
  const transferGCO2e = await utils.calculateCarbonCostForTransaction(
    payloadData.energyProfile,
    transferTransaction
  );
  return { mintGCO2e, deployGCO2e, transferGCO2e };
};

module.exports = _nft;
