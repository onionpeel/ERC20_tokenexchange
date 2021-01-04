import React, { useEffect } from 'react';
import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
const TEMP_PRIVATE_KEY = 'b5b9941f219d78a896fbdfe571df2e756a846e57bcc853cdd8f445a6b4e5f983';
function App() {

  useEffect(() => {
    //create a web3 instance uses websockts and grants access to the private
    //key via HDWalletProvider.  The on() function needs to be added to HDWalletProvider
    //because it is not part of HDWalletProvider and is necessary for a websocket connection
    const wsProvider = new Web3.providers.WebsocketProvider("http://127.0.0.1");
    HDWalletProvider.prototype.on = wsProvider.on.bind(wsProvider);
    const provider = new HDWalletProvider(TEMP_PRIVATE_KEY, wsProvider);
    const web3ws = new Web3(provider);

    const initializeWeb3 = async () => {

    };

    return
  }, []);

  return (
    <div className="App">
      la la la
    </div>
  );
}

export default App;
