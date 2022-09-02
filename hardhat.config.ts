import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  }
};

export default config;
