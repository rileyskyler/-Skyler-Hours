import React, { Component } from 'react'
import SkylerHoursContract from '../build/contracts/SkylerHours.json'
import getWeb3 from './utils/getWeb3'
import keygen from 'keygen'
import './App.css'
import './min.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tokenIsValid: '',
      web3: null,
      key: '',
      accounts: [],
      skylerHoursInstance: {},
      tokenName: 'Skyler'
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      // Instantiate contract once web3 provided.
        this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
    // this.setState({keygen: keygen.url()})
  }
  
  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    const contract = require('truffle-contract')
    const skylerHours = contract(SkylerHoursContract)
    skylerHours.setProvider(this.state.web3.currentProvider)
    // Declaring this for later so we can chain functions on skylerHours.
    var skylerHoursInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      skylerHours.deployed().then((instance) => {
        skylerHoursInstance = instance
        this.setState({skylerHoursInstance, accounts})
        console.log(this.state.skylerHoursInstance)
        
      })
    })
  }

  inventToken() {
    const fromAscii = this.state.web3.fromAscii
    const tokenName = fromAscii(this.state.tokenName)
    const account = this.state.accounts[0]
    this.state.skylerHoursInstance.inventToken(tokenName, {from: account}).then((r)=> console.log(r))
  }

  mintToken() {
    const fromAscii = this.state.web3.fromAscii
    const tokenName = fromAscii(this.state.tokenName)
    const account = this.state.accounts[0]
    this.setState({key: keygen.url()})
    this.state.skylerHoursInstance.mintToken(tokenName, "this.state.key", {from: account})
  }

  checkToken() {
    const fromAscii = this.state.web3.fromAscii
    const tokenName = fromAscii(this.state.tokenName)
    const account = this.state.accounts[0]
    this.state.skylerHoursInstance.checkToken.call(tokenName, "this.state.key", {from: account}).then((result) => console.log(result))
  }
  
  render() {
    return (
      <div className="App">
        <nav className="">
          <h1><input value={this.state.tokenName} onChange={(e) => this.setState({tokenName: e.target.value})}/>Hours</h1>
        </nav>

        <main className="container">
          <button onClick={() => this.inventToken()}>Invent</button>
          <button onClick={() => this.mintToken()}>Mint</button>
          <button onClick={() => this.checkToken()}>Check</button>
          <span>{this.state.key}</span>
        </main>
      </div>
    );
  }
}

export default App
