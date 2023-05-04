import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css'
import config from './config.json'
import PropertyRecords from './abis/PropertyRecords.json'
import Page1 from './pages/Page1.js';
import Page2 from './pages/Page2.js';


function App() {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState('');
  const [owner, setOwner] = useState('');
  const [propertyRecords, setPropertyRecords] = useState(null)
  const [activePage, setActivePage] = useState('page1')

  useEffect(() => {
    async function init() {
      // Check if MetaMask is installed
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        try {
          // Request access to the user's MetaMask account
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Get the current account address
          const accounts = await provider.listAccounts();
          setAddress(accounts[0]);

          // set owner
          setOwner(accounts[0])

          // Listen for changes to the current account
          window.ethereum.on('accountsChanged', (accounts) => {
            setAddress(accounts[0]);
          });

          // property records
          const network = await provider.getNetwork()
          const propertyRecords = new ethers.Contract(config[network.chainId].PropertyRecords.address, PropertyRecords, provider)
          setPropertyRecords(propertyRecords)
        } catch (error) {
          console.error(error);
        }
      }
    }
    init();
  }, []);

  useEffect(() => {
    console.log(`Current account: ${address}`);
    setAddress(address)
  }, [address]);

  function handleConnectWallet() {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
      setAddress(accounts[0]);
    }).catch((error) => {
      console.error(error);
    });
  }

  
  function handleTogglePage1() {
    setActivePage('page1');
  }

  function handleTogglePage2() {
    setActivePage('page2');
  }

  return (
    <div className="App">
      <h1 className='text-3xl p-5 font-bold'>Digitalize Properties</h1>
      {address ? (
        <div className='font-bold text-white font-mono'>Connected Account: <span className='text-[#F44E69]'>{address}</span></div>
      ) : (
        <button className="button" onClick={handleConnectWallet}>Connect Wallet</button>
      )}
      <div className="border-[1px] m-[42px]"></div>
      {address && address === owner ? (
        <div>
          <button className='mr-6 bg-[#F44E69] text-white py-2 px-4 rounded-lg' onClick={handleTogglePage1}>Page 1</button>
          <button className='bg-[#F44E69] text-white py-2 px-4 rounded-lg' onClick={handleTogglePage2}>Page 2</button>
          {activePage === 'page1' ? <Page1 provider={provider} contract={propertyRecords} /> : <Page2 provider={provider} contract={propertyRecords} account={address}/>}
        </div>
      ) : (
        <Page2 />
        )}
    </div>
  );
}

export default App;
