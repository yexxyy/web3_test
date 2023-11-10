
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# contract.py in dex_option_price_backend
# Created by yetongxue at 2023/8/31
import json
import os
import asyncio
from pathlib import Path
from web3 import AsyncWeb3, AsyncHTTPProvider
from dotenv import load_dotenv
from pprint import pprint

root_dir = Path(__file__).resolve().parent.parent
load_dotenv()

ETH_NODE_URI_GOERLI = os.environ.get('ETH_NODE_URI_GOERLI')
UPGRADE_CONTRACT_ADDRESS = os.environ.get('UPGRADE_CONTRACT_ADDRESS')


class ContractTest:
    
    def __init__(self):
        web3 = AsyncWeb3(AsyncHTTPProvider(ETH_NODE_URI_GOERLI))
        abi_content = open(os.path.join(root_dir, 'deployments/goerli/UpgradeContract.json')).read()
        abi = json.loads(abi_content)['abi']
        self.contract = web3.eth.contract(address=UPGRADE_CONTRACT_ADDRESS, abi=abi)

    async def getNum(self):
        return await self.contract.functions.getNum().call()

    async def getLogs(self):
        """
        (base) yetongxue@yetongxue web3_test % python3.8 scripts/testAbi.py
        {'address': '0x563e27ee0662bd57010fDb380805059E1e596880',
        'args': AttributeDict({'previousOwner': '0x0000000000000000000000000000000000000000', 'newOwner': '0xAeBeF5a1E547c551a5EC0B8BCf374bF8994fD217'}),
        'blockHash': HexBytes('0xb2f28f9ee98a2b27daf5c32661a253b1a307b657e049b78013c90179cc35cfb0'),
        'blockNumber': 9995335,
        'event': 'OwnershipTransferred',
        'logIndex': 46,
        'transactionHash': HexBytes('0xeee471b09a1726003d66f582f9288f22992f9876666debe672e95cf9f917989f'),
        'transactionIndex': 5}
        {'address': '0x563e27ee0662bd57010fDb380805059E1e596880',
        'args': AttributeDict({'previousOwner': '0xAeBeF5a1E547c551a5EC0B8BCf374bF8994fD217', 'newOwner': '0x379B034e83929b33CF57Fc09b9302C40F0649bDd'}),
        'blockHash': HexBytes('0x0ab6525cfb518ae73b4a936d5653756661a4cce375a456bdbc964f8bf0db9f38'),
        'blockNumber': 10011986,
        'event': 'OwnershipTransferred',
        'logIndex': 13,
        'transactionHash': HexBytes('0xf2b9cba1003084fbd6de10c5b15e7ef8969bc20108febfd42e2971dd56f52abd'),
        'transactionIndex': 6}
        {'address': '0x563e27ee0662bd57010fDb380805059E1e596880',
        'args': AttributeDict({'previousOwner': '0x379B034e83929b33CF57Fc09b9302C40F0649bDd', 'newOwner': '0xAeBeF5a1E547c551a5EC0B8BCf374bF8994fD217'}),
        'blockHash': HexBytes('0x54600b930fb174a202f3d0c9c55aaf4eebbf55879cf2913e2b492c460750917d'),
        'blockNumber': 10012093,
        'event': 'OwnershipTransferred',
        'logIndex': 31,
        'transactionHash': HexBytes('0xcdf074b7e78f7d744e3bd7acca7e40bdf81f4b2c0d65772c4757a6fed31839f9'),
        'transactionIndex': 9}
        """
        logs = await self.contract.events.OwnershipTransferred().get_logs(fromBlock=9995335)
        for log in logs:
            pprint(dict(log))

async def main():
    test = ContractTest()
    num = await test.getNum()
    print(num)
    await test.getLogs()
    


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())






