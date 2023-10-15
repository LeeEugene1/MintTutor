import { UseMetaMask } from '@/hooks/UseMetaMask'
import React, { useEffect, useState } from 'react'

export default function Timer() {
    const {intervalId} = UseMetaMask()
    const [timer, setTimer] = useState(21);
    useEffect(() => {
        if(intervalId === null)return
        const timerId = setInterval(() => {
          setTimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 0);
        }, 1000);
    
        // 20초가 지날 때마다 타이머를 리셋
        const resetTimer = () => {
          setTimer(20);
        };
    
        const timerResetInterval = setInterval(() => {
          resetTimer();
        }, 20000); // 20초마다 리셋
    
        // 컴포넌트가 언마운트되면 타이머를 정리
        return () => {
          clearInterval(timerId);
          clearInterval(timerResetInterval);
        };
      }, [intervalId]); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행
    
      return (
        <div>
          <p className='text-center text-gray-500'>{timer}:00</p>
        </div>
      );
}
