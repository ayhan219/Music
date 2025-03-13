import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoRadioSharp } from "react-icons/io5";
import { PiPlaylist } from "react-icons/pi";
import { RiDvdFill } from "react-icons/ri";
import { FaMusic } from "react-icons/fa";
import { MdOutlineVideoStable } from "react-icons/md";

const Sidebar = () => {
    const [activeMenu,setActiveMenu] = useState<string>("home");
  return (
    <div className='w-[300px] h-full bg-[#212124] sticky top-0'>
        <div className="w-full h-auto flex justify-between items-center p-7">
            <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center">
                <p className="text-xs text-white ">GI</p>
            </div>
            <div className="text-white text-xl font-bold cursor-pointer">
                <HiDotsHorizontal />
            </div>
        </div>
        <div className="w-full h-auto flex p-7">
            <div className="flex flex-col gap-8 text-base font-semibold ">
                <Link onClick={()=>setActiveMenu("home")} className={`text-primary ${activeMenu ==="home" && "text-hover"}`} to="/">Home</Link>
                <Link onClick={()=>setActiveMenu("explore")} className={`text-primary ${activeMenu ==="explore" && "text-hover"}`} to="/explore">Explore</Link>
            </div>
        </div>
        <div className="w-full h-auto">
            <div className="p-4">
                <p className="text-[#9898A6] text-sm">MY COLLECTIONS</p>
            </div>
            <div className="flex flex-col gap-8 text-base font-semibold px-7 ">
                <div className="w-full flex gap-2 items-center ">
                <IoRadioSharp  className="text-xl text-white" />
                <Link onClick={()=>setActiveMenu("mixesandradio")} className={`text-primary ${activeMenu ==="mixesandradio" && "text-hover"}`} to="/">Mixes</Link>
                
                </div>
                <div className="w-full flex gap-2 items-center ">
                    <PiPlaylist className="text-xl text-white" />
                <Link onClick={()=>setActiveMenu("playlists")} className={`text-primary ${activeMenu ==="playlists" && "text-hover"}`} to="/">Playlists</Link>
                </div>
                <div className="w-full flex gap-2 items-center ">
                <RiDvdFill className="text-xl text-white" />
                <Link onClick={()=>setActiveMenu("albums")} className={`text-primary ${activeMenu ==="albums" && "text-hover"}`} to="/albums">Albums And Artists</Link>
                </div>
                <div className="w-full flex gap-2 items-center ">
                <FaMusic className="text-xl text-white"  />
                <Link onClick={()=>setActiveMenu("tracks")} className={`text-primary ${activeMenu ==="tracks" && "text-hover"}`} to="/">Tracks</Link>
                </div>
                <div className="w-full flex gap-2 items-center ">
                <MdOutlineVideoStable className="text-xl text-white" />
                <Link onClick={()=>setActiveMenu("videos")} className={`text-primary ${activeMenu ==="videos" && "text-hover"}`} to="/">Videos</Link>
                </div>
            </div>
        </div>

        <div className="w-full h-auto pt-5">
            <div className="p-4">
                <p className="text-[#9898A6] text-sm">MY PLAYLIST</p>
            </div>
            
        </div>
    </div>
  )
}

export default Sidebar
