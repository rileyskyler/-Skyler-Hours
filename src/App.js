import React, { Component } from 'react'
import SkylerHoursContract from '../build/contracts/SkylerHours.json'
import getWeb3 from './utils/getWeb3'
import keygen from 'keygen'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tokenIsValid: '',
      web3: null,
      keygen: 'jj',
      accounts: [],
      skylerHoursInstance: {}
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
    console.log(this.state.web3.personal.getListAccounts)
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

  createToken() {
    this.state.skylerHoursInstance.createToken(this.state.web3.fromAscii(this.state.keygen), {from: this.state.accounts[0], gas: 3000000})
    .then((result)=> {
      console.log(result)
      this.state.skylerHoursInstance.checkToken(this.state.web3.fromAscii(this.state.keygen), {from: this.state.accounts[0]}).then((result) =>  {
        this.setState({tokenIsValid: result + ''})
      }) 
    })
  }
  

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <span>This is the keygen: {this.state.keygen}</span>
              <p>The token is: {this.state.tokenIsValid}</p>
            </div>
            <div>
              <span>Key:</span>
              <input placeholder='key'/>
              <button onClick={() => this.createToken()}>Here</button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
