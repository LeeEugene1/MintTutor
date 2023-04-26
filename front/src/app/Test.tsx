'use client'
import React, { useState } from 'react'
import {ethers} from 'ethers'
import Web3Modal from 'web3modal'

const providerOptions = {

}
function Test() {  
  const [web3Provider, setWeb3Provider] = useState(null)
  const connectWallet = async() => {
    try{
      let web3Modal = new Web3Modal({
        cacheProvider:false,
        providerOptions,
      })
      const web3ModalInstance = await web3Modal.connect()
      const web3ModalProvider = ethers.providers.Web3Provider(web3ModalInstance)
      window.console.log(web3ModalProvider)
      if(web3ModalProvider){
        setWeb3Provider(web3ModalProvider)
      }
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