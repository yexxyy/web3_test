// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract UpgradeContract is UUPSUpgradeable, OwnableUpgradeable {
	struct Call {
		bool allowFailure;
		uint256 value;
		bytes payload;
	}
	struct Result {
		bool success;
		bytes returnData;
	}

	uint public num;
	string public str;

	error UpgradeContract__ValidateNumError(uint num);
	error UpgradeContract__ValidateStrError(string str);
	error UpgradeContract__AggregateValueError();

	event UpgradeContract__AggregateSuccess(address indexed addr, Result[] returnData);

	constructor() {
		_disableInitializers();
	}

	function initialize() external initializer {
		__Ownable_init();
	}

	function getNum() public pure returns (uint) {
		return 111;
	}

	function setNum(uint x) public returns (bool success, bytes memory retData) {
		if (x < 10) {
			revert UpgradeContract__ValidateNumError({num: x});
		}
		num = x;
		success = true;
		retData = bytes("setNum success");
	}

	function setStr(string memory x) public returns (bool, bytes memory) {
		bytes32 str1Hash = keccak256(abi.encode(x));
		bytes32 str2Hash = keccak256(abi.encode("revert"));
		if (str1Hash == str2Hash) {
			revert UpgradeContract__ValidateStrError({str: x});
		}
		str = x;
		return (true, bytes("setStr success"));
	}

	function _authorizeUpgrade(address) internal override onlyOwner {}

	function aggregate(Call[] calldata calls) external payable returns (Result[] memory returnData) {
		uint256 valAccumulator;
		uint256 length = calls.length;
		returnData = new Result[](length);
		Call calldata calli;
		for (uint256 i; i < length; ) {
			Result memory result = returnData[i];
			calli = calls[i];
			uint256 val = calli.value;
			unchecked {
				valAccumulator += val;
			}

			(bool success, bytes memory retData) = address(this).call{value: val}(calli.payload);
			if (!success && !calli.allowFailure) {
				if (retData.length == 0) revert();
				assembly {
					revert(add(0x20, retData), mload(retData))
				}
			} else {
				result.success = success;
				result.returnData = retData;
			}
			unchecked {
				++i;
			}
		}
		if (msg.value != valAccumulator) {
			revert UpgradeContract__AggregateValueError();
		}
	}
}
