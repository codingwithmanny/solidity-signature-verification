//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SignatureVerification {
  constructor() {
    // Nothing
  }

  function verifySignature(bytes32 hash, bytes memory signature) external view returns (bool) {
    // Required Prefix:
    // "\x19Ethereum Signed Message:\n32"
    bytes32 signedHash = ECDSA.toEthSignedMessageHash(hash);
    address recovered = ECDSA.recover(signedHash, signature);

    // Debug
    console.log(msg.sender);
    console.log(recovered);
    
    return recovered == msg.sender;
  }
}
