// Imports
// ========================================================
import { expect } from "chai";
import { ethers } from "hardhat";
import ContractABI from "../artifacts/contracts/SignatureVerification.sol/SignatureVerification.json";

// Config
// ========================================================
const CONTRACT_NAME = "SignatureVerification";

// Tests
// ========================================================
describe("SignatureVerification", () => {
  it("Should get deployed", async () => {
    // Setup
    const wallet = ethers.Wallet.createRandom();
    console.log({ wallet });
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner(wallet.address);
    const Contract = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = await Contract.deploy();
    await contract.deployed();
    const contractProvider = new ethers.Contract(contract.address, ContractABI.abi, signer);
    const messageText = "This should be coming from Manny";
    const message = ethers.utils.solidityKeccak256(['string'], [messageText]);
    const signatureHash = await wallet.signMessage(ethers.utils.arrayify(message));

    // Init
    const result = await contractProvider.verifySignature(message, signatureHash);

    // Expectations
    expect(result).to.be.true;
  });
});
