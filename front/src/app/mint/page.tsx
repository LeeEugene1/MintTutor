"use client"
import Card from '@/components/Card';
import { UseMetaMask } from '@/hooks/UseMetaMask';
import { mintAninalTokenContract } from '@/utils';
import React, {FC, useState} from 'react'

export default function MINT() {
    const {wallet} = UseMetaMask()
    const [newCardType, setNewCardType] = useState<string>()
    const onClinkMint = async () => {
        try {
            if(!wallet) return;

            const response = await mintAninalTokenContract.methods
            .mintAnimalToken()
            .send({from: wallet.accounts[0]})
            console.debug(response)

            if(response.status){
                const balance = await mintAninalTokenContract.methods.balanceOf(wallet.accounts[0]).call()
            
                const tokenIdx = await mintAninalTokenContract.methods
                .tokenOfOwnerByIndex(wallet.accounts[0], balance.length - 1).call()

                const animalType = await mintAninalTokenContract.methods
                .animalTypes(tokenIdx)
                .call()

                setNewCardType(animalType)
            }
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
        {
            newCardType ? <Card newCardType={newCardType}/> : <p>Let's mint animal card</p>
        }
        <button onClick={onClinkMint}>Create Tutor</button>
    </div>
  )
}
