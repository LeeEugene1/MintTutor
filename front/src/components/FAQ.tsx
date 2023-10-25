"use client"
import React, { useState } from 'react';

export default function FAQ() {
    const [isOpen, setIsOpen] = useState(Array(4).fill(false)); // 초기에는 모든 아이템이 닫혀있음

    const toggleItem = (index) => {
        const updatedState = [...isOpen];
        updatedState[index] = !updatedState[index];
        setIsOpen(updatedState);
    };

    const faqData = [
        {
            question: 'How does Mint Tutor work?',
            answer:
              'At MintTutor, users can select virtual tutors based on their desired topics or subjects and engage in real-time chat to ask questions and learn. Each tutor is created using Minting (NFT) technology, offering a unique and tailored learning experience.',
        },
        {
        question: 'How are tutors selected on Mint Tutor?',
        answer:
            'Tutors on MintTutor are experts chosen for their specialized skills and knowledge. They are minted as NFTs to ensure users receive top-quality education across various fields.',
        },
        {
        question: 'How is the learning experience personalized on Mint Tutor?',
        answer:
            `MintTutor provides personalized learning paths tailored to each user's learning style and preferences. Learning plans are adjusted based on the user's progress, allowing for customized learning centered around individual interests and goals.                      
            `,
        },
        {
        question: 'How do I actually create Virtual Tutor?',
        answer:
            'You can easily create a virtual tutor through Minting. Since we are using the Polygon network, please prepare a wallet with Polygon assets first.',
        },
      ];
      
  return (
    <section className="w-full my-24" data-v-b444fb2c="">
        <div className="relative max-w-screen-xl px-4 sm:px-8 mx-auto grid grid-cols-12 gap-x-6 overflow-hidden" data-v-b444fb2c="">
          <div data-aos="fade-right" data-aos-delay="150" className="col-span-12 lg:col-span-6 aos-init aos-animate" data-v-b444fb2c="">
            <div className="w-full" data-v-b444fb2c="">
              <img src="/assets/img/customerService.jpeg" alt="" className="w-full" data-v-b444fb2c=""/>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-delay="150" className="col-span-12 lg:col-span-6 px-4 sm:px-6 mt-8 aos-init aos-animate" data-v-b444fb2c="">
            <span className="text-base text-gradient font-semibold uppercase mb-4 sm:mb-2" data-v-b444fb2c="">
              Support
            </span>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-10 sm:mb-6" data-v-b444fb2c="">
            Frequently asked questions</h2>
            <ul className="shadow-box" data-v-b444fb2c="">
            {faqData.map((item, index) => (
                <li key={index} className="relative border-b-2 border-gray-200">
                <button
                    type="button"
                    className="w-full py-4 text-left"
                    onClick={() => toggleItem(index)}
                >
                    <div className="flex items-center justify-between">
                    <span className="font-medium">{item.question}</span>
                    {isOpen[index] ? 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    : 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    }
                    </div>
                    {isOpen[index] && (
                    <div className="relative overflow-hidden transition-all duration-700">
                        <div className="py-2">
                        <p className="text-sm text-gray-700 tracking-wide leading-relaxed">
                            {item.answer}
                        </p>
                        </div>
                    </div>
                    )}
                </button>
                </li>
            ))}
             
                  </ul>
                </div>
              </div>
            </section>
  )
}
