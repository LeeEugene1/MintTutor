'use client'
import React from 'react'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
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
  return (
    <div>
        <WagmiConfig client={wagmiClient}>
            <Homepage />
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

    </div>
  )
}

export default Connectwallet