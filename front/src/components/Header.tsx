"use client";

import { useEffect, useRef, useState } from "react";
import Link from 'next/link'
import Web3 from "web3";
import QRCode from "react-qr-code";
import { formatAddress } from "@/utils/func";
import { UseMetaMask } from "@/hooks/UseMetaMask";
import Loading from "./Loading";
import Timer from "./Timer";
import AOS from 'aos'
import 'aos/dist/aos.css'

const Header:React.FC= () => {
  const [showModal, setShowModal] = useState(false)
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined)
  const navRef = useRef<HTMLButtonElement | null>(null)
  const {wallet, intervalId, QrUrl, connectKlip, resetKlip, isConnecting, connectMetaMask, disconnect, env} = UseMetaMask()
  
  useEffect(()=>{
    if(typeof window.ethereum !== 'undefined'){
      try {
        const web = new Web3(window.ethereum as any)
        setWeb3(web)
      } catch (error) {
        console.log(error) 
      }
    }
    AOS.init()
  },[])

  useEffect(()=>{
    setShowModal(false)
    handleInitModal()
  },[wallet])

  const handleConnect = () => {
    setShowModal(true)
  }

  const handleCloseModal = (e:any) => {
    e.preventDefault()
    setShowModal(false)
    handleInitModal()
  }

  const handleInitModal = () => {
    resetKlip(intervalId)
  }

  const handleModeChange = () => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Whenever the user explicitly chooses light mode
    localStorage.theme = 'light'

    // Whenever the user explicitly chooses dark mode
    localStorage.theme = 'dark'

    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem('theme')
  }

  const handleToggleMenu = () => {
    navRef.current.classList.toggle('hidden')
  }

  return (
    <div id="navbar">
      <header className="bg-[#EBF5FE] p-4 dark:bg-slate-900/75">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-xl font-semibold">
              <Link className="text-header-gradient" href='/home'>Mint Tutor</Link>
            </div>
            <nav className="hidden md:flex items-center space-x-4 transition-menu opacity-100">
              <Link href='/list' className="hover:text-gray-500">TUTOR</Link>
              <Link href='/mint' className="hover:text-gray-500">CREATE</Link>
              <Link href='/chat' className="hover:text-gray-500">CHAT</Link>
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
                  {
                    wallet.accounts.length > 0 &&
                    <div>
                      <p>{formatAddress(wallet.accounts[0])}</p>
                    </div>
                  }
                </button>
              }
              {/* <p onClick={handleModeChange}>Mode</p> */}
            </nav>
            
            <div className="md:hidden">
                <button id="menu-toggle" onClick={handleToggleMenu} className="text-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>
    </header>
    {/* Moblle */}
    <nav ref={navRef} className="hidden flex flex-col transition-menu bg-blue-500 p-4 dark:bg-slate-900/75">
        <Link href='/list' className="text-center hover:text-gray-500">TUTOR</Link>
        <Link href='/mint' className="text-center hover:text-gray-500">CREATE</Link>
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
      </nav>
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
                    {
                      QrUrl.length > 0 ?
                      <div className="m-4 space-y-2" onClick={handleInitModal}>
                         <div className="flex items-center">
                            <div className="flex items-center space-x-2 cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg>
                              <p>뒤로가기</p>
                            </div>
                            
                          </div>
                        <div className="text-center">Scan QR code</div>
                        <div style={{ height: "auto", margin: "0 auto", maxWidth: 100, width: "100%"}}>
                          <QRCode
                          size={356}
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                          value={QrUrl}
                          viewBox={`0 0 256 256`}
                          />
                            <Timer/>
                        </div>
                      </div>
                      :
                      <div className="m-4 space-y-2">
                        <div className="block cursor-pointer" onClick={connectMetaMask}>
                              <button disabled={isConnecting} type="button" className="button px-[22px] flex w-full items-center justify-center" data-testid="button-connnect-wallet-injected">
                                {
                                  isConnecting ? 
                                    <Loading/>
                                    : 
                                    <>
                                    <img src="https://snapshot.4everland.link/ipfs/QmTE7VPXMhriKAobMWEiC5S3oG22p4G6AXGyGdNWQTQ3Fv" height="28" width="28" className="-mt-1 mr-2" alt="MetaMask"/> 
                                      MetaMask
                                    </>
                                }
                              </button>
                          </div>
                          <div className="block cursor-pointer" onClick={connectKlip}>
                              <button disabled={isConnecting} type="button" className="button px-[22px] flex w-full items-center justify-center gap-2">
                                <div className="flex justify-center w-[28px]">
                                  <img src="/logo_klip.png" className="max-w-[50px]" width="50" alt="Klip"/>
                                </div>
                                <span>Klip</span>
                              </button>
                        </div>
                      </div>
                    }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Header