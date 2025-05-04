import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { getRadiosForSpecificId } from "../features/MusicSlice";
import { motion } from "framer-motion";

interface RadioProps {
  item: {
    id: number;
    title?: string;
    picture?: string;
    picture_xl?: string;
    md5_image?: string;
    name?: string;
  };
  index: number;
}

const RadioComp = ({ item, index }: RadioProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const radioName = item.title || item.name || "Unknown Radio";

  return (
    <motion.div
      key={index}
      className="w-[220px] h-[250px] rounded-lg relative bg-gray-900 cursor-pointer overflow-hidden group shadow-md hover:shadow-lg transition-shadow duration-300"
      onClick={() => {
        dispatch(getRadiosForSpecificId(item.id));
        navigate(`/radios/${item.id}`);
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <motion.img
        className="w-full h-full object-cover rounded-lg brightness-90 group-hover:brightness-100 transition-brightness duration-300"
        src={item.picture_xl}
        alt={radioName}
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white text-center py-3 px-2">
        <p className="text-lg font-semibold truncate">{radioName}</p>
      </div>
    </motion.div>
  );
};

export default RadioComp;