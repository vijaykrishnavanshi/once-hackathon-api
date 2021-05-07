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
  {
    name: "CryptoCoins",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0x947b394383ee3e45b380257bf01f112bb25372cb",
    txHash:
      "0xa018d6fe09c74edfa196a40e2901927f806aa2f70d3b6011e7a950ec3217d7f0",
    type: transactionType.NFT_DEPLOY,
  },
  {
    name: "CryptoCoins",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0x947b394383ee3e45b380257bf01f112bb25372cb",
    txHash:
      "0x7bb3c0446b293aa769b3b541cc446b28b865af5f11bf3a39e232bfffe0dcddce",
    type: transactionType.NFT_MINT,
  },
  {
    name: "CryptoCoins",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0x947b394383ee3e45b380257bf01f112bb25372cb",
    txHash:
      "0x95122aaa93ea782a8b14d3b2448f54073cae841b23512efb2c21d9d62ef39cc0",
    type: transactionType.NFT_TRANSFER,
  },
  {
    name: "KCompound",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0x64dfA6c1216bA48CC665a4B603Cf221CE9Ca901b",
    txHash:
      "0x8982ce10fccdd1b7fc0e8f4fde4ff906b619b47432bc137a75547419f5d91e7a",
    type: transactionType.NFT_DEPLOY,
  },
  {
    name: "KCompound",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0x64dfA6c1216bA48CC665a4B603Cf221CE9Ca901b",
    txHash:
      "0x31d5cb73051b14525664c5228c9a43681b673dd39c5e8955d2e04a582511ed2b",
    type: transactionType.NFT_MINT,
  },
  {
    name: "KCompound",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0x64dfA6c1216bA48CC665a4B603Cf221CE9Ca901b",
    txHash:
      "0x792635612be73bddaf7b84799e783097461ad734ae2ccc939c98aee6d901367b",
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
  {
    name: "CryptoCoins",
    network: "ethereum",
    description: erc721ExampleTokenTxDesc,
    address: "0x71bb16e970db47fd0252856b17642972a81388b2",
  },
  {
    name: "KCompound",
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
