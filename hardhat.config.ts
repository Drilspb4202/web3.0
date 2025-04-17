import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import * as dotenv from "dotenv";

dotenv.config();

// Это валидный приватный ключ для тестов, не используйте его для деплоя
const PLACEHOLDER_PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const PRIVATE_KEY = process.env.PRIVATE_KEY || PLACEHOLDER_PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    // fuji: {
    //   url: "https://api.avax-test.network/ext/bc/C/rpc",
    //   chainId: 43113,
    //   accounts: [PRIVATE_KEY],
    //   gasPrice: 225000000000,
    // },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  paths: {
    artifacts: "./src/artifacts",
  },
};

export default config;
