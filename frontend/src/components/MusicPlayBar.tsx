import { RootState } from "../app/store";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaVolumeMute } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdPause } from "react-icons/io";
import { IoVolumeHighSharp } from "react-icons/io5";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { RxLoop } from "react-icons/rx";
import { VscArrowSwap } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying, setMusicId } from "../features/PlayingMusicSlice";

interface AlbumMusic {
  artist: {
    name: string;
  };
  album: {
    cover_medium: string;
  };
  duration: number;
  id: number;
  md5_image: string;
  preview: string;
  rank: number;
  title: string;
}

const MusicPlayBar = () => {
  const isPlaying = useSelector(
    (state: RootState) => state.musicPlayer.isPlaying
  );
  const musicId = useSelector((state: RootState) => state.musicPlayer.musicId);
  const currentMusicAlbum = useSelector(
    (state: RootState) => state.albumMusic.currentMusicAlbum
  );
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentMusic, setCurrentMusic] = useState<AlbumMusic | null>(null);
  const [isLooping,setIsLooping] = useState<boolean>(false);

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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(false);
    }
    if (newVolume === 0) {
      setIsMuted(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.oncanplay = () => {
        audioRef.current?.play();
        dispatch(setIsPlaying(true));
      };
    }
  }, [musicId]);

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    setCurrentMusic(
      currentMusicAlbum.find((item) => item.id === musicId) || null
    );
  }, [musicId, currentMusicAlbum]);

  const handleNextMusic = () => {
    if (!currentMusicAlbum || currentMusicAlbum.length === 0) return;

    const currentMusicIndex = currentMusicAlbum.findIndex(
      (item) => item.id === currentMusic?.id
    );
    if (
      currentMusicIndex !== -1 &&
      currentMusicIndex < currentMusicAlbum.length - 1
    ) {
      const nextMusic = currentMusicAlbum[currentMusicIndex + 1];
      setCurrentMusic(nextMusic);
      dispatch(setMusicId(nextMusic.id));
    } else {
      setCurrentMusic(currentMusicAlbum[0]);
      dispatch(setMusicId(currentMusicAlbum[0].id));
    }
  };

  const handlePrevMusic = () => {
    if (!currentMusicAlbum || currentMusicAlbum.length === 0) return;

    const currentMusicIndex = currentMusicAlbum.findIndex(
      (item) => item.id === currentMusic?.id
    );
    
   if(currentMusicIndex>0) {
      const prevMusic = currentMusicAlbum[currentMusicIndex-1];
      setCurrentMusic(prevMusic)
      dispatch(setMusicId(prevMusic.id));
    }
    
  };


  return (
    <div  className="w-full h-24 bg-[#212124] fixed bottom-0 z-[2100] shadow-lg flex justify-between">
      <div className="w-[500px] h-full flex items-center px-10 gap-4 ">
        <div className="w-[80px] h-[80px] rounded-lg">
         <img className="w-full h-full object-cover rounded-lg" src={`https://cdn-images.dzcdn.net/images/cover/${currentMusic?.md5_image}/500x500-000000-80-0-0.jpg`} alt="" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-primary font-bold text-sm">
            {currentMusic?.title}
          </p>
          <p className="text-xs text-gray-500 font-bold">
            {currentMusic?.artist.name}
          </p>
        </div>
      </div>
      <div className="w-[500px] h-full flex flex-col justify-evenly ">
        <div className="w-full flex justify-evenly text-primary text-xl ">
          <VscArrowSwap className="cursor-pointer" />
          <MdSkipPrevious onClick={handlePrevMusic} className="cursor-pointer" />
          {!isPlaying ? (
            <FaPlay onClick={handleMusicPlay} className="cursor-pointer" />
          ) : (
            <IoMdPause onClick={handleMusicPlay} className="cursor-pointer" />
          )}
          <MdSkipNext onClick={handleNextMusic} className="cursor-pointer" />
          <RxLoop onClick={()=>setIsLooping(!isLooping)} className={`cursor-pointer ${isLooping && "text-green-500"}`} />
        </div>

        <div
          onClick={handleSeek}
          className="relative w-full h-2 bg-gray-400 rounded-2xl flex items-center cursor-pointer"
        >
          <span className="text-xs text-primary absolute left-0 -top-5">
            {formatTime(currentTime)}
          </span>

          <div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-2xl transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></div>

          <div
            className="absolute top-[-2px] w-3 h-3 bg-white rounded-full shadow-lg cursor-pointer"
            style={{
              left: `${progressPercentage}%`,
              transform: "translateX(-50%)",
            }}
          ></div>

          <span className="text-xs text-primary absolute right-0 -top-5">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="w-[400px] h-full flex items-center justify-center ">
        <div className="text-primary text-2xl flex gap-8">
          <div className="flex gap-3 items-center">
            {!isMuted ? (
              <IoVolumeHighSharp
                onClick={() => {
                  setIsMuted(!isMuted);
                  setVolume(0);
                  if (audioRef.current) audioRef.current.volume = 0;
                }}
                className="cursor-pointer"
              />
            ) : (
              <FaVolumeMute
                className="cursor-pointer text-red-500"
                onClick={() => {
                  setIsMuted(!isMuted);
                  setVolume(0.1);
                  if (audioRef.current) audioRef.current.volume = 1;
                }}
              />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 cursor-pointer
              appearance-none bg-gray-300 h-1 rounded-lg 
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
              [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full 
              [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
              [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:rounded-full"
            />
          </div>
          <GiHamburgerMenu />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentMusic?.preview}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        loop={isLooping}
        onEnded={handleNextMusic}
      />
    </div>
  );
};

export default MusicPlayBar;
