import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, execute } = hre.deployments;

    /**
     * 升级合约要点
     * UpgradeContractV2
     * 指定升级合约 contract: 'UpgradeContract'
     * 移除之前的代理合约参数 proxy
     * 执行之前逻辑合约的 upgradeTo 方法升级到新的逻辑合约
     */
    const upgrade_contract = await deploy('UpgradeContractV3', {
        contract: 'UpgradeContract',
        log: true,
        from: deployer
    });
    await execute("UpgradeContract", { from: deployer, log: true }, "upgradeTo", upgrade_contract.address)
    return true
};
export default func;
func.id = 'deploy_test_upgrade_v3'; // id required to prevent reexecution
func.tags = ['all_v3'];
