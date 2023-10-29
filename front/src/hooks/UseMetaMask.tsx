"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, createContext, PropsWithChildren, useContext, useCallback } from 'react'

import detectEthereumProvider from '@metamask/detect-provider'//https://www.npmjs.com/package/@metamask/detect-provider
import { web3 } from '@/utils';

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
    QrUrl: string
    intervalId:number | string
    wallet: WalletState
    hasProvider: boolean | null
    error: boolean
    errorMessage: string
    isConnecting: boolean
    connectMetaMask: () => void
    connectKlip: () => void
    resetKlip: (intervalId:number | string) => void
    disconnect: () => void
    clearError: () => void
    authorize: () => void
    env:EnvState
}
const disconnectedState: WalletState = { accounts:[], balance:'', chainId:''}
const EnvInitialState: EnvState = {VITE_REACT_APP_URL:'',VITE_REACT_APP_AUTH:''}
const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData)

export const MetaMaskContextProvider = ({children}:PropsWithChildren) => {
    const [QrUrl, setQrUrl] = useState('')
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null); // 타입을 명시적으로 선언
    const [counts, setCounts] = useState(0)
    const [wallet, setWallet] = useState(disconnectedState)
    const [hasProvider, setHasProvider] = useState<boolean | null>(null)
    const [isConnecting, setIsConnecting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const clearError = () => setErrorMessage('')
    const [env, setEnv] = useState(EnvInitialState)

    // useCallback ensures that you don't uselessly recreate to _updateWallet function on every render
    const _updateWallet = useCallback(async (providedAccounts?: any[]) => {
        const isWalletInstance = JSON.parse(localStorage.getItem('walletInstance'))
        const isJwt = localStorage.getItem('dapp-auth')
        if(!isWalletInstance && !isJwt){
            //if there are no accounts
            setWallet(disconnectedState)
            return
        }

        let accounts:any[] = []
        let balance = ''
        let chainId = ''

        if(isWalletInstance.logined_platform === 'metamask'){            
            accounts = providedAccounts || await window.ethereum.request(
                {method:'eth_accounts'}
            )
        }else{
            accounts = providedAccounts || [isWalletInstance.userAddress]
        }

        balance = await window.ethereum.request({
            method:'eth_getBalance',
            params:[isWalletInstance.userAddress, 'latest'],
        }) || 0

        chainId = await window.ethereum.request({//klip 일단보류
            method:'eth_chainId'
        }) || null

        setWallet({accounts, balance, chainId})


    },[])

    const updateWalletAndAccounts = useCallback(_updateWallet,[_updateWallet])
    const updateWallet = useCallback((accounts: any) => _updateWallet(accounts),[_updateWallet])

    useEffect(()=>{
        if(counts > 10 && intervalId > 0 && isConnecting){
            resetKlip(intervalId)
            connectKlip()
        }
    },[counts, intervalId])

    /**
     * 1.check if Metamask is installed
     * 2 if yes, updateWallet
     * 3.if no, continue
     * * useEffect + cleanup:it removes the event handlers whenever metamaskProvider is unmounted.
     */
    useEffect(()=>{
        const getProvider = async () => {
            const provider = await detectEthereumProvider({silent:true})
            setHasProvider(Boolean(provider))
            if(provider){
                updateWalletAndAccounts()
                window.ethereum.on('accountsChanged', updateWallet)
                window.ethereum.on('chainChanged', async()=>{
                    await updateWalletAndAccounts()
                    window.location.reload()
                })
            }else{
                console.error('please install metamask')
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

    //metamask only
    const authorize = async () => {
        let accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        })

        const message = 'dapp-sign'
        const hash = web3.utils.soliditySha3(message, accounts[0])
        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [hash, accounts[0]]
        })
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address: accounts[0],
                signature,
            }),
        }

        await fetch('/auth',option)
        .then(res => res.json())
        .then(result => {
            console.log('result',result)
            localStorage.setItem('dapp-auth', JSON.stringify(result))
            localStorage.setItem('walletInstance', JSON.stringify({ userAddress: accounts[0], logined_platform: 'metamask' }));
            updateWallet(accounts)//arr
        })
        .catch(console.log)

    }
    const connectMetaMask = async () => {
        setIsConnecting(true)
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
                await authorize()
            } catch (error) {
                // error instanceof Error && 'code' in error && 
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
                            setErrorMessage(addError.message)
                        }
                    } else {
                        setErrorMessage('canceled')
                    }
            } finally {
                let isLocked = await window.ethereum._metamask.isUnlocked();
                setIsConnecting(false)
                if (!isLocked) {//잠금해제후 다시시작
                    await window.ethereum.request({
                        method: 'eth_requestAccounts',
                    })
                    return connectMetaMask()
                }
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

    const connectKlip = async () => {
        setIsConnecting(true)
        const {request_key} = await fetch("https://a2a-api.klipwallet.com/v2/a2a/prepare", {
            method:'post',
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                bapp: {name:'sheepfarm'},
                type: 'auth'
            })
        })
        .then(res => res.json())

        if(request_key){
            const option = {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    request_key
                }),
            }

            const url = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`
            if (navigator.maxTouchPoints > 1) {//web 아님
              location.href = `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`
            }else{
              setQrUrl(url)
            }
            let count = 0
            const intervalId = setInterval(async () => {
                count++
                const {status, address, jwt_token} = await fetch('/klipResult', option).then(res => res.json())
                console.debug(status)
                if(status === 'completed'){
                    localStorage.setItem('dapp-auth', JSON.stringify({jwt_token}))
                    localStorage.setItem('walletInstance', JSON.stringify({ userAddress: address, logined_platform:'klip' }));
                    await updateWallet([address])
                    resetKlip(intervalId)
                    window.location.reload()
                }
                if(count > 11){
                    resetKlip(intervalId)
                }
                setCounts(count)
                setIntervalId(intervalId)//외부에서 사용
            }, 2000)
        }
    }

    const resetKlip = (id: number | string) => {
        setQrUrl('')
        clearInterval(id)
        setIsConnecting(false)
    }

    const disconnect = async () => {
        localStorage.removeItem('dapp-auth')
        localStorage.removeItem('walletInstance')
        setWallet(disconnectedState)
    }

    return (
        <MetaMaskContext.Provider
        value={{
          QrUrl,
          intervalId,
          wallet,
          hasProvider,
          error: !!errorMessage,
          errorMessage,
          isConnecting,
          connectMetaMask,
          resetKlip,
          connectKlip,
          clearError,
          disconnect,
          authorize,
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
