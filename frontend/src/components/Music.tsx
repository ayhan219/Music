import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector} from "react-redux";
import { setIsPlaying, setMusicId, setOpenMusicBar } from "../features/PlayingMusicSlice";
import { RootState } from "../app/store";
import { setCurrentAlbumMusic } from "../features/MusicSlice";


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

  const albumMusic = useSelector((state:RootState)=>state.albumMusic.albumMusic);
  const musicId = useSelector((state:RootState)=>state.musicPlayer.musicId);

  const dispatch = useDispatch();
  return (
    <div onClick={()=>{
      dispatch(setMusicId(item.id))
      dispatch(setCurrentAlbumMusic(albumMusic?.tracks?.data || []))
      dispatch(setOpenMusicBar(true))
      dispatch(setIsPlaying(true))
    }} className={`w-full  h-16 flex items-center py-4 px-4 group cursor-pointer   group`}>
      
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
          <p className={`${item.id === musicId ? "text-green-500 font-extrabold" : "text-primary"}  font-semibold truncate`}>{item.title}</p>
          <p className=" ease-in-out duration-100 text-[#595956] text-sm truncate">{item.artist.name}</p>
        </div>
      </div>

     

      
    </div>
  );
};


export default Music;
