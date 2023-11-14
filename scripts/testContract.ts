import { ethers } from "ethers"
import * as dotenv from "dotenv"
import { UpgradeContract__factory } from "../typechain-types"

// dotenv.config({ path: __dirname+'/.env' })
dotenv.config()

async function main() {
    const goerliApiKey = process.env.ETH_GOERLI_API_KEY as string
    const rpcProvider = ethers.getDefaultProvider('goerli', { 'alchemy': goerliApiKey })
    const privateKey = process.env.PRIVATE_KEY as string
    const upgradeContractAddress = process.env.UPGRADE_CONTRACT_ADDRESS as string
    console.log(`upgradeContractAddress: ${upgradeContractAddress}`)
    const signer = new ethers.Wallet(privateKey, rpcProvider)
    
    const upgradeContract = UpgradeContract__factory.connect(upgradeContractAddress, signer)
    const ower = await upgradeContract.owner()
    console.log(`ower: ${ower}`)
    const num = await upgradeContract.getNum()
    console.log(`num: ${num}`)

    // 将ower升级到多签钱包
    // const multiSignAddress = process.env.MULTI_SIGN_ADDRESS as string
    // await upgradeContract.transferOwnership(multiSignAddress)
    // const ower = await upgradeContract.owner()
    // console.log(`ower: ${ower}`)

    // 多函数拼接调用
    // await upgradeContract.aggregate()

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
