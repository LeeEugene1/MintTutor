import { mintAninalTokenContract } from '@/contracts'
import React, { FC, useState } from 'react'

interface MainProps {
    address : string
}

const Main: FC<MainProps> = ({address}) => {
    const [newCard, setNewCard] = useState<string>()
    const onClinkMint = async () => {
        try {
            if(!address) return;
            const response = await mintAninalTokenContract.methods
            .mintAnimalToken()
            .send({from: address})
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <>
        {
            newCard ? <div>AnimalCard</div> : <p>Let's mint animal card</p>
        }
        <button onClick={onClinkMint}>MINT</button>
    </>
  )
}

export default Main