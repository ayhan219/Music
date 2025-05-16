import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsPlaying,
  setMusicId,
  setOpenMusicBar,
} from "../features/PlayingMusicSlice";
import { RootState } from "../app/store";
import { setCurrentAlbumMusic, setNewMusicUrl } from "../features/MusicSlice";
import { useRef, useState } from "react";
import { setContextMenu } from "../features/generalSlice";
import axios from "axios";
import { useAppSelector } from "../app/hooks";

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
  item: AlbumMusic;
  index: number;
  whichMusic: AlbumMusic[] | undefined;
}

const Music = ({ item, index, whichMusic }: MusicProps | any) => {
  const musicId = useSelector((state: RootState) => state.musicPlayer.musicId);
  const user = useSelector((state: RootState) => state.userSlice.user);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const contextMenu = useSelector(
    (state: RootState) => state.generalData.contextMenu
  );
  const currentAlbumMusic = useAppSelector((state: RootState)=>state.albumMusic.currentMusicAlbum)

  const musicRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const getActiveMusicUrl = async()=>{
    try {
      const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${musicId}`);
      const findSpecificMusic = currentAlbumMusic.find((item:AlbumMusic)=>item.id===musicId)
      if (findSpecificMusic?.id) {
        const data = {
          id: findSpecificMusic.id,
          preview: response.data.preview,
        };
        dispatch(setNewMusicUrl(data));
      }

    } catch (error) {
      console.log(error);
      
    }
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    if (musicRef.current) {
      const rect = musicRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      dispatch(
        setContextMenu({
          visible: true,
          x,
          y,
          id: item.id,
        })
      );
    }
  };

  const handleClickOutside = () => {
    dispatch(
      setContextMenu({
        visible: false,
        x: 0,
        y: 0,
        id: null,
      })
    );
  };

  const handleAddToPlaylist = async (playlist_id: number) => {
    const musicData = {
      user_id: user.id,
      playlist_id: playlist_id,
      music_name: item.title,
      artist: item.artist.name,
      music_id: item.id,
      music_url: item.preview,
      music_image: item.md5_image,
      music_duration: item.duration,
      music_rank: item.rank,
    };
    try {
      await axios.post("http://localhost:5000/music/addmusictoplaylist", {
        musicData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onMouseLeave={() =>
        dispatch(
          setContextMenu({
            visible: false,
            x: 0,
            y: 0,
            id: null,
          })
        )
      }
      ref={musicRef}
      className="relative"
      onClick={()=>{
        handleClickOutside()
        getActiveMusicUrl();
      }}
    >
      <div
        key={index}
        onContextMenu={handleContextMenu}
        onClick={() => {
          dispatch(setMusicId(item.id));
          dispatch(setCurrentAlbumMusic(whichMusic || []));
          dispatch(setOpenMusicBar(true));
          dispatch(setIsPlaying(true));
        }}
        className="w-full h-16 flex items-center py-4 px-4 group cursor-pointer hover:bg-[#262629]"
      >
        <div className="flex items-center gap-4 w-[50%]">
          <div className="w-20 h-20 relative flex items-center justify-center cursor-pointer">
            <img
              className="w-16 h-16 object-cover rounded-lg"
              src={`https://cdn-images.dzcdn.net/images/cover/${item.md5_image}/500x500-000000-80-0-0.jpg`}
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
              } truncate`}
            >
              {item.title}
            </p>
            <p
              className={`${
                item.id === musicId ? "text-white font-bold" : "text-[#595956]"
              } text-sm truncate`}
            >
              {item.artist.name}
            </p>
          </div>
        </div>

        <div className="w-full flex justify-between px-32 text-primary">
          <div>
            <p>{item.rank}</p>
          </div>
          <p>
            {Math.floor(item.duration / 60)}:
            {(item.duration % 60).toString().padStart(2, "0")}
          </p>
        </div>
      </div>

      {contextMenu.id === item.id && contextMenu.visible && (
        <ul
          className="absolute z-50 bg-[#2e2e30] text-white shadow-lg border border-gray-600 rounded-md w-40 text-sm"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          <li
            className="p-2 hover:bg-amber-100 hover:text-black ease-in-out duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredItem(item.id)}
          >
            Add to Playlist
            {hoveredItem === item.id && (
              <ul
                onMouseLeave={() => setHoveredItem(null)}
                className="absolute left-40 top-0 bg-[#2e2e30] text-white w-40 rounded-md"
              >
                {user.playlists?.map((item, index) => (
                  <li
                    onClick={() => handleAddToPlaylist(item.playlist_id)}
                    key={index}
                    className="p-2 cursor-pointer hover:bg-amber-100 hover:text-black ease-in-out duration-300"
                  >
                    {item.playlist_name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Music;
