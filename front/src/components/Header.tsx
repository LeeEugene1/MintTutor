"use client";

import { UseMetaMask } from '@/hooks/UseMetaMask'
import { ThemeContext } from '@/hooks/theme-provider';
import React,{useState, useEffect, useRef} from 'react'
import Web3 from 'web3'

const Header:React.FC= () => {
  const {value} = ThemeContext()
//   const {wallet, connectMetaMask, env} = UseMetaMask()
//   const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
//   const buttonRef = useRef<HTMLButtonElement | null>(null);

//   useEffect(()=>{
//     if(typeof window.ethereum !== 'undefined'){
//       try {
//         const web = new Web3(window.ethereum as any)
//         setWeb3(web)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//   },[])

// const authorize = async (addr:string) => {
//     const hash2 = web3?.utils.soliditySha3('sbxg-sign', addr)

//     const signature = await window.ethereum
//         .request({
//             method: 'personal_sign',
//             params: [hash2, addr],
//         })
//         .catch(console.log)

//     if (!signature) return false
// }

//   const handleConnectMetamask = async() => {
//     if(wallet.accounts.length < 1){
//         connectMetaMask()
//     }else{
//         const userAddr = wallet.accounts[0]
//         // await authorize(userAddr)
//     }
// }
  return (
    <div>
      <button>test</button>
      {/* <button id="handleConnectMetamask" ref={buttonRef} onClick={handleConnectMetamask}>Connect Metamask</button> */}
    </div>
  )
}

export default Header