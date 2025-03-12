import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImMusic } from "react-icons/im";
import Music from "../components/Music";
import { useDispatch, useSelector } from "react-redux";
import { setAlbumMusic } from "../features/MusicSlice";
import { RootState } from "../app/store";

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

const MusicPage = () => {
  const { id } = useParams();
  const albumMusic = useSelector(
    (state: RootState) => state.albumMusic.albumMusic
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

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
      <div className="w-full h-[90%] bg-primary">
        {!loading ? (
          <>
            <div className="w-full h-auto p-5 flex ">
              <div className="w-full h-[250px] flex   items-center gap-4 px-10 rounded-lg  relative ">
                <img
                  className="w-[200px] h-[200px]"
                  src={albumMusic?.cover_xl}
                  alt=""
                />
                <div className="text-primary font-bold font-mono flex flex-col gap-4">
                  <h3>Open For Public</h3>
                  <h1 className="text-3xl">{albumMusic?.title}</h1>
                  <div>
                    <p>
                      Ayhan - {albumMusic?.tracks?.data.length} songs duration:{" "}
                      {albumMusic?.duration
                        ? (albumMusic.duration / 60).toFixed(0)
                        : 0}{" "}
                      hours
                    </p>
                  </div>
                </div>
                <div className="text-primary text-7xl">
                  <ImMusic />
                </div>
              </div>
            </div>
            <div className="px-16 pt-4">
              <div className="w-full border-b border-gray-600">
                <h1 className="text-primary font-bold font-mono text-xl">
                  Musics
                </h1>
              </div>
            </div>

            <div className="w-full max-h-[350px] px-14 pt-10 flex flex-col gap-3 overflow-y-auto scrollbar-hidden scrollbar-custom">
              {albumMusic?.tracks?.data.map((item: AlbumMusic) => (
                <Music item={item} />
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
