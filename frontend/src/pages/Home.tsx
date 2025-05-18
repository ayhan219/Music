import { useEffect, useState } from "react";
import Album from "../components/Album";
import Album2 from "../components/Album2";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { motion } from "framer-motion";
import {
  getGenres,
  getPopularAlbums,
  getRadios,
  getReleasedAlbums,
} from "../features/MusicSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import RadioComp from "../components/RadioComp";

const Home = () => {
  const albums = useSelector(
    (state: RootState) => state.albumMusic.popularAlbums
  );
  const releasedAlbums = useAppSelector(
    (state: RootState) => state.albumMusic.releasedAlbums
  );
  const radios = useAppSelector((state: RootState) => state.albumMusic.radio);
  const genres = useAppSelector((state: RootState) => state.albumMusic.genres);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentIndex2, setCurrentIndex2] = useState<number>(0);
  const [currentIndex3, setCurrentIndex3] = useState<number>(0);
  const [currentIndex4, setCurrentIndex4] = useState<number>(0);
  const [currentIndex5, setCurrentIndex5] = useState<number>(0);
  const [IsSmallScreen,setIsSmallScreen] = useState<boolean>(false);
  const loading = useSelector((state: RootState) => state.albumMusic.loading);
  const user = useSelector((state: RootState) => state.userSlice.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPopularAlbums());
    dispatch(getReleasedAlbums());
    dispatch(getRadios());
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(()=>{
    console.log(window.innerWidth);
    
    const handleSize = ()=>setIsSmallScreen(window.innerWidth <1100);
    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  },[])

  const handleNext = () => {
    if (currentIndex + visibleCount < albums?.length) {
      setCurrentIndex(currentIndex + (IsSmallScreen ? 1 : 6));
    }
  };

  const handlePrev = () => {
    if (currentIndex - visibleCount >= 0) {
      setCurrentIndex(currentIndex - (IsSmallScreen ? 1 : 6));
    }
  };

  const handleNext2 = () => {
    if (currentIndex2 + 6 < albums?.length) {
      setCurrentIndex2(currentIndex2 + (IsSmallScreen ? 1 : 6));
    }
  };

  const handlePrev2 = () => {
    if (currentIndex2 - visibleCount >= 0) {
      setCurrentIndex2(currentIndex2 - (IsSmallScreen ? 1 : 6));
    }
  };

  const handleNext3 = () => {
    if (currentIndex3 + visibleCount < releasedAlbums?.length) {
      setCurrentIndex3(currentIndex3 + (IsSmallScreen ? 1 : 6));
    }
  };

  const handlePrev3 = () => {
    if (currentIndex3 - visibleCount >= 0) {
      setCurrentIndex3(currentIndex3 - (IsSmallScreen ? 1 : 6));
    }
  };
  const handleNext4 = () => {
    if (currentIndex4 + visibleCount) {
      if (currentIndex4 + visibleCount < radios.length) {
        setCurrentIndex4(currentIndex4 + (IsSmallScreen ? 1 : 6));
      }
    }
  };

  const handlePrev4 = () => {
    if (currentIndex4 - visibleCount >= 0) {
      if (currentIndex4 - visibleCount >= 0) {
        setCurrentIndex4(currentIndex4 - (IsSmallScreen ? 1 : 6));
      }
    }
  };

  const handleNext5 = () => {
    if (currentIndex5 + visibleCount) {
      if (currentIndex5 + visibleCount < genres.length) {
        setCurrentIndex5(currentIndex5 + (IsSmallScreen ? 1 : 6));
      }
    }
  };

  const handlePrev5 = () => {
    if (currentIndex5 - visibleCount >= 0) {
      if (currentIndex5 - visibleCount >= 0) {
        setCurrentIndex5(currentIndex5 - (IsSmallScreen ? 1 : 6));
      }
    }
  };

  const visibleCount = IsSmallScreen ? 1 : 6;
  return (
    <div className="w-full  h-full overflow-y-auto scrollbar-custom bg-primary pb-60">
      <div className={`px-10 sm:px-24 w-full flex flex-col gap-8`}>
        {!loading ? (
          <>
            <div className={`flex flex-col ${IsSmallScreen && "items-center"}`}>
              <div className="w-full flex justify-between items-center">
                <div className="text-primary text-xs sm:text-xl">
                  <h3>Popular Albums</h3>
                </div>
                <div className="flex gap-2">
                  <div
                    onClick={() => navigate("/popularalbums")}
                    className="text-primary cursor-pointer text-base text-center pr-4 font-bold "
                  >
                    <p className="hover:text-blue-600 text-xs sm:text-base ease-in-out duration-200">
                      See more
                    </p>
                  </div>
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
                className="flex flex-row gap-2 pt-3 overflow-x-auto"
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {albums.slice(currentIndex, currentIndex + visibleCount).map((item) => (
                  <Album key={item.id} item={item} />
                ))}
              </motion.div>
            </div>

            <div className={`flex flex-col  pt-3 ${IsSmallScreen && "items-center"}`}>
              <div className="w-full flex justify-between">
                <div className="text-primary text-xs sm:text-xl">
                  <h3>Released Albums</h3>
                </div>
                <div className="flex gap-2">
                  <div
                    onClick={() => navigate("/releasedalbums")}
                    className="text-primary cursor-pointer text-base text-center pr-4 font-bold"
                  >
                    <p className="hover:text-blue-600 text-xs sm:text-base ease-in-out duration-200">
                      See more
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer">
                    <MdOutlineKeyboardArrowLeft
                      className="text-white text-2xl"
                      onClick={handlePrev3}
                    />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer">
                    <MdOutlineKeyboardArrowRight
                      className="text-white text-2xl"
                      onClick={handleNext3}
                    />
                  </div>
                </div>
              </div>
              <motion.div
                className="flex flex-row gap-2 pt-3 overflow-x-auto"
                key={currentIndex3}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {releasedAlbums
                  .slice(currentIndex3, currentIndex3 + visibleCount)
                  .map((item) => (
                    <Album key={item.id} item={item} />
                  ))}
              </motion.div>
            </div>
             <div className={`flex flex-col  pt-3 ${IsSmallScreen && "items-center"}`}>
              <div className="w-full flex justify-between">
                <div className="text-primary text-xs sm:text-xl">
                  <h3>Radios</h3>
                </div>
                <div className="flex gap-2">
                  <div
                    onClick={() => navigate("/radios")}
                    className="text-primary cursor-pointer text-base text-center pr-4 font-bold"
                  >
                    <p className="hover:text-blue-600 text-xs sm:text-base ease-in-out duration-200">
                      See more
                    </p>
                  </div>
                  <div
                    onClick={handlePrev4}
                    className="w-7 h-7 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer"
                  >
                    <MdOutlineKeyboardArrowLeft className="text-white text-2xl" />
                  </div>
                  <div
                    onClick={handleNext4}
                    className="w-7 h-7 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer"
                  >
                    <MdOutlineKeyboardArrowRight className="text-white text-2xl" />
                  </div>
                </div>
              </div>
              <motion.div
                className="flex flex-row gap-2 pt-3 overflow-x-hidden overflow-y-hidden"
                key={currentIndex4}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {radios
                  .slice(currentIndex4, currentIndex4 + visibleCount)
                  .map((item, index) => (
                    <RadioComp item={item} index={index} />
                  ))}
              </motion.div>
            </div>

            <div className={`flex flex-col  pt-3 ${IsSmallScreen && "items-center"}`}>
              <div className="w-full flex justify-between">
                <div className="text-primary text-xs sm:text-xl">
                  <h3>Genres</h3>
                </div>
                <div className="flex gap-2">
                  <div
                    onClick={() => navigate("/genres")}
                    className="text-primary cursor-pointer text-base text-center pr-4 font-bold"
                  >
                    <p className="hover:text-blue-600 text-xs sm:text-base ease-in-out duration-200">
                      See more
                    </p>
                  </div>
                  <div
                    onClick={handlePrev5}
                    className="w-7 h-7 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer"
                  >
                    <MdOutlineKeyboardArrowLeft className="text-white text-2xl" />
                  </div>
                  <div
                    onClick={handleNext5}
                    className="w-7 h-7 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer"
                  >
                    <MdOutlineKeyboardArrowRight className="text-white text-2xl" />
                  </div>
                </div>
              </div>
              <motion.div
                className="flex flex-row gap-2 pt-3 overflow-x-hidden overflow-y-hidden"
                key={currentIndex5}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {genres
                  .slice(currentIndex5, currentIndex5 + visibleCount)
                  .map((item, index) => (
                    <RadioComp item={item} index={index} />
                  ))}
              </motion.div>
            </div>

            {user.id && (
              <>
                 <div className={`flex flex-col  pt-3 ${IsSmallScreen && "items-center"}`}>
                  <div className="w-full flex justify-between">
                    <div className="text-primary text-xs sm:text-xl">
                      <h3>My List</h3>
                    </div>
                    <div className="flex gap-2">
                      <div
                        onClick={() => navigate("/playlists")}
                        className="text-primary cursor-pointer text-base text-center pr-4 font-bold"
                      >
                        <p className="hover:text-blue-600 text-xs sm:text-base ease-in-out duration-200">
                          See more
                        </p>
                      </div>
                      <div
                        className="w-7 h-7 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer"
                        onClick={handlePrev2}
                      >
                        <MdOutlineKeyboardArrowLeft className="text-white text-2xl" />
                      </div>
                      <div
                        className="w-7 h-7 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer"
                        onClick={handleNext2}
                      >
                        <MdOutlineKeyboardArrowRight className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="flex flex-row gap-3 pt-3 overflow-x-auto"
                    key={currentIndex2}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {user?.playlists
                      ?.slice(currentIndex2, currentIndex2 + visibleCount)
                      .map((item, key) => (
                        <Album2 key={key} item={item} index={key} />
                      ))}
                  </motion.div>
                </div>
              </>
            )}
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
