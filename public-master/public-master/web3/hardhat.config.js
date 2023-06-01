/** @type import('hardhat/config').HardhatUserConfig */
require("@openzeppelin/hardhat-upgrades");
module.exports = {
  plugins: ["@openzeppelin/hardhat-upgrades"],
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'goerli',
    networks: {
      hardhat: {},
    /*  goerli: {
       // url: 'https://rpc.ankr.com/eth_goerli',
          url: 'HTTP://127.0.0.1:7545',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }*/
      /*localganache :{
        url:  'HTTP://127.0.0.1:7545',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }*/
      ethers: {
        // Your specific configuration goes here
        defaultProvider: 'HTTP://127.0.0.1:7545',
        gasPrice: 8000000000, // 8 gwei
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

};
