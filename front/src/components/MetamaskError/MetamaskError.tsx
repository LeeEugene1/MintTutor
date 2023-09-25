import { UseMetaMask } from '@/hooks/UseMetaMask'
import React from 'react'
import styles from './MetamaskError.module.css'

export default function MetamaskError() {
  const { error, errorMessage, clearError} = UseMetaMask()
    return (
      <div className={styles.metaMaskError}>
        <div>MetamaskError: {errorMessage}</div>
      </div>
  )
}
