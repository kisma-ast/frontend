import React from 'react';
import Lottie from 'react-lottie';
// import animationData from '../../assets/20_PARTY_OUT.json'
import animationData from '../../../assets/sticker/home.json'

const  HomeSticker: React.FC = () => {  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className='mb-12 ml-10' >
   
      <Lottie  options={defaultOptions}  width={90} height={90}/>
    </div>
  );
};

export default HomeSticker;
