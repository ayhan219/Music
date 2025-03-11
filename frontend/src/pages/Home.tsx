import { useEffect, useState } from "react";
import Album from "../components/Album";
import Album2 from "../components/Album2";
import axios from "axios";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { motion } from "framer-motion";

interface AlbumData {
  cover: string;
  cover_xl: string;
  artist: {
    name: string;
  };
  id: number;
  link: string;
  position: number;
  type: string;
  title: string;
}

const Home = () => {
  const [albums, setAlbums] = useState<AlbumData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getPopularAlbums = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums"
      );
      console.log(response.data.data);
      setAlbums(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPopularAlbums();
  }, []);

  const handleNext = () => {
    if (currentIndex + 5 < albums.length) {
      setCurrentIndex(currentIndex + 5);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 5 >= 0) {
      setCurrentIndex(currentIndex - 5);
    }
  };

  return (
    <div className="w-full  min-h-screen overflow-y-auto bg-primary">
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
