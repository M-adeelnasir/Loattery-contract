const fs = require('fs');
const solc = require('solc');

function compilation() {
    const Lottery = fs.readFileSync('./contracts/Lottery.sol', "utf8")
    let complierInput = {
        language: 'Solidity',
        sources:
        {
            'Lottery.sol':
            {
                content: Lottery
            }
        },
        settings:
        {
            optimizer:
            {
                enabled: true
            },
            outputSelection:
            {
                '*': {
                    '*': ['*']
                }
            }
        }
    };


    console.log("Contract Compiling....");
    const output = JSON.parse(solc.compile(JSON.stringify(complierInput)))
    console.log("contract Complied Successfully");
    // console.log(output);
    const outputContract = output.contracts['Lottery.sol']['lottery']
    // console.log(outputContract);
    module.exports.abi = outputContract.abi
    module.exports.bytecode = outputContract.evm.bytecode.object


}

compilation()