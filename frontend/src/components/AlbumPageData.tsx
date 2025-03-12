import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface AlbumProps {
  item: {
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
  };
  index:number
}

const AlbumPageData = ({ item, index }: AlbumProps) => {

    const navigate = useNavigate();

  return (
    <div onClick={()=>navigate(`/album/${item.id}`)} key={index} className="w-[250px] h-[350px] p-4 hover:bg-[#252528] rounded-lg group cursor-pointer flex flex-col justify-evenly ">
      <div className="w-full h-[60%] rounded-lg relative">
        <img
          className="w-full h-full rounded-lg object-cover"
          src={item.cover_xl}
          alt=""
        />
        <div className="absolute w-12 h-12 rounded-full right-3 bottom-3 bg-green-500 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 flex items-center justify-center text-primary shadow-md transition-all duration-150 ease-in-out">
          <FaPlay className="text-lg" />
        </div>
      </div>
      <div className="text-primary font-serif h-[40%]   pt-4">
        <p className="text-md">{item.title}</p>
        <p className="text-[#5b5b67] text-base">2024 - {item.artist.name}</p>
      </div>
    </div>
  );
};

export default AlbumPageData;
