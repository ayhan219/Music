import { BsThreeDots } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { VscArrowSwap } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  setIsPlaying,
  setMusicId,
  setOpenMusicBar,
} from "../features/PlayingMusicSlice";
import { setCurrentAlbumMusic } from "../features/MusicSlice";

const ToolsForMusic = () => {
  const dispatch = useDispatch();
  const currentAlbumMusic = useSelector(
    (state: RootState) => state.albumMusic.albumMusic
  );

  const handleClickMusicButton = () => {
    const firstMusicId = currentAlbumMusic?.tracks?.data?.[0]?.id;
    const albumTracks = currentAlbumMusic?.tracks?.data;

    if (firstMusicId !== undefined && albumTracks !== undefined) {
      dispatch(setMusicId(firstMusicId));
      dispatch(setCurrentAlbumMusic(albumTracks));
      dispatch(setOpenMusicBar(true));
      dispatch(setIsPlaying(true));
    }
  };
  return (
    <div className="w-full h-32 px-6 flex items-center text-primary">
      <div className="w-full flex items-center gap-4">
        <div
          onClick={() => handleClickMusicButton()}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-green-500 cursor-pointer"
        >
          <FaPlay className="text-black" />
        </div>
        <div className="w-12 h-12 text-primary text-3xl flex items-center justify-center ">
          <VscArrowSwap />
        </div>
        <div className="w-20 h-8 rounded-lg border flex items-center justify-center">
          Follow
        </div>
        <div className="w-12 h-12 text-primary text-3xl flex items-center justify-center">
          <BsThreeDots />
        </div>
      </div>
    </div>
  );
};

export default ToolsForMusic;
