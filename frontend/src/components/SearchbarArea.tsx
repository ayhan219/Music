import { FaSearch } from "react-icons/fa"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"


const SearchbarArea = () => {
  return (
    <div className='w-full h-28 flex justify-between px-24 pt-4'>
        <div className="flex gap-2">
          <div className='w-10 h-10 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer'>
          <MdOutlineKeyboardArrowLeft className="text-white text-2xl" />
            </div>  
            <div className='w-10 h-10 rounded-full bg-[#404048] flex items-center justify-center cursor-pointer'>
            <MdOutlineKeyboardArrowRight className="text-white text-2xl" />
            </div> 
        </div>
        <div className="relative flex">
        <FaSearch className="text-white text-base absolute left-2 top-3" />
            <input className="bg-[#1F1F22] px-10 w-[300px] h-10 rounded-lg outline-none text-white placeholder:text-white text-xs placeholder:font-thin" type="text" placeholder="Search" />
        </div>
    </div>
  )
}

export default SearchbarArea
