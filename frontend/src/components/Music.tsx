import { FaPlay } from "react-icons/fa";
import { useDispatch} from "react-redux";
import { setIsPlaying, setMusicUrl, setOpenMusicBar } from "../features/PlayingMusicSlice";

interface MusicProps {
  item: {
    artist: {
      name: string;
    };
    album:{
        cover_medium:string
    }
    duration: number;
    id: number;
    md5_image: string;
    preview: string;
    rank: number;
    title: string;
  },
}

const Music = ({ item }: MusicProps) => {

  const musicUrlData ={
    musicUrlToListen:item.preview,
    artist:item.artist.name,
    musicName:item.title,
    duration:item.duration

  }


  const dispatch = useDispatch();
  return (
    <div onClick={()=>{
      dispatch(setMusicUrl(musicUrlData))
      dispatch(setOpenMusicBar(true))
      dispatch(setIsPlaying(true))
    }} className="w-full h-16 flex items-center py-4 px-4 group cursor-pointer">
      
      <div className="flex items-center gap-4 w-1/2">
        <div className="w-14 h-14 relative flex items-center justify-center  cursor-pointer">
        <img
          className="w-14 h-14 object-cover rounded-lg"
          src={item.album.cover_medium}
          alt="Album Cover"
        />
        <FaPlay className="absolute text-primary text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex flex-col gap-1 w-full truncate">
          <p className="text-primary font-semibold truncate">{item.title}</p>
          <p className="text-[#595956] text-sm truncate">{item.artist.name}</p>
        </div>
      </div>

     

      
    </div>
  );
};


export default Music;
