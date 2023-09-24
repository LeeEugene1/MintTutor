"use client"
import { useEffect, useRef, useState } from "react";
import { UseMetaMask } from "@/hooks/UseMetaMask";
import Web3 from "web3";
import { formatAddress } from "@/utils/func";
import MetamaskError from "@/components/MetamaskError/MetamaskError";

export default function Home() {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const {wallet, authorize, hasProvider, isConnecting, connectMetaMask, disconnect, env} = UseMetaMask()
  useEffect(()=>{
    if(typeof window.ethereum !== 'undefined'){
      try {
        const web = new Web3(window.ethereum as any)
        setWeb3(web)
      } catch (error) {
        console.log(error) 
      }
    }
  },[])

  const handleConnectMetamask = async () => {
    if(wallet.accounts.length < 1){
      connectMetaMask()
    }else{
      alert('bbb')
    }
  }

  return (
   <>
    <div>
      {
        (!hasProvider || wallet.accounts.length < 1) &&
        <button disabled={isConnecting} id="handleConnectMetamask" ref={buttonRef} onClick={handleConnectMetamask}>Connect Metamask</button>
      }
      {
        hasProvider && wallet.accounts.length > 0 &&
        <div>
          <p>{formatAddress(wallet.accounts[0])}</p>
          <button onClick={disconnect}>Logout</button>
        </div>
      }
      <MetamaskError />
    </div>
   </>
  )
}
