import { useEffect, useState } from "react";
import Album from "../components/Album";
import Album2 from "../components/Album2";
import SearchbarArea from "../components/SearchbarArea";
import axios from "axios";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

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

  const getPopularAlbums = async () => {
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums"
      );
      console.log(response.data.data);
      setAlbums(response.data.data);
    } catch (error) {
      console.log(error);
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
    <div className="w-full min-h-screen overflow-y-auto bg-primary">
      <SearchbarArea />
      <div className="px-24 flex flex-col  gap-8">
        <div>
          <div className="w-full flex justify-between">
            <div className="text-primary text-xl">
              <h3>Album 1</h3>
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
          <div className="flex flex-row justify-between pt-3 overflow-x-auto">
            {albums.slice(currentIndex, currentIndex + 5).map((item) => (
              <Album item={item} />
            ))}
          </div>
        </div>

        <div className="pt-3">
          <div className="text-primary text-xl">
            <h3>Album 2</h3>
          </div>
          <div className="flex justify-between pt-3">
            <Album2 />
            <Album2 />
            <Album2 />
            <Album2 />
            <Album2 />
            <Album2 />
          </div>
        </div>

        <div className="pt-3">
          <div className="text-primary text-xl">
            <h3>Album 3</h3>
          </div>
          <div className="flex justify-between pt-3">
            <Album2 />
            <Album2 />
            <Album2 />
            <Album2 />
            <Album2 />
            <Album2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
