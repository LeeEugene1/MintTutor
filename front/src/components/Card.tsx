import React, {FC} from 'react'
import Image from 'next/image';
interface CardTypeProps{
    newCardType : string
}

const Card: FC<CardTypeProps> = ({newCardType}) => {
  return (
    <div>
        <Image
        src={`/images/${newCardType}.png`}
        width={300}
        height={300}
        alt="Picture of the author"
        />
    </div>
  )
}

export default Card