import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, execute } = hre.deployments;

    // proxy only in non-live network (localhost and hardhat network) enabling HCR (Hot Contract Replacement)
    // in live network, proxy is disabled and constructor is invoked
    const upgrade_contract = await deploy('UpgradeContractV2', {
        contract: 'UpgradeContract',
        log: true,
        from: deployer
    });
    await execute("UpgradeContract", { from: deployer, log: true }, "upgradeTo", upgrade_contract.address)
    return true
};
export default func;
func.id = 'deploy_test_upgrade_v2'; // id required to prevent reexecution
func.tags = ['all_v2'];
