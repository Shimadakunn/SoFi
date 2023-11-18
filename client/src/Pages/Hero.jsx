import React from 'react'
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';

const spline = "https://prod.spline.design/PRWhJdqWeznu6IS5/scene.splinecode"
const Hero = () => {
    const navigate = useNavigate();
  return (
    <div className="h-screen relative">
        <Spline scene={spline} className="absolute"/>
        <button className="absolute top-[40%] left-[53%] transform -translate-x-1/2 -translate-y-1/2 w-[26rem] h-24" onClick={()=> { navigate('/main');}}></button>
    </div>
  )
}

export default Hero
