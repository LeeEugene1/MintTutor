"use client"
//url: /list 접속시 page.tsx가 나옴
import React, { useEffect, useState } from 'react'
import { mintAninalTokenContract } from '@/utils';
import { UseMetaMask } from '@/hooks/UseMetaMask';
import { formatAddress } from "@/utils/func";
import Image from 'next/image';

type CardType = {
  animalTokenId:string,
  animalType:string,
  animalPrice:string,
}

export default function List() {
  const {wallet} = UseMetaMask()
  const [cardList, setCardList] = useState<[] | CardType[]>([])
  useEffect(():any => {
    if(!wallet){
      console.log('wallet is undefined')
      return false;
    }
    getNfts()
  },[wallet])
  const getNfts = async () => {
    console.log(wallet.accounts[0])
    if(!wallet.accounts[0])return false;

    const balance = await mintAninalTokenContract.methods.balanceOf(wallet.accounts[0]).call()

    const res = await mintAninalTokenContract.methods.getAnimalTokens(wallet.accounts[0]).call()
    console.log(res)
    let arr:CardType[] = []
    res.map(({animalTokenId, animalType, animalPrice}:CardType) => {
      arr.push({
        animalTokenId,
        animalType,
        animalPrice,
      })
    })
    setCardList(arr)
  }
  return (
    <div>
      <h1>NFT 목록</h1>
      <div>
      {
        cardList.length > 0 &&
        cardList.map(({animalTokenId, animalType, animalPrice})=> {
            return (
            <div>
              <Image
              src={`/images/${animalType}.png`}
              width={300}
              height={300}
              alt="Picture of the author"
              />
              TokenId:{animalTokenId}({animalPrice})
          </div>
          )
        })
      }
      </div>
    </div>
  )
}
