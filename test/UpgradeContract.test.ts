import { expect } from 'chai';
import { ethers, deployments, getUnnamedAccounts } from 'hardhat';
import { UpgradeContract } from '../typechain-types';
import { setupUsers } from './utils';

const setup = deployments.createFixture(async () => {
    await deployments.fixture('local');
    const contracts = {
        UpgradeContract: await ethers.getContract<UpgradeContract>('UpgradeContract'),
    };
    const users = await setupUsers(await getUnnamedAccounts(), contracts);
    return {
        ...contracts,
        users,
    };
});
describe('UpgradeContract', function () {
    it('getNum equal 8', async function () {
        const { users, UpgradeContract } = await setup();
        expect(await UpgradeContract.getNum()).to.equal(8)
    });
});
