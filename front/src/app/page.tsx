"use client"
import { useEffect, useRef, useState } from "react";
import { UseMetaMask } from "@/hooks/UseMetaMask";
import Web3 from "web3";

export default function Home() {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const {wallet, connectMetaMask, env} = UseMetaMask()
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
      const exampleMessage = 'Example `personal_sign` message';
      try {
        const from = wallet.accounts;
        const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
        const sign = await window.ethereum.request({
          method: 'personal_sign',
          params: [msg, from, 'Example password'],
        });
        // personalSignResult.innerHTML = sign;
        // personalSignVerify.disabled = false;
      } catch (err) {
        console.error(err);
        // personalSign.innerHTML = `Error: ${err.message}`;
      }
    }
  }

  return (
   <>
    <div>
      <button id="handleConnectMetamask" ref={buttonRef} onClick={handleConnectMetamask}>Connect Metamask</button>
      {wallet.accounts.length > 0 ? wallet.accounts : ''}
    </div>
   </>
  )
}
