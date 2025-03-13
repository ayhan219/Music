import { useEffect } from "react";
import { getArtistData } from "../features/ArtistSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { FaCheckCircle, FaPlay } from "react-icons/fa";
import { VscArrowSwap } from "react-icons/vsc";
import { BsThreeDots } from "react-icons/bs";


const ArtistDetail = () => {
  const { id } = useParams();
  const { artist, status } = useSelector((state: RootState) => state.artist);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArtistData(Number(id)));
  }, [id, dispatch]);

  if (status === "loading")
    return <div className="flex justify-center items-center h-[90%] bg-primary text-white">Loading...</div>;
  if (status === "failed")
    return <div className="flex justify-center items-center h-[90%] bg-primary text-red-500">Failed to load artist data</div>;

  return (
    <div className="w-full h-[90%] bg-primary text-white">
      <div className="relative w-full h-[50vh] flex items-center justify-center">
        <img
          className="w-full h-full object-cover absolute opacity-40 blur-md"
          src={artist?.picture_xl}
          alt={artist?.name}
        />
        <div className="relative w-full h-[40%] z-10 flex items-center gap-6">
          <img className="w-48 h-48 object-cover rounded-full shadow-lg" src={artist?.picture_xl} alt={artist?.name} />
          <div>
            <div className="flex items-center gap-2 text-gray-300">
              <FaCheckCircle className="text-green-400 text-xl" />
              <h3 className="text-lg font-semibold">Verified Artist</h3>
            </div>
            <h1 className="text-6xl font-bold">{artist?.name}</h1>
            <p className="text-lg text-gray-400 mt-2">{artist?.nb_fan.toLocaleString()} Monthly Listeners</p>
          </div>
        </div>
      </div>

      <div className="w-full px-10 mt-6 h-auto">
        <div className="w-full h-32 ">
            <div className="w-full flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-500">
                <FaPlay className="text-black" />
                </div>
                <div className="w-12 h-12 text-primary text-3xl flex items-center justify-center ">
                <VscArrowSwap  />
                </div>
                <div className="w-20 h-8 rounded-lg border flex items-center justify-center">
                    Follow
                </div>
                <div className="w-12 h-12 text-primary text-3xl flex items-center justify-center">
                <BsThreeDots/>
                </div>
            </div>
            <div className="w-full h-12 pt-5 text-primary text-xl font-mono ">
                <h2>Popular</h2>
            </div>
            <div className="w-full h-auto">
                <div className="w-full h-12 bg-primary flex items-center justify-center ">
                    <div>
                    <img src="" alt="" />
                    </div>
                </div>

            </div>
        </div>
        
      </div>
    </div>
  );
};

export default ArtistDetail;
