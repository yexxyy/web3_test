import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;

    // proxy only in non-live network (localhost and hardhat network) enabling HCR (Hot Contract Replacement)
    // in live network, proxy is disabled and constructor is invoked
    await deploy('UpgradeContract', {
        log: true,
        from: deployer,
        proxy: {
            proxyContract: "TestProxy",
            proxyArgs: ["{implementation}", "{data}"],
            execute: {
                init: {
                    methodName: "initialize",
                    args: [],
                }
            }
        }
    });

    return true
};
export default func;
func.id = 'deploy_test_upgrade'; // id required to prevent reexecution
func.tags = ['all'];
