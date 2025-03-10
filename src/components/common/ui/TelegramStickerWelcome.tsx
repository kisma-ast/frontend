import React from "react";
import LottieSticker from "../../clients/props/lottieSticker";
import logo from "../../../assets/Final Logo/Logo File/Favicon-Icon.png";

interface TelegramStickerWelcomeProps {
  stickerData: object; // Le JSON pour le sticker
}

const TelegramStickerWelcome: React.FC<TelegramStickerWelcomeProps> = ({ stickerData }) => {
  

  return (
    <div className="w-full max-w-md backdrop-blur-lg bg-white/5 border-none shadow-xl relative">
      <div className="absolute -top-[170px] left-1/2 transform -translate-x-1/2">
        <img src={logo} className="w-20 h-20" alt="Logo" />
      </div>
      <div className="absolute -top-[90px] bottom-100 left-[50%] -transform mb-10 -translate-x-1/2">
        <LottieSticker stickerData={stickerData} height={100} width={100}/>
    </div>
    </div>
  );
};

export default TelegramStickerWelcome;
