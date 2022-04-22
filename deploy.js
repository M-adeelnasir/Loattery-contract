const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { abi, bytecode } = require('./compile')

const mnemonicPhrase = 'YOUR_ACCOUNTS_mnemonic';

let provider = new HDWalletProvider(
    mnemonicPhrase,
    'INFURA_API_NETWORK_LINK'
)

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Account is deployed on account===>", accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' })

    console.log("Contract Deployed on Address====>", result.options.address);

    provider.engine.stop()
}

deploy()
