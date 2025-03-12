import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying, setMusicId, setOpenMusicBar } from "../features/PlayingMusicSlice";
import { setCurrentAlbumMusic } from "../features/MusicSlice";
import { RootState } from "../app/store";

interface SearchedMusicDataProps{
    item:{
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
    },
    index:number
}

const SearchedMusicSingle = ({item,index}:SearchedMusicDataProps) => {

    const searchedMusicData = useSelector((state:RootState)=>state.albumMusic.searchedMusicData)
    const dispatch = useDispatch();

    
    return (
      <div onClick={()=>{
        dispatch(setMusicId(item.id))
              dispatch(setCurrentAlbumMusic(searchedMusicData || []))
              dispatch(setOpenMusicBar(true))
              dispatch(setIsPlaying(true))
      }} key={index} className="w-full h-14 flex items-center bg-[#19191b] p-1 rounded-lg hover:bg-[#2b2b2d] transition duration-300 cursor-pointer px-2">
        {/* Image section */}
        <div className="w-16 h-full mr-4">
          <img
            className="w-full h-full object-cover rounded-lg shadow-md"
            src={item.album.cover_medium}
            alt="Album Cover"
          />
        </div>
  
        {/* Music Info section */}
        <div className="flex flex-col justify-center flex-grow">
          <p className="w-[80%]  text-white font-semibold text-md">{item.title}</p>
          <p className="text-gray-400 text-sm">{item.artist.name}</p>
        </div>
  
        {/* Duration section */}
        <div className="text-white text-sm">
          <p>{(item.duration/60).toFixed(2)}</p>
        </div>
      </div>
    );
  };
  
  export default SearchedMusicSingle;
  