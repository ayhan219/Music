import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setInput } from "../features/generalSlice";

const SearchbarArea = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="w-full h-[10%] flex justify-center px-24 pt-4 bg-primary">
      <div className="relative flex">
        <FaSearch className="text-white text-base absolute left-2 top-3" />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setInput(e.target.value));
            navigate("/search");
          }}
          className="bg-[#5a5a5b] px-10 w-[300px] h-10 rounded-lg outline-none text-white placeholder:text-white text-xs placeholder:font-thin"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchbarArea;
