'use client';
//neopin
import { WalletConnectConnector } from 'nptconnect-web3react-walletconnect-connector';
const POLLING_INTERVAL = 12000; 

export const connector = new WalletConnectConnector({
    rpc: { [chainId]: rpcUrl },
    chainId,
    qrcode: true,
    pollingInterval: POLLING_INTERVAL, // optional
    },
  } as any);
