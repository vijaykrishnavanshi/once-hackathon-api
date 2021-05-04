const _nft = {};

const bguizErc20ExampleTokenTxDesc =
  "ERC20 Example Token Deployment Transaction";
const bguizErc20ExampleTokenTxList = [
  {
    description: bguizErc20ExampleTokenTxDesc,
    address: "0x89B110E7e17a62bf5D13009f9D500555611Cb4cD",
    txHash:
      "0x112dc1cd0a6c50aae90bcb37f0377b510ede046dffb1e18cb32d33a6a4ab2710",
  },
  {
    description: bguizErc20ExampleTokenTxDesc,
    address: "0x83075fa1a90821ccc89eafc5a149c2b906f3d820",
    txHash:
      "0xcb9067289d116059c81141840edb643f689ffa3c34767aa608fff8b919dec259",
  },
];

const bguizErc721ExampleTokenTxDesc =
  "ERC721 Example Token Deployment Transaction";
const bguizErc721ExampleTokenTxList = [
  {
    description: bguizErc721ExampleTokenTxDesc,
    address: "0xc2E29C80a5BDD4785AD520EBE92e53F9BdA8dF0b",
    txHash:
      "0x0bbaf7f86191c3c0461b5ee99508abcfc6c5067c3a82e43f8dcc2efd792cf070",
  },
  {
    description: bguizErc721ExampleTokenTxDesc,
    address: "0xb78615d79cf590588c055319f96617c842040db9",
    txHash:
      "0xc886a1475f07fdf3566c60e27f28c1dcecf3562a493ba28b1071cfe202385267",
  },
];

_nft.getHash = async function (payloadData) {
  console.log(payloadData);
  return {
    ethHash: bguizErc20ExampleTokenTxList.map((elem) => elem.txHash),
    rskHash: bguizErc721ExampleTokenTxList.map((elem) => elem.rskHash),
  };
};

_nft.calculateCarbonIntensity = async function (payloadData) {
  console.log(payloadData);
  return { ethGCO2e: 15000, rskGCO2e: 6000 };
};

module.exports = _nft;
