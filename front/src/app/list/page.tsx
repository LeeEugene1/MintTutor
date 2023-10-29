"use client"
//url: /list 접속시 page.tsx가 나옴
import React, { FC, useEffect, useState } from 'react'
import { mintAninalTokenContract } from '@/utils';
import { UseMetaMask } from '@/hooks/UseMetaMask';
import { formatAddress } from "@/utils/func";
import Image from 'next/image';
import { useRouter } from 'next/navigation'

import Loading from '@/components/Loading';
import Card from '@/components/Card';

type CardType = {
  tokenId:string,
  tutorType:string,
  name:string
}

export default function List() {
  const router = useRouter()
  const {wallet} = UseMetaMask()
  const [cardList, setCardList] = useState<[] | CardType[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [newCardType, setNewCardType] = useState<string>()
 
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
    res.map(({animalTokenId, animalType}:CardType) => {
      const TutorMap = {
        '1' : 'Julia',
        '2' : 'Daniel',
        '3' : 'Romeo',
        '4' : 'Herim',
        '5' : 'Emma',
        '6' : 'Olivia'
      }
      const name = TutorMap[animalType]
      arr.push({
        tokenId:animalTokenId,
        tutorType:animalType,
        name
      })
    })
    setCardList(arr)
  }
  const onClinkMint = async () => {
    setIsConnecting(true)
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

            const tutorType = await mintAninalTokenContract.methods
            .tutorTypes(tokenIdx)
            .call()

            setNewCardType(tutorType)
            setIsConnecting(false)
        }
    } catch (error) {
        console.error(error)
        setIsConnecting(false)
    }
  }
  const handleChat = (tutorType) => {
    console.log(tutorType)
    router.push(`/chat?tutor=${tutorType}`)
  }
  return (
    <div className='p-8'>
      <p className='text-xl text-slate-700'>Tutor List</p>
      {
            newCardType ? 
            <Card newCardType={newCardType}/> 
            : 
            <div className="mx-auto" onClick={onClinkMint}>
                <button className="flex gap-1 items-center my-5 px-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm ring-gray-border-300 ring-offset-2 ring-offset-slate-50  focus:outline-none focus:ring-2  dark:bg-slate-700 dark:text-slate-200 dark:border-transparent">
                    {isConnecting ? <Loading/> : ''}
                    <span>Create Tutor</span>
                </button>
            </div>
        }
      <div className='px-0 md:px-4 mx-auto max-w-[1012px]'>
          <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
                  {
        cardList.length > 0 &&
        cardList.map(({tokenId, tutorType, name})=> {
            return (
              <div>
                  <div className='border-y border-skin-border bg-skin-block-bg text-base md:rounded-xl md:border mb-0 flex items-center justify-center text-center transition-all hover:border-skin-text'>
                  <div className="p-4 leading-5 sm:leading-6">
                    <div className="relative mb-2 inline-block">
                      <div symbol-index="space" className="mb-1">
                        <Image
                        src={`/images/${tutorType}.png`}
                        width={300}
                        height={300}
                        alt="Picture of Tutor"
                        />
                      </div>
                    </div>
                  <div className="flex items-center justify-center gap-1 truncate">
                    <h3 className="mb-0 mt-0 !h-[32px] overflow-hidden pb-0 text-[22px]">{name}</h3>
                    <div className="cursor-help pt-[1px]">
                      <i className="iconfont iconcheck" style={{fontSize: "20px", lineHeight: "20px"}}></i>
                    </div>
                  </div>
                  <div className="mx-auto">
                    <button
                        className="px-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm ring-gray-border-300 ring-offset-2 ring-offset-slate-50  focus:outline-none focus:ring-2  dark:bg-slate-700 dark:text-slate-200 dark:border-transparent"
                        onClick={()=>handleChat(tutorType)}
                    >
                    Start Chat
                  </button>
                  </div>
                </div>
              </div>
           </div>
          )
        })
        
      }
               
          </div>
      </div>
    </div>
  )
}
