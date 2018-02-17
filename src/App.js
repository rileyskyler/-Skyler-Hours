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
      tokens: [],
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
      })
    })
  }

  inventToken() {
    this.state.skylerHoursInstance.inventToken(this.state.web3.fromAscii("SkylerHours"), {from: this.state.accounts[0]}).then((result) => console.log(result)).then(() => this.getTokenList())
  }

  mintToken() {
    const key = keygen.url()
    this.setState({key})
    console.log(key)
    this.state.skylerHoursInstance.inventToken(this.state.web3.fromAscii('SkylerHours'), this.state.web3.fromAscii(this.state.key), {from: this.state.accounts[0]}).then((result) => {
      console.log(result)
      this.getTokenList()
    })
  }
  
  getTokenList() {
    this.state.skylerHoursInstance.getTokenList.call(this.state.web3.fromAscii("SkylerHours"), {from: this.state.accounts[0]}).then((result) => {
      console.log(result)
    })
  }




        // this.state.skylerHoursInstance.mintToken(tokenName, this.state.key, {from: account}).then((result) => console.log(this.state.key))
  checkToken() {
    // const fromAscii = this.state.web3.fromAscii
    // const account = this.state.accounts[0]
    // const keygener = keygen.url()
    // console.log(keygener)
    // this.state.skylerHoursInstance.checkToken.call(this.state.web3.from(''), this.state.web3.from(''), {from: account}).then((result) => console.log(result))
  }
  
  render() {
    return (
      <div className="App">
        <nav className="">
          <h1><input style={{width: this.state.tokenName.length * 13}}value={this.state.tokenName} onChange={(e) => {
            this.setState({tokenName: e.target.value})
          }}
            
            />Hours</h1>
        </nav>
        <div className="sidebar">
          {this.state.key}
          <button onClick={() => this.inventToken()}>Invent</button>
          <button onClick={() => this.mintToken()}>Mint</button>
          <button onClick={() => this.checkToken()}>Check</button>
        </div>
        <main className="container">
          <span>{this.state.key}</span>
        </main>
      </div>
    );
  }
}

export default App
