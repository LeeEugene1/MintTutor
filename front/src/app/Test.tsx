'use client'
import React, { useState } from 'react'
// import {ethers} from 'ethers'
// import Web3Modal from 'web3modal'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

const providerOptions = {

}

function Test() {  
  const [web3Provider, setWeb3Provider] = useState(null)
  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
  });
  const connectWallet = async() => {
    try{
      connector.createSession();
      // let web3Modal = new Web3Modal({
      //   cacheProvider:false,
      //   providerOptions,
      // })
      // const web3ModalInstance = await web3Modal.connect()
      // const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance)
      // window.console.log(web3ModalProvider)
      // if(web3ModalProvider){
      //   setWeb3Provider(web3ModalProvider)
      // }
      connector.on("connect", (error, payload) => {
        if (error) {
          throw error;
        }
      
        // Get provided accounts and chainId
        const { accounts, chainId } = payload.params[0];
        console.log(accounts)
      });
    }catch(err){
      window.console.log
    }
  }
  return (
    <>
        <h1>Web3Modal Connection</h1>
        {
            web3Provider == null ? (
                <button onClick={connectWallet}>Connect</button>
            ) : (
                <div>
                    <p>Connected!</p>
                    <p>Address:vvv</p>
                </div>
            )
        }
    </>
  )
}

export default Test