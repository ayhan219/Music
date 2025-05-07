import { useEffect } from "react";
import { getArtistData, getArtistMusicData } from "../features/ArtistSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { FaCheckCircle } from "react-icons/fa";
import Music from "../components/Music";
import ToolsForMusic from "../components/ToolsForMusic";
import { setAlbumMusic } from "../features/MusicSlice";

const ArtistDetail = () => {
  const { id } = useParams();
  const { artist, status, artistPopularMusic } = useSelector(
    (state: RootState) => state.artist
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArtistData(Number(id)));
    dispatch(getArtistMusicData(Number(id)));
  }, [id, dispatch]);
  
  useEffect(() => {
    if (artistPopularMusic && artistPopularMusic.length > 0) {
      const fixedData = artistPopularMusic.map((item) => ({
        title: item.title,
        cover_xl: item.album.cover_medium,
        duration: item.duration,
        label: item.artist.name,
        tracks: {
          data: artistPopularMusic
        }
      }));
      dispatch(setAlbumMusic(fixedData[0]));
    } else {
      dispatch(setAlbumMusic(null));
    }
  }, [artistPopularMusic, dispatch]);

  if (status === "loading")
    return (
      <div className="flex justify-center items-center space-x-2 bg-primary h-[90%]">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  if (status === "failed")
    return (
      <div className="flex justify-center items-center h-[90%] bg-primary text-red-500">
        Failed to load artist data
      </div>
    );

  return (
    <div className="w-full h-[90vh] bg-primary text-white">
      <div className="w-full h-auto  overflow-y-auto max-h-[90vh] scrollbar-custom">
        <div className="relative w-full h-[50vh] flex items-center justify-center px-8">
          <img
            className="w-full h-full object-cover absolute opacity-40 blur-md"
            src={artist?.picture_xl}
            alt={artist?.name}
          />
          <div className="relative w-full h-[40%] z-10 flex items-center gap-6">
            <img
              className="w-48 h-48 object-cover rounded-full shadow-lg"
              src={artist?.picture_xl}
              alt={artist?.name}
            />
            <div>
              <div className="flex items-center gap-2 text-gray-300">
                <FaCheckCircle className="text-green-400 text-xl" />
                <h3 className="text-lg font-semibold">Verified Artist</h3>
              </div>
              <h1 className="text-6xl font-bold">{artist?.name}</h1>
              <p className="text-lg text-gray-400 mt-2">
                {artist?.nb_fan.toLocaleString()} Monthly Listeners
              </p>
            </div>
          </div>
        </div>

        <div className="w-full px-10 mt-6 h-auto">
          <ToolsForMusic />
          <div className="w-full h-auto ">
            <div className="w-full h-12 pt-5 px-6 text-primary text-2xl font-mono ">
              <h2>Popular</h2>
            </div>
            <div className="w-full h-auto flex flex-col gap-3 pt-5">
              {artistPopularMusic?.map((item, index) => (
                <Music
                  item={item}
                  index={index}
                  whichMusic={artistPopularMusic}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-[1000px] pt-14 ">
          <div className="w-full h-[800px] p-8 relative flex items-center ">
            <img
              className="w-full h-full object-cover opacity-30 rounded-lg"
              src={artist?.picture_xl}
              alt=""
            />
            <div className="absolute p-10 bg-opacity-80 ml-10 backdrop-blur-lg bg-black/30 rounded-lg shadow-xl text-white">
              <h2 className="text-4xl font-bold">{artist?.name}</h2>
              <p className="text-lg text-gray-300 mt-1">
                {artist?.type.toUpperCase()}
              </p>
              <p className="text-xl text-green-400 font-semibold mt-2">
                {artist?.nb_fan.toLocaleString()} Monthly Listeners
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
