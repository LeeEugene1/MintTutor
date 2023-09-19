"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, createContext, PropsWithChildren, useContext, useCallback } from 'react'

import detectEthereumProvider from '@metamask/detect-provider'//https://www.npmjs.com/package/@metamask/detect-provider

interface WalletState {
    accounts: any[]
    balance: string
    chainId: string
}

interface EnvState{
    VITE_REACT_APP_URL:string,
    VITE_REACT_APP_AUTH:string
}

interface MetaMaskContextData {
    wallet: WalletState
    // hasProvider: boolean | null
    error: boolean
    errorMessage: string
    // isConnecting: boolean
    connectMetaMask: () => void
    clearError: () => void
    env:EnvState
}
const disconnectedState: WalletState = { accounts:[], balance:'', chainId:''}
const EnvInitialState: EnvState = {VITE_REACT_APP_URL:'',VITE_REACT_APP_AUTH:''}
const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData)

export const MetaMaskContextProvider = ({children}:PropsWithChildren) => {
    // const [hasProvider, setHasProvider] = useState<boolean | null>(null)
    // const [isConnecting, setIsConnecting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const clearError = () => setErrorMessage('')
    const [wallet, setWallet] = useState(disconnectedState)
    const [env, setEnv] = useState(EnvInitialState)
    // useCallback ensures that you don't uselessly recreate to _updateWallet function on every render
    const _updateWallet = useCallback(async (providedAccounts?: any) => {
        const accounts = providedAccounts || await window.ethereum.request(
            {method:'eth_accounts'}
        )

        if(accounts.length === 0){
            //if there are no accounts
            setWallet(disconnectedState)
            return
        }

        const balance = await window.ethereum.request({
            method:'eth_getBalance',
            params:[accounts[0], 'latest'],
        })

        const chainId = await window.ethereum.request({
            method:'eth_chainId'
        })

        setWallet({accounts, balance, chainId})
    },[])

    const updateWalletAndAccounts = useCallback(_updateWallet,[_updateWallet])
    const updateWallet = useCallback((accounts: any) => _updateWallet(accounts),[_updateWallet])

    useEffect(()=>{
        console.debug('mode',process.env.NODE_ENV)
        // if(import.meta.env){
        //     const VITE_ENV = import.meta.env
        //     console.debug(VITE_ENV)
        //     const {VITE_REACT_APP_URL, VITE_REACT_APP_AUTH} = VITE_ENV
        //     setEnv({VITE_REACT_APP_URL, VITE_REACT_APP_AUTH})
        // }
    },[])//딱 1번만

    /**
     * 1.check if Metamask is installed
     * 2 if yes, updateWallet
     * 3.if no, redirect install Metamask
     * * useEffect + cleanup:it removes the event handlers whenever metamaskProvider is unmounted.
     */
    useEffect(()=>{
        const getProvider = async () => {
            const provider = await detectEthereumProvider({silent:true})

            if(provider){
                updateWalletAndAccounts()
                window.ethereum.on('accountsChanged', updateWallet)
                window.ethereum.on('chainChanged', async()=>{
                    await updateWalletAndAccounts()
                    window.location.reload()
                })
            }else{
                console.error('please install metamask')
                isMetamaskInstalled()
            }
        }
        getProvider()
        return () => {
            window.ethereum?.removeListener('accountsChanged', updateWallet)
            window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts)
        }
    },[updateWallet, updateWalletAndAccounts])

    const isMetamaskInstalled = () => {
        if (!window.ethereum) {
            let webStoreUrl =
                'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'

            window.open(webStoreUrl, '_blank')
            return false
        } else {
            return true
        }
    }

    const connectMetaMask = async () => {
        console.log('cm')
        const connectNetwork = async (chainId:string, chainName:string, rpcUrls:string) => {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                        {
                            chainId,
                        },
                    ],
                })
            } catch (error) {
                if (error instanceof Error && 'code' in error) {
                    if (error.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainId,
                                        chainName,
                                        rpcUrls: [rpcUrls],
                                    },
                                ],
                            })
                            return true //'Network added and switched successfully';
                        } catch (addError) {
                            throw addError
                        }
                    } else {
                        throw new Error('canceled')
                    }
                }
            } finally {
                let isLocked = await window.ethereum._metamask.isUnlocked();
                if (!isLocked) {//잠금해제후 다시시작
                    await window.ethereum.request({
                        method: 'eth_requestAccounts',
                    })
                    return connectMetaMask()
                }
                let walletAddress = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                })
                updateWallet(walletAddress)
            }
        }
        if (!isMetamaskInstalled()) {
            return false
        }
        if (window.location.href.includes('localhost') || window.location.href.includes('test')) {
            connectNetwork(
                '0x13881', //80001
                'Polygon Mumbai',
                'https://rpc-mumbai.maticvigil.com'
            )
        } else {
            connectNetwork(
                '0x89', //137
                'Polygon Mainnet',
                'https://polygon-rpc.com/'
            )
        }
    }

    return (
        <MetaMaskContext.Provider
        value={{
          wallet,
        //   hasProvider,
          error: !!errorMessage,
          errorMessage,
        //   isConnecting,
          connectMetaMask,
          clearError,
          env
        }}
      >
        {children}
      </MetaMaskContext.Provider>
    )
}

export const UseMetaMask = () => {
    const context = useContext(MetaMaskContext)
    if(context === undefined){
        throw new Error('useMetaMask must be used within a "MetaMaskContextProvider')
    }
    return context
}
