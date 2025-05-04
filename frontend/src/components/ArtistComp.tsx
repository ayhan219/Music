import { useNavigate } from "react-router-dom";
import { getArtists } from "../features/MusicSlice";
import { useAppDispatch } from "../app/hooks";
import { motion } from "framer-motion"; 

interface ArtistProps {
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

const ArtistComp = ({ item, index }: ArtistProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const artistName = item.title || item.name || "Unknown Artist"; 

  return (
    <motion.div
      key={index}
      className="w-[220px] h-[250px] rounded-lg relative bg-gray-900 cursor-pointer overflow-hidden group shadow-md hover:shadow-lg transition-shadow duration-300"
      onClick={() => {
        navigate(`/artists`);
        dispatch(getArtists(item.id));
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <motion.img
        className="w-full h-full object-cover rounded-lg brightness-90 group-hover:brightness-100 transition-brightness duration-300"
        src={item.picture_xl}
        alt={artistName}
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white text-center py-3 px-2">
        <p className="text-lg font-semibold truncate">{artistName}</p>
      </div>
    </motion.div>
  );
};

export default ArtistComp;