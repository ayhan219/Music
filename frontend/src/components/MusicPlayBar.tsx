import { RootState } from "../app/store";
import { useEffect, useRef, useState } from "react";
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
  const isPlaying = useSelector((state: RootState) => state.musicPlayer.isPlaying);
  const dispatch = useDispatch();
  const musicUrl = useSelector((state: RootState) => state.musicPlayer.musicUrl);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); 

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      dispatch(setIsPlaying(true));
    }
  }, [musicUrl]);

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;


  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full h-24 bg-[#212124] absolute bottom-0 shadow-lg flex justify-between">
      <div className="w-[500px] h-full flex items-center px-10 ">
        <div className="text-primary text-5xl">
          <IoMusicalNote />
        </div>
        <div>
          <p className="text-primary font-bold text-xs">{musicUrl?.musicName}</p>
          <p className="text-xs text-gray-500 font-bold">{musicUrl?.artist}</p>
        </div>
      </div>
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


        <div className="relative w-full h-1 bg-gray-400 rounded-2xl flex items-center">
          <span className="text-xs text-primary absolute left-0 -top-5">{formatTime(currentTime)}</span>

          <div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-2xl transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></div>


          <div
            className="absolute top-[-4px] w-3 h-3 bg-white rounded-full shadow-lg"
            style={{ left: `${progressPercentage}%`, transform: "translateX(-50%)" }}
          ></div>

          <span className="text-xs text-primary absolute right-0 -top-5">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="w-[400px] h-full flex items-center justify-center ">
        <div className="text-primary text-2xl flex gap-8">
          <IoVolumeHighSharp />
          <GiHamburgerMenu />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={musicUrl?.musicUrlToListen}
        onTimeUpdate={handleTimeUpdate} 
        onLoadedMetadata={handleLoadedMetadata} 
      />
    </div>
  );
};

export default MusicPlayBar;
