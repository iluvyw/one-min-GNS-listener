const { InfuraProvider } = require("@ethersproject/providers");
const { ethers } = require("ethers");
const ABI = require("./abis/ABI.json");
const address = require("./config.js");

//Websocket listening on https://polygonscan.com/token/0xE5417Af564e4bFDA1c483642db72007871397896
async function main() {
  const provider = new InfuraProvider("matic");
  const contract = new ethers.Contract(address, ABI, provider);

  const listeners = (from, to, value) => {
    info = {
      from,
      to,
      value,
    };
    console.log(info);
  };

  contract.on("Transfer", listeners);
  console.log("Initialize socket!!!");
  setTimeout(() => {
    contract.off("Transfer", listeners);
    console.log("Terminate socket!!!");
  }, 60000);

  // const provider = new EtherscanProvider("maticmum");
  // const data = await provider.getHistory(nftmarketaddress);
  // console.log(data.length);
}

main();
