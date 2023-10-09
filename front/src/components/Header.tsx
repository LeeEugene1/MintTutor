"use client";

import { useEffect, useRef, useState } from "react";
import Link from 'next/link'
import Web3 from "web3";
import QRCode from "react-qr-code";
import { formatAddress } from "@/utils/func";
import { UseMetaMask } from "@/hooks/UseMetaMask";

const Header:React.FC= () => {
  const [showModal, setShowModal] = useState(false)
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
      connectMetaMask()
      setShowModal(false)
  }
  const handleConnectKlip = () => {
      connectKlip()
      setShowModal(false)
  }
  const handleConnect = () => {
    setShowModal(true)
  }

  const handleCloseModal = (e:any) => {
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <div id="app">
      <header id="navbar" className=''>
        <nav className="border-b border-slate-900/10 py-4 flex justify-between items-center w-[92%] mx-auto">
          <div className="">
            <Link href='/'>HOME</Link>
          </div>
          <div className="">
            <ul className="flex items-center gap-[4vw]">
              <Link href='/list' className="hover:text-gray-500">MINE</Link>
              <Link href='/mint' className="hover:text-gray-500">CREATE</Link>
            </ul>
          </div>
          <div>
            {
              (wallet.accounts.length < 1) ? 
              <button className="px-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm ring-gray-border-300 ring-offset-2 ring-offset-slate-50 
              focus:outline-none focus:ring-2 
              dark:bg-slate-700 dark:text-slate-200 dark:border-transparent"
                onClick={handleConnect}
              >
                Connect Wallet
              </button>
              :
              <button className="px-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm ring-gray-border-300 ring-offset-2 ring-offset-slate-50 
              focus:outline-none focus:ring-2 
              dark:bg-slate-700 dark:text-slate-200 dark:border-transparent"
                onClick={disconnect}
              >
                Disconnect</button>
            }
          
            
          </div>

        </nav>
      </header>
      {
        showModal &&
        <div id="modal">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm
        flex justify-center items-center" onClick={handleCloseModal}>
          </div>
          <div className="shell relative overflow-hidden rounded-none md:rounded-3xl">
            <div className="flex justify-between text-center">
              <h3>Connect wallet</h3>
              <svg onClick={handleCloseModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="modal-body">
                <div className="m-4 space-y-2">
                  <div className="block" onClick={handleConnetWallet}>
                      <button type="button" className="button px-[22px] flex w-full items-center justify-center" data-testid="button-connnect-wallet-injected">
                        <img src="https://snapshot.4everland.link/ipfs/QmTE7VPXMhriKAobMWEiC5S3oG22p4G6AXGyGdNWQTQ3Fv" height="28" width="28" className="-mt-1 mr-2" alt="MetaMask"/> 
                        MetaMask
                      </button>
                  </div>
                  {/* <div className="block">
                        <button type="button" className="button px-[22px] flex w-full items-center justify-center gap-2">
                          <img src="https://snapshot.4everland.link/ipfs/QmZRVqHpgRemw13aoovP2EaQdVtjzXRaQGQZsCLXWaNn9x" height="25" width="25" alt="WalletConnect"/>
                          <span>WalletConnect</span>
                        </button>
                  </div> */}
                    <div className="block">
                        <button type="button" className="button px-[22px] flex w-full items-center justify-center gap-2">
                            <div className="flex justify-center w-[28px]">
                              <img src="/logo_klip.png" className="max-w-[50px]" width="50" alt="Klip"/>
                            </div>
                            <span>Klip</span>
                        </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      }
            
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
        </div>
      }
    </div>
  )
}

export default Header