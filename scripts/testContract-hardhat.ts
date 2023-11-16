import { deployments, getNamedAccounts, ethers } from 'hardhat';
const { execute } = deployments;

import * as dotenv from "dotenv"
import { parseUnits } from 'ethers';


// dotenv.config({ path: __dirname+'/.env' })
dotenv.config()

async function main() {
    const [owner, otherAccount] = await ethers.getSigners();
    // console.log(owner)
    // console.log(otherAccount)
    const UpgradeContract = await ethers.getContractFactory("UpgradeContract");
    const upgradeContract = await UpgradeContract.deploy()
    const address = await upgradeContract.getAddress()
    console.log(address)

    // 多函数拼接调用
    const iface = upgradeContract.interface
    const playload = iface.encodeFunctionData("setNum", [9])
    const playload2 = iface.encodeFunctionData("setStr", ["revert"])

    const calls = [
        { 'allowFailure': true, 'value': parseUnits('0', 0), 'payload': playload },
        { 'allowFailure': true, 'value': parseUnits('0', 0), 'payload': playload2 }
    ]
    // console.log(calls)
    const returnData = await upgradeContract.aggregate.staticCall(calls)
    console.log(returnData)
    // const returnDataArr = iface.decodeFunctionResult("aggregate", returnData.data)

    // console.log(returnDataArr)
    /** returnData
     * Result(2) [
        Result(2) [
            true,
            '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000e7365744e756d2073756363657373000000000000000000000000000000000000'
        ],
        Result(2) [
            false,
            '0xd5f7e795000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000067265766572740000000000000000000000000000000000000000000000000000'
        ]
        ]
     */

    // setNumStatus 此状态为通过call方式调用返回的调用结果标记
    var [callSetNumStatus, setNumRes]  = returnData[0]
    console.log(callSetNumStatus, setNumRes)
    
    // true setNum success
    if (callSetNumStatus === true){
        var [setNumSuccess, setNumResStr] = iface.decodeFunctionResult("setNum", setNumRes)
        console.log(setNumSuccess, setNumResStr)
    } else {
        const setNumError = iface.decodeErrorResult("UpgradeContract__ValidateNumError", setNumRes)
        // 9n
        console.log(setNumError[0])
    }
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
