const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const  web3 = new Web3(provider);
const {interface,bytecode} = require('../compile')
let accounts;
let inbox;
beforeEach(async ()=>{
    //get a list of all accounts
    //use one of those account to deply the contract

   accounts = await web3.eth.getAccounts();

inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode, arguments: ['Hi There!']}).send(
       {from:accounts[0],gas:'1000000'}
   )
})

describe('Inbox',()=>{
    it('it deploys a contract',()=>{
        assert.ok(inbox.options.address)
    })

    it('has a default message', async ()=>{
        const message = await inbox.methods.message().call();
        assert.strictEqual(message,'Hi There!');
    })
    it('can change the message', async ()=>{
        await inbox.methods.setMessage('Bye Broh!').send({from: accounts[0]})
        const message = await inbox.methods.message().call();
        assert.strictEqual(message,'Bye Broh!');
    })
})














// class Car{
//     park(){
//         return 'stopped'
//     }
//     drive(){
//         return 'vroom'
//     }
// }
// let car;
// beforeEach(()=>{
//      car = new Car();
// })
// describe('Car Class test', ()=>{
//     it('can park',()=>{
//         assert.equal(car.park(),'stopped');
//     });
//     it('can drive',()=>{
//         assert.equal(car.drive(),'vroom');
//     })
// })