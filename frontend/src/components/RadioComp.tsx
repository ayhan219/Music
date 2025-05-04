import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { getRadiosForSpecificId } from "../features/MusicSlice";

interface RadioProps {
  item: {
    id: number;
    title: string;
    picture: string;
    picture_xl: string;
    md5_image: string;
    name?: string;
  },
  index:number
}

const RadioComp = ({ item, index }: RadioProps) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
   
   <div onClick={()=>{
    dispatch(getRadiosForSpecificId(item.id))
    navigate(`/radios/${item.id}`)
   }}  key={index} className="w-[220px] h-[250px] rounded-lg relative bg-black cursor-pointer overflow-hidden group">
      <img
        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
        src={item.picture_xl}
        alt="Radio"
      />
      <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-2">
        <p className="text-lg font-semibold">{item.title ? item.title : item.name}</p>
      </div>
      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 text-black px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition">
        ▶️ Play
      </button>
    </div>
  );
};

export default RadioComp;
