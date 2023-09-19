import Card from '@/components/Card'
import { mintAninalTokenContract } from '@/utils'
import React, { FC, useState } from 'react'

interface MainProps {
    address : string
}

const Main: FC<MainProps> = ({address}) => {
    const [newCardType, setNewCardType] = useState<string>()
    const onClinkMint = async () => {
        try {
            if(!address) return;

            const response = await mintAninalTokenContract.methods
            .mintAnimalToken()
            .send({from: address})
            console.log(response)

            if(response.status){
                const balance = await mintAninalTokenContract.methods.balanceOf(address).call()
            
                const tokenIdx = await mintAninalTokenContract.methods
                .tokenOfOwnerByIndex(address, balance.length - 1).call()

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
    <>
        {
            newCardType ? <Card newCardType={newCardType}/> : <p>Let's mint animal card</p>
        }
        <button onClick={onClinkMint}>MINT</button>
    </>
  )
}

export default Main