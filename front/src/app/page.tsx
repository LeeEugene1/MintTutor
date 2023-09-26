"use client"
import { useEffect, useRef, useState } from "react";
import { UseMetaMask } from "@/hooks/UseMetaMask";
import Web3 from "web3";
import { formatAddress } from "@/utils/func";
import MetamaskError from "@/components/MetamaskError/MetamaskError";
import QRCode from "react-qr-code";

export default function Home() {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const {wallet, QrUrl, connectKlip, isConnecting, connectMetaMask, disconnect, env} = UseMetaMask()
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

  const handleConnetWallet = async () => {
    if(wallet.accounts.length < 1){
      connectMetaMask()
    }
    
  }
  const handleConnectKlip = () => {
    if(wallet.accounts.length < 1){
      connectKlip()
    }
  }
  return (
   <>
    <div>
      {/* connectWallet */}
      {
        (wallet.accounts.length < 1) &&
        <>
          <button disabled={isConnecting} id="handleConnectMetamask" ref={buttonRef} onClick={handleConnetWallet}>Connect Metamask</button>
          <button disabled={isConnecting} onClick={handleConnectKlip}>Klip</button>
          {
            QrUrl.length > 0 &&
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
              <QRCode
              size={356}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={QrUrl}
              viewBox={`0 0 256 256`}
              />
            </div>
          }
        </>
      }
      {
        wallet.accounts.length > 0 &&
        <div>
          <p>{formatAddress(wallet.accounts[0])}</p>
          <button onClick={disconnect}>Logout</button>
        </div>
      }
      {/* Error */}
      <MetamaskError />
    </div>
   </>
  )
}
//여기는 메인페이지