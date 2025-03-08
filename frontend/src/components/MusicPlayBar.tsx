import { RootState } from "../app/store";
import React, { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdPause } from "react-icons/io";
import { IoMusicalNote, IoVolumeHighSharp } from "react-icons/io5";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { RxLoop } from "react-icons/rx";
import { VscArrowSwap } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying } from "../features/PlayingMusicSlice";


const MusicPlayBar = () => {
    const isPlaying = useSelector((state:RootState)=>state.musicPlayer.isPlaying)
    const dispatch = useDispatch()
  const musicUrl = useSelector((state: RootState) => state.musicPlayer.musicUrl);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleMusicPlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(setIsPlaying(false));
      } else {
        audioRef.current.play();
        dispatch(setIsPlaying(true));
      }
    }
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [musicUrl]);

  return (
    <div className="w-full h-24 bg-[#212124] absolute bottom-0 shadow-lg flex justify-between">
      <div className="w-[500px] h-full flex items-center px-10 ">
        <div className="text-primary text-5xl">
          <IoMusicalNote />
        </div>
        <div>
          <p className="text-primary font-bold text-xs">Music name</p>
          <p className="text-xs text-gray-500 font-bold">Ayhan Taha</p>
        </div>
      </div>
      {/* Music play area */}
      <div className="w-[500px] h-full flex flex-col justify-evenly ">
        <div className="w-full flex justify-evenly text-primary text-xl ">
          <VscArrowSwap className="cursor-pointer" />
          <MdSkipPrevious className="cursor-pointer" />
          {!isPlaying ? (
            <FaPlay onClick={handleMusicPlay} className="cursor-pointer" />
          ) : (
            <IoMdPause onClick={handleMusicPlay} className="cursor-pointer" />
          )}
          <MdSkipNext className="cursor-pointer" />
          <RxLoop className="cursor-pointer" />
        </div>
        <div className="w-full h-1 bg-gray-400 rounded-2xl"></div>
      </div>
      <div className="w-[400px] h-full flex items-center justify-center ">
        <div className="text-primary text-2xl flex gap-8">
          <IoVolumeHighSharp />
          <GiHamburgerMenu />
        </div>
      </div>
      <audio ref={audioRef} src={musicUrl} />
    </div>
  );
};

export default MusicPlayBar;
