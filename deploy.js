const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'exhibit act blouse seek return screen special offer jazz erase lottery shallow',
    'https://rinkeby.infura.io/v3/7d958f281c6e4286883df928e0518763'
)

const web3 = new Web3(provider)

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });
    console.log('Contract deployed to', result.options.address)
}

deploy()

