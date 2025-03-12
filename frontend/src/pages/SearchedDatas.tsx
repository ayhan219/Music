import { FaPlay, FaSadTear } from "react-icons/fa";
import SearchedMusicSingle from "../components/SearchedMusicSingle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  setCurrentAlbumMusic,
  setSearchedMusicData,
} from "../features/MusicSlice";
import { useNavigate } from "react-router-dom";
import {
  setIsPlaying,
  setMusicId,
  setOpenMusicBar,
} from "../features/PlayingMusicSlice";

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

const SearchedDatas = () => {
  const input = useSelector((state: RootState) => state.generalData.input);
  const searchedMusicData = useSelector(
    (state: RootState) => state.albumMusic.searchedMusicData
  );
  const [rank1Music, setRank1Music] = useState<AlbumMusic | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getSearchedData = async () => {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${input}`
      );
      dispatch(setSearchedMusicData(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const findRank1Music = () => {
    const rank1Music = searchedMusicData.reduce((max, item) => {
      return item.rank > max.rank ? item : max;
    }, searchedMusicData[0]);

    setRank1Music(rank1Music);
    console.log(rank1Music);
  };

  useEffect(() => {
    if (input) {
      getSearchedData();
    }
  }, [input]);

  useEffect(() => {
    if (searchedMusicData && searchedMusicData.length > 0) {
      findRank1Music();
    }
  }, [searchedMusicData]);

  return (
    <div className="w-full h-[90%] bg-primary p-8 px-24">
      {input !== "" ? (
        <div className="flex gap-5">
          <div className="flex flex-col gap-4 w-[400px] h-[300px] bg-[#19191b] rounded-lg p-4">
            <div className="text-primary font-bold text-xl">
              <h2>Most Listened Result</h2>
            </div>
            <div className="flex flex-col gap-4 w-full h-full justify-center">
              <div className="w-[100px] h-[100px] rounded-lg">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={rank1Music?.album.cover_medium}
                  alt=""
                />
              </div>
              <div className="flex justify-between">
                <div className="text-primary">
                  <h2 className="w-full text-3xl font-serif">
                    {rank1Music?.title}
                  </h2>
                  <p className="text-gray-600">
                    Music:{" "}
                    <strong className="text-primary px-2">
                      {rank1Music?.artist.name}
                    </strong>
                  </p>
                </div>
                <div className="flex items-center cursor-pointer shadow-lg">
                  <div
                    onClick={() => {
                      dispatch(setMusicId(rank1Music?.id || 0));
                      dispatch(
                        setCurrentAlbumMusic(rank1Music ? [rank1Music] : [])
                      );

                      dispatch(setOpenMusicBar(true));
                      dispatch(setIsPlaying(true));
                    }}
                    className="w-12 h-12 rounded-full bg-green-600 flex text-primary items-center justify-center"
                  >
                    <FaPlay />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[600px] h-[300px] bg-[#19191b] rounded-lg p-4">
            <div className="text-primary font-bold text-xl">
              <h2>Musics</h2>
            </div>
            <div className="pt-4">
              {searchedMusicData.slice(0, 4).map((item, index) => (
                <SearchedMusicSingle item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-primary flex justify-center p-8 px-24">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">
              {/* Icon or image */}
              <FaSadTear className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            </div>
            <h2 className="text-4xl font-bold mb-2">Search musics</h2>
            <p className="text-lg text-gray-300">
              Try a different search or explore other categories!
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-3 bg-green-600 rounded-lg text-white font-semibold shadow-lg hover:bg-green-500 transition duration-300"
            >
              Go home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchedDatas;
