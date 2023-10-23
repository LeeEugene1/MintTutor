import BaseSection from '@/components/BaseSection';
import Link from 'next/link';
import React from 'react';
// import { ArrowUpIcon } from '@heroicons/react/solid';

export default function page() {
  const trendings = [
    {
      id: 1,
      name: 'Bitcoin',
      price: 43180.13,
      logo: 'bitcoin.png',
      increase: true,
      data: [40, 35, 60, 75, 60, 75, 50],
    },
    {
      id: 2,
      name: 'Ethereum',
      price: 3480.65,
      logo: 'ethereum.png',
      increase: false,
      data: [25, 30, 60, 50, 80, 55, 80],
    },
    {
      id: 3,
      name: 'Solana',
      price: 150.2,
      logo: 'solana.png',
      increase: true,
      data: [40, 45, 40, 80, 50, 60, 35],
    },
    {
      id: 4,
      name: 'Dogecoin',
      price: 0.1572,
      logo: 'dogecoin.png',
      increase: true,
      data: [35, 70, 60, 80, 50, 60, 40],
    },
  ]
  const topGainers = [
    {
      id: 1,
      name: 'PAPPAY',
      price: 0.00374,
      logo: 'pappay.png',
      increase: true,
      data: [30, 50, 45, 60, 70, 40, 45],
    },
    {
      id: 2,
      name: 'Bitcoin Asia',
      price: 0.02096,
      logo: 'bitcoin-asia.png',
      increase: true,
      data: [25, 60, 50, 60, 35, 50, 70],
    },
    {
      id: 3,
      name: 'MoonRock',
      price: 0.004907,
      logo: 'moonrock.png',
      increase: true,
      data: [40, 35, 40, 25, 50, 70, 45],
    },
    {
      id: 4,
      name: 'NinjaFloki',
      price: 0.000123,
      logo: 'ninjafloki.png',
      increase: true,
      data: [45, 35, 40, 30, 25, 45, 35],
    },
  ]
  const recents = [
    {
      id: 1,
      name: 'MetaCraft',
      price: 0.0608,
      logo: 'metacraft.png',
      increase: false,
      data: [40, 50, 45, 60, 35, 40, 45],
    },
    {
      id: 2,
      name: 'Frog',
      price: 0.5875,
      logo: 'frog.png',
      increase: false,
      data: [25, 50, 45, 48, 40, 60, 45],
    },
    {
      id: 3,
      name: 'Musk Doge',
      price: 0.04041,
      logo: 'musk-doge.png',
      increase: true,
      data: [25, 35, 60, 45, 50, 45, 45],
    },
    {
      id: 4,
      name: '2SHARE',
      price: 1366.24,
      logo: '2share.png',
      increase: true,
      data: [35, 30, 60, 50, 35, 45, 40],
    },
  ]
  const accordions = [
    {
      title: 'Why should I choose NEFA?',
      description:
        "We're industry pioneers, having been in the cryptocurrency industry since 2016. We've facilitated more than 21 billion USD worth of transactions on our exchange for customers in over 40 countries. Today, we're trusted by over 8 million customers around the world and have received praise for our easy-to-use app, secure wallet, and range of features.",
    },
    {
      title: 'How secure is NEFA?',
      description:
        "We're industry pioneers, having been in the cryptocurrency industry since 2016. We've facilitated more than 21 billion USD worth of transactions on our exchange for customers in over 40 countries. Today, we're trusted by over million customers around the world and have received praise for our easy-to-use app, secure wallet, and range of features.",
    },
    {
      title: 'Do I have to buy a whole Bitcoin?',
      description:
        "We're industry pioneers, having been in the cryptocurrency industry since 2016. We've facilitated more than 21 billion USD worth of transactions on our exchange for customers in over 40 countries. Today, we're trusted by over million customers around the world and have received praise for our easy-to-use app, secure wallet, and range of features.",
    },
    {
      title: 'How do I actually buy Bitcoin?',
      description:
        "We're industry pioneers, having been in the cryptocurrency industry since 2016. We've facilitated more than 21 billion USD worth of transactions on our exchange for customers in over 40 countries. Today, we're trusted by over million customers around the world and have received praise for our easy-to-use app, secure wallet, and range of features.",
    },
  ]
  const steps =  [
    {
      img: 'sign-up.png',
      title: 'Sign Up',
      description:
        'Sign up for your free NEFA Wallet on web, iOS or Android and follow our easy process to set up your profile',
    },
    {
      img: 'fund.png',
      title: 'Fund',
      description:
        'Choose your preferred payment method such as bank transfer or credit card to top up your NEFA Wallet',
    },
    {
      img: 'buy-crypto.png',
      title: 'Buy Crypto',
      description:
        'Buy Bitcoin or Ethereum, then securely store it in your Wallet or send it on easily to your friends anywhere',
    },
  ]
  return (
    <div className="w-full">
      {/* Hero section */}
      <section id="hero" className="w-full h-[100dvh] bg-[#EBF5FE]">
        {/* ... */}
        <BaseSection>
        {/* <div className="grid grid-cols-12"> */}
            <div className="col-span-12 lg:col-span-6 mt-12 xl:mt-10 space-y-4 sm:space-y-6 px-6 text-center sm:text-left">
                <span data-aos="fade-right" data-aos-once="true" className="text-base text-gradient font-semibold uppercase">
                Sign Up Today
                </span>
                <h1
                data-aos="fade-right"
                data-aos-once="true"
                className="text-[2.5rem] sm:text-5xl xl:text-6xl font-bold leading-tight capitalize sm:pr-8 xl:pr-10"
                >
                Create your <span className="text-header-gradient">Personal Tutor</span> on website
                </h1>
                <p data-aos="fade-down" data-aos-once="true" data-aos-delay="300" className="paragraph hidden sm:block">
                Empower Your Learning Journey! Create your customized tutor on our website and embark on a personalized educational adventure tailored just for you.
                </p>
                <div
                data-aos="fade-up"
                data-aos-once="true"
                data-aos-delay="700"
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-2"
                >
                <button
                    className="max-w-full h-[50px] rounded bg-gradient-to-r from-[#468ef9] to-[#0c66ee] border border-[#0c66ee] text-white"
                >
                  <Link className='px-8 py-4' href="/list">Get Started</Link>
                </button>
                {/* <button
                    className="max-w-full rounded px-6 py-4 bg-inherit text-gradient border border-[#0c66ee] flex items-center justify-center"
                >
                    <span>Download App</span>
                </button> */}
                </div>
            </div>
            <div className="hidden sm:block col-span-12 lg:col-span-6">
                <div className="w-full">
                <img
                    data-aos="fade-up"
                    data-aos-once="true"
                    src={'/assets/img/tutor_bg.png'}
                    className="-mt-4"
                    alt=""
                />
                </div>
            </div>
            <img
                data-aos="fade-up"
                data-aos-delay="300"
                src={'/assets/img/pattern/ellipse-1.png'}
                className="hidden sm:block absolute bottom-12 xl:bottom-16 left-4 xl:left-0 w-6"
                alt=""
            />
            <img
                data-aos="fade-up"
                data-aos-delay="300"
                src={'/assets/img/pattern/ellipse-2.png'}
                className="hidden sm:block absolute top-4 sm:top-10 right-64 sm:right-96 xl:right-[32rem] w-6"
                alt=""
            />
            <img
                data-aos="fade-up"
                data-aos-delay="300"
                src={'/assets/img/pattern/ellipse-3.png'}
                className="hidden sm:block absolute bottom-56 right-24 w-6"
                alt=""
            />
            <img
                data-aos="fade-up"
                data-aos-delay="300"
                src={'/assets/img/pattern/star.png'}
                className="hidden sm:block absolute top-20 sm:top-28 right-16 lg:right-0 lg:left-[30rem] w-8"
                alt=""
            />
            {/* </div> */}
        </BaseSection>
      </section>

      <section className="w-full h-[100dvh]">
        <div data-aos="fade-down" className="relative max-w-screen-xl h-full items-center px-4 sm:px-8 mx-auto grid grid-cols-12 gap-x-6 overflow-hidden aos-init aos-animate" data-v-b444fb2c="">
          <div className="col-span-12 lg:col-span-7">
            <div className="w-full">
              <img src="/assets/img/chat_bg.jpeg" alt="" className="w-[95%]"/>
            </div>
          </div>
        <div className="col-span-12 lg:col-span-5 space-y-6 px-4 sm:px-6 mt-20">
          <h2 className="text-4xl font-semibold">
           <span className='text-[25px]'>🚀</span> Welcome to <span className="text-header-gradient">Mint Tutor!</span> 
          </h2> 
          <p className="paragraph">Welcome to MintTutor, where we revolutionize your learning experience! We shape the future of education, creating a virtual world where learning and chatting come together seamlessly.</p>
          </div>
        </div>
      </section>

      {/* Advanced trading tools section */}
      <section className="bg-trading-tools relative max-w-full sm:mx-4 xl:mx-10 my-24 shadow sm:rounded-2xl overflow-hidden" data-v-b444fb2c="">
        <div className="w-full py-16 flex flex-col items-center" >
          <h2 data-aos="flip-down" className="text-3xl sm:text-4xl font-semibold text-center aos-init aos-animate" data-v-b444fb2c="">
            What can you expect?
          </h2> 
          <div data-aos="fade-up" className="relative w-full flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 px-4 xl:px-10 mt-16 sm:mt-8 aos-init aos-animate" data-v-b444fb2c="">
            <div className="max-w-[280px] xl:max-w-[363px] space-y-6 sm:space-y-3 text-center" >
              {/* <img src="/_nuxt/img/sign-up.4afd242.png" alt="" className="max-w-[245px] mx-auto"/>  */}
              <p className="text-[50px] mx-auto">🤖</p>
              <h3 className="text-xl text-neutral-800 font-semibold">Virtual Tutors</h3> 
              <p className="text-sm text-gray-700 leading-relaxed">
              Unique virtual tutors created using cutting-edge Minting (NFT) technology, providing expertise in various fields.              </p>
            </div>
            <div className="max-w-[280px] xl:max-w-[363px] space-y-6 sm:space-y-3 text-center" >
              <p className="text-[50px] mx-auto">💬</p> 
              <h3 className="text-xl text-neutral-800 font-semibold">Real-time Chat</h3> 
              <p className="text-sm text-gray-700 leading-relaxed">
              Engage in real-time conversations with tutors whenever you need, fostering interactive and effective learning.</p>
            </div>
            <div className="max-w-[280px] xl:max-w-[363px] space-y-6 sm:space-y-3 text-center" >
              <p className="text-[50px] mx-auto">📚</p> 
              <h3 className="text-xl text-neutral-800 font-semibold">Tailored Learning Paths</h3> 
              <p className="text-sm text-gray-700 leading-relaxed">
              Receive personalized learning paths designed to meet your individual needs, ensuring efficient and learning experiences.</p>
            </div> 
          </div>
        </div>
      </section>

      {/* Industry-leading security section */}
      <section className="w-full my-24">
        {/* ... */}
      </section>

      {/* Getting started section */}
      <section className="bg-trading-tools relative max-w-full sm:mx-4 xl:mx-10 my-24 shadow sm:rounded-2xl overflow-hidden">
        {/* ... */}
      </section>

      {/* FAQ section */}
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
              <li className="relative border-b-2 border-gray-200" data-v-b444fb2c="">
                <button type="button" className="w-full py-4 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">How does Mint Tutor work?</span>
                    <span aria-hidden="true" role="img" className="material-design-icon chevron-down-icon">
                      <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" className="material-design-icon__svg">
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z">
                        </path>
                      </svg>
                    </span>
                    </div>
                    <div className="relative overflow-hidden transition-all duration-700">
                      <div className="py-2">
                        <p className="text-sm text-gray-700 tracking-wide leading-relaxed">
                        At MintTutor, users can select virtual tutors based on their desired topics or subjects and engage in real-time chat to ask questions and learn. Each tutor is created using Minting (NFT) technology, offering a unique and tailored learning experience.                        </p>
                      </div>
                    </div>
                  </button>
                </li>
                <li className="relative border-b-2 border-gray-200" data-v-b444fb2c="">
                    <button type="button" className="w-full py-4 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">How are tutors selected on Mint Tutor?</span> 
                        <span aria-hidden="true" role="img" className="material-design-icon chevron-down-icon">
                          <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" className="material-design-icon__svg">
                            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z">
                            </path>
                          </svg>
                        </span>
                      </div>
                      <div className="relative overflow-hidden transition-all duration-700">
                        <div className="py-2">
                          <p className="text-sm text-gray-700 tracking-wide leading-relaxed">
                          Tutors on MintTutor are experts chosen for their specialized skills and knowledge. They are minted as NFTs to ensure users receive top-quality education across various fields.                          </p>
                        </div>
                      </div>
                      </button>
                  </li>
                  <li className="relative border-b-2 border-gray-200" data-v-b444fb2c="">
                      <button type="button" className="w-full py-4 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">How is the learning experience personalized on Mint Tutor?</span> <span aria-hidden="true" role="img" className="material-design-icon chevron-down-icon">
                            <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" className="material-design-icon__svg">
                              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z">
                              </path>
                            </svg>
                          </span>
                        </div>
                        <div className="relative overflow-hidden transition-all duration-700">
                          <div className="py-2">
                            <p className="text-sm text-gray-700 tracking-wide leading-relaxed">
                            MintTutor provides personalized learning paths tailored to each user's learning style and preferences. Learning plans are adjusted based on the user's progress, allowing for customized learning centered around individual interests and goals.                      
                            </p>
                          </div>
                        </div>
                      </button>
                    </li>
                    <li className="relative border-b-2 border-gray-200" data-v-b444fb2c="">
                      <button type="button" className="w-full py-4 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">How do I actually create Virtual Tutor?</span> 
                          <span aria-hidden="true" role="img" className="material-design-icon chevron-up-icon">
                            <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" className="material-design-icon__svg">
                              <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z">
                            </path>
                          </svg>
                          </span>
                        </div>
                      </button>
                      <div className="relative overflow-hidden transition-all duration-700">
                        <div className="py-2">
                          <p className="text-sm text-gray-700 tracking-wide leading-relaxed">
                          You can easily create a virtual tutor through Minting. Since we are using the Polygon network, please prepare a wallet with Polygon assets first.                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

      <div className="w-full my-10 flex justify-center">
        <a
          href="#navbar"
          className="px-6 py-3 flex items-center space-x-2 bg-[#FAFAFA] hover:bg-gray-100 hover:shadow-md border border-[#DDDDDD] rounded-md text-gray-700"
        >
          <span>Back to top</span>
          {/* <ArrowUpIcon className="h-5 w-5" /> */}
        </a>
      </div>
    </div>
  );
};