import React, { useEffect, useState } from 'react'
import web3 from './web3'
import lottery from './lottery'
const { ethereum } = window;
const App = () => {

  const [manager, setManger] = useState('')
  const [bal, setBal] = useState("")
  const [players, setPlayers] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   console.log(web3.version);
  //   console.log(web3.eth.getAccounts());
  //   web3.eth.getAccounts().then(res => console.log(res))
  // const account =  ethereum.request({ method: "eth_requestAccounts" });
  // console.log(account);
  // }, [])


  const getManger = async () => {

    const manger_add = await lottery.methods.manager().call();
    setManger(manger_add)
    const players_add = await lottery.methods.getPlayers().call()
    setPlayers(players_add)
    const balance = await lottery.methods.getBalance().call()
    setBal(balance)


  }

  useEffect(() => {
    getManger()


  }, [])


  const handleSubmite = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      // console.log(account);

      const account = await ethereum.request({ method: "eth_requestAccounts" });
      await lottery.methods.addPlayer().send({ from: account[0], value: web3.utils.toWei(amount, 'ether') })
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }


  const handleWinner = async () => {
    console.log("Clicked");
    const account = await ethereum.request({ method: "eth_requestAccounts" });
    try {
      await lottery.methods.pickWinner().send({ from: account[0] })

    } catch (err) {
      console.log(err);
    }

  }

  return (
    <>
      <div>
        <h1>Lottery Contract</h1>
        <p>The Manager of this contract is  <span>{manager}</span>. There are currently {players.length} people entered completing to win {web3.utils.fromWei(bal)} Ethers</p>
      </div>
      <br />
      <hr />
      <br />
      <div>
        <form onSubmit={handleSubmite}>
          <label >Enter Ammount in ethers: </label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <br />
          <button type='submite'>Try Luck</button>
        </form>
      </div>

      <br />
      <button onClick={handleWinner}>Pick a winner</button>
      <br />
      {loading && <h6>Please wait a moment transaction is in progress...</h6>}
    </>
  )
}

export default App