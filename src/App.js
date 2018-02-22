import React, { Component } from 'react'
import ChainHoursContract from '../build/contracts/ChainHours.json'
import getWeb3 from './utils/getWeb3'
import keygen from 'keygen'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tokenIsValid: '',
      web3: null,
      key: '',
      accounts: [],
      tokens: [],
      chainHoursInstance: {},
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
    const skylerHours = contract(ChainHoursContract)
    skylerHours.setProvider(this.state.web3.currentProvider)
    // Declaring this for later so we can chain functions on skylerHours.
    var chainHoursInstance
    
    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      skylerHours.deployed().then((instance) => {
        chainHoursInstance = instance
        this.setState({chainHoursInstance, accounts})
      })
    })
  }


  inventToken() {
    this.state.chainHoursInstance.inventToken(this.state.web3.fromAscii(this.state.tokenName), {from: this.state.accounts[0]}).then((result) => {
      console.log(result)
    })
  }

  mintToken() {
    let key = Promise.resolve(keygen.url())
    key.then((value) => {
      console.log(value)
      this.setState({key})
      this.state.chainHoursInstance.mintToken(this.state.web3.fromAscii(this.state.tokenName), this.state.web3.fromAscii(this.state.key), {from: this.state.accounts[0]}).then((result) => {
        console.log(result)
        // this.getTokenList()
      })
    })
  }
  
  checkToken() {
    this.state.chainHoursInstance.checkToken.call(this.state.web3.fromAscii(this.state.tokenName), this.state.web3.fromAscii(this.state.key), {from: this.state.accounts[0]}).then((result) => console.log(result))
  }
  
  getTokenList() {
    this.state.chainHoursInstance.getTokenList.call(this.state.web3.fromAscii(this.state.tokenName), {from: this.state.accounts[0]}).then((result) => {
      console.log(result)
    })
  }


  render() {

    return (
      <div className="App">
        <nav className="">
          <h1><input style={{width: this.state.tokenName.length * 13}}value={this.state.tokenName} onChange={(e) => {
            this.setState({tokenName: e.target.value})
          }}/>Hours</h1>
        </nav>
        <div className="sidebar">
          <button onClick={() => this.inventToken()}>Invent</button>
          <button onClick={() => this.mintToken()}>Mint</button>
          <button onClick={() => this.checkToken()}>Check</button>
          <button onClick={() => this.getTokenList()}>Get Token List</button>
        </div>
        <h1>test</h1>
        <main>
        </main>
      </div>
    );
  }
}

export default App
