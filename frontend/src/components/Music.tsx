import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsPlaying,
  setMusicId,
  setOpenMusicBar,
} from "../features/PlayingMusicSlice";
import { RootState } from "../app/store";
import { setCurrentAlbumMusic } from "../features/MusicSlice";

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

interface MusicProps {
  item: {
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
  };
  index: number;
  whichMusic: AlbumMusic[] | undefined;
}

const Music = ({ item, index, whichMusic }: MusicProps) => {
  const musicId = useSelector((state: RootState) => state.musicPlayer.musicId);

  const dispatch = useDispatch();
  return (
    <div
      key={index}
      onClick={() => {
        dispatch(setMusicId(item.id));
        dispatch(setCurrentAlbumMusic(whichMusic || []));
        dispatch(setOpenMusicBar(true));
        dispatch(setIsPlaying(true));
      }}
      className={`w-full  h-16 flex items-center py-4 px-4  group cursor-pointer hover:bg-[#262629]   group`}
    >
      <div className="flex items-center gap-4 w-[50%]  ">
        <div className="w-20 h-20 relative flex   items-center justify-center  cursor-pointer">
          <img
            className="w-16 h-16 object-cover rounded-lg"
            src={item.album.cover_medium}
            alt="Album Cover"
          />
          <FaPlay className="absolute text-primary text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex flex-col gap-1 w-[500px] truncate">
          <p
            className={`${
              item.id === musicId
                ? "text-green-500 font-extrabold"
                : "text-primary font-semibold"
            }   truncate`}
          >
            {item.title}
          </p>
          <p
            className={`ease-in-out ${
              item.id === musicId ? "text-white font-bold" : "text-[#595956]"
            } duration-100  text-sm truncate`}
          >
            {item.artist.name}
          </p>
          
        </div>
        
          
      </div>
      <div className="w-full flex justify-between px-32  text-primary ">
          <div className="">
            <p>{item.rank}</p>
          </div>
          <p>
            {Math.floor(item.duration / 60)}:
            {(item.duration % 60).toString().padStart(2, "0")}
          </p>
          </div>
    </div>
  );
};

export default Music;
