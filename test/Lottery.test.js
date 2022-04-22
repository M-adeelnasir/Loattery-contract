const ganache = require('ganache-cli');
const assert = require('assert');
const Web3 = require('web3');
const { abi, bytecode } = require('../compile')

const web3 = new Web3(ganache.provider());


let accounts
let result
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    // console.log(accounts);

    result = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' })
    // console.log(result);

})


describe("Lotther Contract", () => {
    it("Contract deplyed ?", () => {
        assert.ok(result.options.address)
    })
    it("Enter in contract", async () => {
        await result.methods.addPlayer().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        })

        const players = await result.methods.getPlayers().call({
            from: accounts[0]
        })

        assert.equal(accounts[0], players[0])
        assert.equal(1, players.length)

    })
    it("Enter Mutiple players in contract", async () => {
        await result.methods.addPlayer().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        })
        await result.methods.addPlayer().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        })
        await result.methods.addPlayer().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        })

        const players = await result.methods.getPlayers().call({
            from: accounts[0]
        })

        assert.equal(accounts[0], players[0])
        assert.equal(3, players.length)

    })

    it("require Minimum Ammount to enter in contract ", async () => {
        try {
            await result.methods.addPlayer().send({
                from: accounts[0],
                value: 0
            })
            assert(fasle)
        } catch (err) {
            assert(err)
        }

    })

    it("only manager can pick a winner", async () => {
        try {
            await result.methods.pickWinner().send({
                from: accounts[1],
            })
            assert(false)
        } catch (err) {
            assert(err)
        }
    })


})