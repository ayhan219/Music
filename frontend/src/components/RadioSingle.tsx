import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getRadiosData } from "../features/MusicSlice";
import { setIsPlaying, setMusicId, setOpenMusicBar } from "../features/PlayingMusicSlice";
import { RootState } from "../app/store";
import { useEffect } from "react";

interface RadioSingleProps {
  item: {
    id: number;
    title: string;
    duration: number;
    rank: number;
    md5_image: string;
    artist: {
      id: number;
      name: string;
      picture: string;
    };
    album: {
      id: number;
      title: string;
      cover: string;
      cover_xl: string;
      md5_image: string;
    };
  };
  index: number;
}

const RadioSingle = ({ item, index }: RadioSingleProps) => {
  const dispatch = useAppDispatch();
  const currentAlbumMusic = useAppSelector((state:RootState)=>state.albumMusic.currentMusicAlbum)


  useEffect(() => {
    if (currentAlbumMusic.length > 0) {
      dispatch(setMusicId(currentAlbumMusic[0].id));
      dispatch(setIsPlaying(true));
      dispatch(setOpenMusicBar(true));
    }
  }, [currentAlbumMusic]);
  
  return (
    <motion.div
      key={index}
      onClick={()=>{
        dispatch(getRadiosData(item.album.id))
            }}
      className="relative w-[300px] h-[380px] rounded-lg shadow-md overflow-hidden cursor-pointer text-white group  hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Album Cover */}
      <div className="relative h-[220px] overflow-hidden">
        <motion.img
          src={item.album.cover_xl}
          alt={item.album.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300 brightness-90 group-hover:brightness-100"
        />
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col justify-between h-[160px]">
        <div>
          <h3 className="text-xl font-semibold truncate">{item.title}</h3>
          <p className="text-sm text-gray-400 truncate">
            {item.artist.name}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs">
              {Math.floor(item.duration / 60)}:
              {String(item.duration % 60).padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs">Rank {item.rank}</span>
          </div>
        </div>
      </div>

      {/* Artist Picture Overlay (Spotify Style) */}
      <motion.div
        className="absolute top-4 left-4 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ pointerEvents: 'none' }}
      >
        <img
          src={item.artist.picture}
          alt={item.artist.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Play Button Overlay */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full w-16 h-16 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300"
        whileHover={{ scale: 1.1 }}
        style={{ pointerEvents: 'none' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168l4.548 2.717-4.548 2.717V7.168z"
            clipRule="evenodd"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default RadioSingle;