'use client'
import React from 'react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
//https://wagmi.sh/react/getting-started
// https://docs.walletconnect.com/2.0/web3modal/react/installation
import { configureChains, createConfig, WagmiConfig, useAccount, useConnect } from 'wagmi'
import { arbitrum, mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import Homepage from './Homepage'
import Main from '../page'

const chains = [arbitrum, polygonMumbai, polygon]
const projectId = 'YOUR_PROJECT_ID'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

function Connectwallet() {
    const { address, isConnected } = useAccount()
    return (
        <div>
            <WagmiConfig config={wagmiClient}>
                <Homepage />
            </WagmiConfig>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
            <p>Address: {address ? address : ''}</p>
            <Main address={address}/>
        </div>
    )
}

export default Connectwallet