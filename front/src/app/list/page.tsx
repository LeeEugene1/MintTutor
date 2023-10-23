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
      <h1>Tutor List</h1>
      <div className='px-0 md:px-4 mx-auto max-w-[1012px]'>
          <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
                  {
        cardList.length > 0 &&
        cardList.map(({animalTokenId, animalType, animalPrice})=> {
            return (
              <div>
                  <div className='border-y border-skin-border bg-skin-block-bg text-base md:rounded-xl md:border mb-0 flex items-center justify-center text-center transition-all hover:border-skin-text'>

                  TokenId:{animalTokenId}({animalPrice})
                
                  <div className="p-4 leading-5 sm:leading-6">
                    <div className="relative mb-2 inline-block">
                      <div symbol-index="space" className="mb-1">
                        <Image
                        src={`/images/${animalType}.png`}
                        width={300}
                        height={300}
                        alt="Picture of the author"
                        />
                      </div>
                    </div>
                  <div className="flex items-center justify-center gap-1 truncate">
                    <h3 className="mb-0 mt-0 !h-[32px] overflow-hidden pb-0 text-[22px]">Arbitrum DAO</h3>
                    <div className="cursor-help pt-[1px]">
                      <i className="iconfont iconcheck" style={{fontSize: "20px", lineHeight: "20px"}}></i>
                    </div>
                  </div>
                  <div className="mb-[12px] text-skin-text">266K members</div>
                  <div className="mx-auto">
                    {/* <button type="button" className="button px-[22px] mx-auto group min-w-[125px]">
                      <span>Chat</span>
                    </button> */}
                    <button
                        className="px-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm ring-gray-border-300 ring-offset-2 ring-offset-slate-50  focus:outline-none focus:ring-2  dark:bg-slate-700 dark:text-slate-200 dark:border-transparent"
                    >
                    <span>Chat</span>
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
