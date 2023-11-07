// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract UpgradeContract is UUPSUpgradeable, OwnableUpgradeable {

    constructor() {
        _disableInitializers();
    }

    function initialize() external initializer {
        __Ownable_init();
    }

    function getNum() public pure returns (uint) {
        return 10;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
    
}