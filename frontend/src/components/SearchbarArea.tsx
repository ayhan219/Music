
import { FaSearch } from "react-icons/fa";

const SearchbarArea = () => {

  return (
    <div className="w-full h-28 flex justify-between px-24 pt-4">
     
      <div className="relative flex">
        <FaSearch className="text-white text-base absolute left-2 top-3" />
        <input
          className="bg-[#5a5a5b] px-10 w-[300px] h-10 rounded-lg outline-none text-white placeholder:text-white text-xs placeholder:font-thin"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchbarArea;
