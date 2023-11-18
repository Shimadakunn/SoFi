import { ConnectButton } from '@rainbow-me/rainbowkit';
import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi'


const Main = () => {
  const { address, isConnected } = useAccount()
  const [number, setNumber] = useState(0);
  const endValue = 80;
  const duration = 1000; // Duration in milliseconds

  useEffect(() => {
    if (isConnected) {
      let start = null;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const easedValue = easeInOutCubic(progress / duration) * endValue;

        setNumber(Math.min(easedValue, endValue));

        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      };

      // Easing function - easeInOutCubic
      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      window.requestAnimationFrame(step);
    } else {
      // Reset the number to 0 if disconnected
      setNumber(0);
    }
  }, [isConnected]);
  return (
    
      <div className="flex items-center justify-center overflow-hidden">
        <img src='../bg.jpg' alt="main" className="scale-[150%] "/>
        <div className="absolute top-[25px] right-[20%]">
          <ConnectButton label="Connect"/>
        </div>
        {isConnected ? <div className="absolute top-[40px] left-[27%] w-[20vw]">
          <ProgressBar completed={Math.round(number)} customLabel=" " bgColor="#7b3fe4"/>
        </div>: null}
        <div className="absolute h-[60vh] w-[60vw] bg-white/10 backdrop-blur-[4px] border border-gray-200 shadow-lg p-6 rounded-lg flex items-start justify-start space-y-4 divide-y divide-slate-700 flex-col">
          <div className="w-full flex items-center justify-around">
            <div>Assets</div>
            <div>APY</div>
            <div>
            <div className="bg-transparent text-transparent rounded-lg px-4 py-2">Deposit</div>
            </div>
          </div>
          <div className="w-full flex items-center justify-around pt-4">
            <div>Assets</div>
            <div>APY</div>
            <div>
            <button className="bg-[#7b3fe4] text-white rounded-lg px-4 py-2">Deposit</button>
            </div>
          </div>
          <div className="w-full flex items-center justify-around pt-4">
            <div>Assets</div>
            <div>APY</div>
            
          </div>
        </div>
      </div>

  )
};
export default Main