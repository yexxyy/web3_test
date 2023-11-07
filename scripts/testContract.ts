import { ethers } from "ethers"
import * as dotenv from "dotenv"
import { UpgradeContract__factory } from "../typechain-types"

// dotenv.config({ path: __dirname+'/.env' })
dotenv.config()

async function main() {
    // const nodeUri = process.env.ETH_NODE_URI_GOERLI as string
    const goerliApiKey = process.env.ETH_GOERLI_API_KEY as string
    const rpcProvider = ethers.getDefaultProvider('goerli', { 'alchemy': goerliApiKey })
    const privateKey = process.env.PRIVATE_KEY as string
    const upgradeContractAddress = process.env.UPGRADE_CONTRACT_ADDRESS as string
    console.log(`privateKey: ${privateKey}, goerliApiKey: ${goerliApiKey}`)
    const signer = new ethers.Wallet(privateKey, rpcProvider)
    const upgradeContract = UpgradeContract__factory.connect(upgradeContractAddress, signer)
    const num = await upgradeContract.getNum()
    console.log(`num: ${num}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
