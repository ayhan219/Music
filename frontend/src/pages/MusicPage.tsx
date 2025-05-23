import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImMusic } from "react-icons/im";
import Music from "../components/Music";
import { useDispatch, useSelector } from "react-redux";
import { setAlbumMusic } from "../features/MusicSlice";
import { RootState } from "../app/store";
import ToolsForMusic from "../components/ToolsForMusic";
import { AlbumMusic } from "../features/MusicSlice";

const MusicPage = () => {
  const { id } = useParams();
  const albumMusic = useSelector(
    (state: RootState) => state.albumMusic.albumMusic
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.userSlice.user);

  const getDataFromId = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${id}`
      );
      dispatch(setAlbumMusic(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFromId();
  }, []);

  return (
    <>
      <div className="w-full h-[90%] bg-primary overflow-y-auto  scrollbar-custom ">
        {!loading ? (
          <>
            <div className="w-full h-auto flex ">
              <div className="w-full h-[400px] md:h-[250px] flex flex-col md:flex-row items-center px-14 gap-6 rounded-lg relative overflow-hidden shadow-lg">
                <div className="w-[300px] h-[50%] md:h-full p-1 rounded-lg ">
                  <img
                    className="w-full h-full object-cover"
                    src={albumMusic?.cover_xl}
                    alt=""
                  />
                </div>
                <img
                  className="w-full h-full object-cover absolute opacity-50 blur-md"
                  src={albumMusic?.cover_xl}
                  alt="Album cover"
                />
                <div className="text-white font-bold font-mono flex flex-col gap-2 md:gap-4 p-6 relative z-10">
                  <h3 className="text-base md:text-lg">Open For Public</h3>
                  <h1 className="text-base md:text-4xl sm:text-5xl">{albumMusic?.title}</h1>
                  <div>
                    <p className="text-base md:text-lg">
                      {user.username ? user.username + " - " : ""}{" "}
                      {albumMusic?.tracks?.data.length} songs, duration:{" "}
                      {albumMusic?.duration
                        ? (albumMusic.duration / 60).toFixed(0)
                        : 0}{" "}
                      hours
                    </p>
                  </div>
                </div>
                <div className="text-white text-3xl hidden md:flex md:text-6xl sm:text-7xl absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
                  <ImMusic />
                </div>
              </div>
            </div>

            <div className="px-10 md:px-16 pt-4">
              <ToolsForMusic />
              <div className="w-full border-b border-gray-600">
                <h1 className="text-primary font-bold font-mono text-xl">
                  Musics
                </h1>
              </div>
            </div>

            <div className="w-full h-auto px-10 md:px-14 pt-10 flex flex-col gap-3 pb-32 ">
              {albumMusic?.tracks?.data.map((item: AlbumMusic, index) => (
                <Music
                  key={index}
                  item={item}
                  index={index}
                  whichMusic={albumMusic?.tracks?.data}
                />
              ))}
            </div>
           
          </>
        ) : (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default MusicPage;
