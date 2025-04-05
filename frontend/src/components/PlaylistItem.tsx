import { FaMusic } from "react-icons/fa";

interface PlaylistProps {
    item:{
        id: number;
        user_id: number;
        playlist_name: string;
        playlist_description: string;
        playlist_id:number,
        created_at: string;
    },
    index:number
}

const PlaylistItem = ({item}:PlaylistProps) => {
  return (
    <div className="w-[250px] cursor-pointer h-[100px] bg-[#2a2a2d] rounded-xl shadow-lg flex items-center px-4 hover:bg-[#343438] transition duration-300 ease-in-out">
      <div className="w-1/3 flex justify-center items-center text-primary text-4xl">
        <FaMusic />
      </div>
      <div className="w-2/3 text-primary text-lg font-semibold">
        <h1 className="truncate">{item.playlist_name}</h1>
      </div>
    </div>
  );
};

export default PlaylistItem;
