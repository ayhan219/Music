import { useEffect, useState } from "react";
import Album from "../components/Album";
import Album2 from "../components/Album2";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { motion } from "framer-motion";
import { getPopularAlbums } from "../features/MusicSlice";
import { useAppDispatch } from "../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";


const Home = () => {
  const albums = useSelector((state:RootState)=>state.albumMusic.popularAlbums)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const loading = useSelector((state:RootState)=>state.albumMusic.loading)

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getPopularAlbums())
    
  }, [dispatch]);

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

  return (
    <div className="w-full  h-[90%] overflow-y-auto bg-primary">
      <div className="px-24 w-full flex flex-col  gap-8">
        {!loading ? (
          <>
            <div>
              <div className="w-full flex justify-between">
                <div className="text-primary text-xl">
                  <h3>Popular Albums</h3>
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
              <motion.div
                className="flex flex-row justify-between pt-3 overflow-x-auto"
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {albums.slice(currentIndex, currentIndex + 5).map((item) => (
                  <Album key={item.id} item={item} />
                ))}
              </motion.div>
            </div>

            <div className="pt-3">
              <div className="text-primary text-xl">
                <h3>My List</h3>
              </div>
              <div className="flex gap-5 pt-3">
                <Album2 />
                <Album2 />
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
