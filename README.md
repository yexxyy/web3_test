# Boilerplate for ethereum solidity smart contract development

## INSTALL

```bash
yarn
```

## TEST

There are 3 flavors of tests: hardhat, dapptools and forge

### hardhat

- One using hardhat that can leverage hardhat-deploy to reuse deployment procedures and named accounts:

```bash
yarn test
```

### [dapptools](https://dapp.tools)

```bash
dapp test
```

The latter requires additional step to set up your machine:

Install dapptools (Following instruction [here](https://github.com/dapphub/dapptools#installation)):

```bash
# user must be in sudoers
curl -L https://nixos.org/nix/install | sh

# Run this or login again to use Nix
. "$HOME/.nix-profile/etc/profile.d/nix.sh"

curl https://dapp.tools/install | sh
```

Then install solc with the correct version:

```bash
nix-env -f https://github.com/dapphub/dapptools/archive/master.tar.gz -iA solc-static-versions.solc_0_8_9
```

### forge

```bash
forge test
```

This require the installation of forge (see [foundry](https://github.com/gakonst/foundry))

## SCRIPTS

Here is the list of npm scripts you can execute:

Some of them relies on [./\_scripts.js](./_scripts.js) to allow parameterizing it via command line argument (have a look inside if you need modifications)
<br/><br/>

### `yarn prepare`

As a standard lifecycle npm script, it is executed automatically upon install. It generate config file and typechain to get you started with type safe contract interactions
<br/><br/>

### `yarn format` and `yarn format:fix`

These will format check your code. the `:fix` version will modifiy the files to match the requirement specified in `.prettierrc.`
<br/><br/>

### `yarn compile`

These will compile your contracts
<br/><br/>

### `yarn void:deploy`

This will deploy your contracts on the in-memory hardhat network and exit, leaving no trace. quick way to ensure deployments work as intended without consequences
<br/><br/>

### `yarn test [mocha args...]`

These will execute your tests using mocha. you can pass extra arguments to mocha
<br/><br/>

### `yarn coverage`

These will produce a coverage report in the `coverage/` folder
<br/><br/>

### `yarn gas`

These will produce a gas report for function used in the tests
<br/><br/>

### `yarn dev`

These will run a local hardhat network on `localhost:8545` and deploy your contracts on it. Plus it will watch for any changes and redeploy them.
<br/><br/>

### `yarn local:dev`

This assumes a local node it running on `localhost:8545`. It will deploy your contracts on it. Plus it will watch for any changes and redeploy them.
<br/><br/>

### `yarn execute <network> <file.ts> [args...]`

This will execute the script `<file.ts>` against the specified network
<br/><br/>

### `yarn deploy <network> [args...]`

This will deploy the contract on the specified network.

Behind the scene it uses `hardhat deploy` command so you can append any argument for it
<br/><br/>

### `yarn export <network> <file.json>`

This will export the abi+address of deployed contract to `<file.json>`
<br/><br/>

### `yarn fork:execute <network> [--blockNumber <blockNumber>] [--deploy] <file.ts> [args...]`

This will execute the script `<file.ts>` against a temporary fork of the specified network

if `--deploy` is used, deploy scripts will be executed
<br/><br/>

### `yarn fork:deploy <network> [--blockNumber <blockNumber>] [args...]`

This will deploy the contract against a temporary fork of the specified network.

Behind the scene it uses `hardhat deploy` command so you can append any argument for it
<br/><br/>

### `yarn fork:test <network> [--blockNumber <blockNumber>] [mocha args...]`

This will test the contract against a temporary fork of the specified network.
<br/><br/>

### `yarn fork:dev <network> [--blockNumber <blockNumber>] [args...]`

This will deploy the contract against a fork of the specified network and it will keep running as a node.

Behind the scene it uses `hardhat node` command so you can append any argument for it

### 助记词转私钥
```
# mnemonic2private_key.py
from web3 import Web3
w3 = Web3()

# test mnemonic from ganache (don't use it!)
mnemonic = "助记词 xxx"

w3.eth.account.enable_unaudited_hdwallet_features()
for i in range(10):
    acc = w3.eth.account.from_mnemonic(mnemonic, account_path=f"m/44'/60'/0'/0/{i}")
    print(f"\naddress{i + 1} = '{acc.address}'")
    print(f"private{i + 1} = '{w3.to_hex(acc.key)}'")
```

### 测试多个方法拼接调用
```
(base) yetongxue@yetongxue web3_test % yarn hardhat deploy --network goerli --tags all_v4
yarn run v1.22.19
$ hardhat deploy --network goerli --tags all_v4
Generating typings for: 1 artifacts in dir: typechain-types for target: ethers-v6
Successfully generated 56 typings!
Compiled 1 Solidity file successfully (evm target: london).
deploying "UpgradeContractV4" (tx: 0xf8b0190a0000d6611c974a16c5243dc94c8b20b46620e181db38ea2b03754a84)...: deployed at 0xD24f495aa24447F2Ac95D733C3EB2c9b31af9FD8 with 1397500 gas
executing UpgradeContract.upgradeTo (tx: 0xb0ede13be0e438d0f56932836761b4b5804e6f728c9b49e6b0926035d688025a) ...: performed with 38969 gas
✨  Done in 63.29s.
```
