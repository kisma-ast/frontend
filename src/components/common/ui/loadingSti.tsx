import React from 'react';
import stickerWelcome from '../../assets/sticker/start.json'
import LottieSticker from '../clients/props/lottieSticker';
const TelegramSticker: React.FC = () => {
  

  return (
    <div className="flex items-center">
    <LottieSticker title="test" stickerData={stickerWelcome} height={25} width={25}/> 
    </div>
  );
};

export default TelegramSticker;
