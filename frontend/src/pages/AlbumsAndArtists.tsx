import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import AlbumPageData from "../components/AlbumPageData";
import { motion } from "framer-motion";
import Artist from "../components/Artist";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { getPopularArtist } from "../features/MusicSlice";

const AlbumsAndArtists = () => {
  const albums = useSelector(
    (state: RootState) => state.albumMusic.popularAlbums
  );
  const artist = useSelector((state: RootState) => state.albumMusic.artistData);
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    if (currentIndex + 5 < albums?.length) {
      setCurrentIndex(currentIndex + 5);
    }
  };
  const handlePrev = () => {
    if (currentIndex - 5 >= 0) {
      setCurrentIndex(currentIndex - 5);
    }
  };


  useEffect(() => {
    dispatch(getPopularArtist());
  }, []);

  return (
    <div className="w-full h-[90%] bg-primary p-3">
      <div className="h-full w-full p-4 overflow-y-auto scrollbar-custom ">
        <div className="flex justify-between px-4">
          <div className="w-full text-primary text-2xl font-semibold px-4  ">
            <h2>Popular Albums</h2>
          </div>
          <div className="flex gap-2">
            <div
              onClick={handlePrev}
              className="w-7 h-7 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft className="text-white text-2xl" />
            </div>
            <div
              onClick={handleNext}
              className="w-7 h-7 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer"
            >
              <MdOutlineKeyboardArrowRight className="text-white text-2xl" />
            </div>
          </div>
        </div>
        <div className="w-full h-auto pt-5 flex">
          <motion.div
            className="flex flex-row justify-between pt-3 overflow-x-auto"
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {albums.slice(currentIndex, currentIndex + 6).map((item, index) => (
              <AlbumPageData item={item} index={index} />
            ))}
          </motion.div>
        </div>

        <div className="flex justify-between pt-4 px-4">
          <div className="w-full text-primary text-2xl font-semibold px-4  ">
            <h2>Popular Artists</h2>
          </div>
        </div>
        <div className="w-full h-auto pt-5 flex">
          <motion.div
            className="flex flex-row justify-between pt-3 overflow-x-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {artist.slice(0, 6).map((item, index) => (
              <Artist item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AlbumsAndArtists;
