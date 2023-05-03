'use client'
import React from 'react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
//https://wagmi.sh/react/getting-started
import { configureChains, createClient, WagmiConfig, useAccount, useConnect } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import Homepage from './Homepage'

const chains = [arbitrum, mainnet, polygon]
const projectId = 'YOUR_PROJECT_ID'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

function Connectwallet() {
    const { address, isConnected } = useAccount()
    return (
        <div>
            <WagmiConfig client={wagmiClient}>
                <Homepage />
            </WagmiConfig>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
            <p>Address: {address ? address : ''}</p>
        </div>
    )
}

export default Connectwallet