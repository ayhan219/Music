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
  const [currentIndex2,setCurrentIndex2] = useState<number>(0);
  const [IsSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleSize = () => setIsSmallScreen(window.innerWidth < 1100);
    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  const visibleCount = IsSmallScreen ? 1 : 6;

  const handleNext = () => {
    if (currentIndex + visibleCount < albums?.length) {
      setCurrentIndex(currentIndex + visibleCount);
    }
  };
  const handlePrev = () => {
    if (currentIndex - visibleCount >= 0) {
      setCurrentIndex(currentIndex - visibleCount);
    }
  };

  const handleNext2 = () => {
    if (currentIndex2 + visibleCount < artist?.length) {
      setCurrentIndex2(currentIndex2 + visibleCount);
    }
  };
  const handlePrev2 = () => {
    if (currentIndex2 - visibleCount >= 0) {
      setCurrentIndex2(currentIndex2 - visibleCount);
    }
  };

  useEffect(() => {
    dispatch(getPopularArtist());
  }, []);

  return (
    <div className="w-full h-full bg-primary p-3">
      <div className="h-full w-full p-4 overflow-y-auto pb-10 scrollbar-custom ">
        <div className="flex justify-between items-center px-4">
          <div className="w-full text-primary text-base md:text-2xl font-semibold px-4  ">
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
        <div className="w-full justify-center md:justify-normal h-auto pt-5 flex">
          <motion.div
            className="flex flex-row justify-between pt-3 overflow-x-auto overflow-y-hidden"
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {albums.slice(currentIndex, currentIndex + visibleCount).map((item, index) => (
              <AlbumPageData key={item.id || index} item={item} index={index} />
            ))}
          </motion.div>
        </div>

        <div className="flex justify-between pt-4 px-4">
          <div className="w-full text-primary text-base md:text-2xl font-semibold px-4  ">
            <h2>Popular Artists</h2>
          </div>
          <div className="flex gap-2">
            <div
              onClick={handlePrev2}
              className="w-7 h-7 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft className="text-white text-2xl" />
            </div>
            <div
              onClick={handleNext2}
              className="w-7 h-7 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer"
            >
              <MdOutlineKeyboardArrowRight className="text-white text-2xl" />
            </div>
          </div>
        </div>
        <div className="w-full justify-center md:justify-normal h-auto pt-5 flex">
          <motion.div
            className="flex flex-row justify-between pt-3 overflow-x-auto"
            key={currentIndex2}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {artist.slice(currentIndex2, currentIndex2+ visibleCount).map((item, index) => (
              <Artist key={item.artist.id || index} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AlbumsAndArtists;
