import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { IoRadioSharp } from "react-icons/io5";
import { PiPlaylist } from "react-icons/pi";
import { RiDvdFill } from "react-icons/ri";
import { FaArrowUp, FaCompactDisc, FaMusic, FaRupeeSign } from "react-icons/fa";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useAppDispatch } from "../app/hooks";
import { logoutUser, setCurrentPlaylist } from "../features/UserSlice";
import { IoMdAdd, IoMdRadio } from "react-icons/io";
import CreatePlaylist from "./CreatePlaylist";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState<string>("home");
  const user = useSelector((state: RootState) => state.userSlice.user);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openCreatePlaylist, setOpenCreatePlaylist] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className="w-[80px] md:w-[300px] h-full bg-[#212124] sticky top-0 z-[2000]">
      <div className="w-full h-auto flex justify-between items-center p-7">
        <div className="w-3 h-3 sm:w-7 sm:h-7 rounded-full bg-gray-600 flex items-center justify-center">
          <p className="text-xs text-white ">
            {user ? user.username?.slice(0, 2).toUpperCase() : ""}
          </p>
        </div>
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="text-white text-xl font-bold cursor-pointer"
        >
          {!openMenu && <HiDotsHorizontal />}
        </div>
      </div>
      <div className="w-full h-auto flex p-7">
        <div className="flex flex-col gap-8 text-base font-semibold ">
          <Link
            onClick={() => setActiveMenu("home")}
            className={`text-xs sm:text-base text-primary  ${
              activeMenu === "home" && "text-hover"
            }`}
            to="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setActiveMenu("explore")}
            className={` text-xs sm:text-base text-primary ${
              activeMenu === "explore" && "text-hover"
            }`}
            to="/explore"
          >
            Explore
          </Link>
        </div>
      </div>
      <div className="w-full h-auto">
        <div className="p-2 sm:p-4">
          <p className="text-[#9898A6]  text-sm hidden sm:flex">MY COLLECTIONS</p>
        </div>
        <div className="flex flex-col gap-8 text-base font-semibold px-7 ">
          <div className="w-full flex gap-2 items-center ">
            <Link
              onClick={() => setActiveMenu("playlists")}
              className={`text-primary flex gap-2 ${
                activeMenu === "playlists" && "text-hover"
              }`}
              to="/playlists"
            >
              <PiPlaylist className="text-3xl sm:text-xl text-white" />
              <span className="hidden sm:flex">Playlists</span>
            </Link>
          </div>
          <div className="w-full flex gap-2 items-center ">
            <Link
              onClick={() => setActiveMenu("albums")}
              className={`text-primary flex gap-2 ${
                activeMenu === "albums" && "text-hover"
              }`}
              to="/albums"
            >
              <RiDvdFill className="text-3xl sm:text-xl text-white" />
              <span className="hidden sm:flex">Albums And Artists</span>
            </Link>
          </div>
          <div className="w-full flex gap-2 items-center ">
            <Link
              onClick={() => setActiveMenu("genres")}
              className={`text-primary flex gap-2 ${
                activeMenu === "genres" && "text-hover"
              }`}
              to="/genres"
            >
              <FaMusic className="text-3xl sm:text-xl text-white" />
              <span className="hidden sm:flex">Genres</span>
            </Link>
          </div>
          <div className="w-full flex gap-2 items-center ">
            <Link
              onClick={() => setActiveMenu("radios")}
              className={`text-primary flex gap-2 ${
                activeMenu === "radios" && "text-hover"
              }`}
              to="/radios"
            >
              <IoMdRadio className="text-3xl sm:text-xl text-white" />
              <span className="hidden sm:flex">Radios</span>
            </Link>
          </div>
          <div className="w-full flex gap-2 items-center ">
            <Link
              onClick={() => setActiveMenu("mixesandradio")}
              className={`text-primary flex gap-2 ${
                activeMenu === "mixesandradio" && "text-hover"
              }`}
              to="/"
            >
              <IoRadioSharp className="text-3xl sm:text-xl text-white" />
              <span className="hidden sm:flex">Mixes</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full h-auto pt-5">
        <div className="p-4 text-[#9898A6] flex justify-center sm:justify-between  items-center  ">
          <p className="hidden sm:flex text-sm">MY PLAYLIST</p>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate("/playlists")}
              className="hidden sm:flex text-xs cursor-pointer"
            >
              Show all
            </button>
            <IoMdAdd
              onClick={() => {
                if (user.id) {
                  setOpenCreatePlaylist(true);
                } else {
                  navigate("/login");
                }
              }}
              className="text-2xl sm:text-xl cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full h-[300px] hidden sm:flex flex-col gap-6 px-6 overflow-y-auto scrollbar-custom">
          {user?.playlists?.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/playlist/${item.playlist_id}`);
                dispatch(setCurrentPlaylist(item));
                setActiveMenu("");
              }}
              key={index}
              className="text-primary font-bold cursor-pointer flex items-center gap-2"
            >
              <FaCompactDisc />
              <p>{item.playlist_name}</p>
            </div>
          ))}
        </div>
      </div>
      {openMenu && (
        <div className="w-full bg-[#1F1F22] h-40 top-16 bg-gradient-to-r from-primary to-primary-dark absolute rounded-xl shadow-2xl flex justify-center items-center transition-all duration-300">
          {user?.id ? (
            <div className="w-full h-full flex flex-col justify-center items-center px-6 py-4">
              <div
                onClick={() => dispatch(logoutUser())}
                className="text-white flex items-center gap-3 cursor-pointer hover:bg-gray-800/50 px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                <CiLogout className="text-2xl" />
                <p className="font-semibold text-lg">Logout</p>
              </div>
              <div className="w-full h-auto text-white text-base flex justify-end pr-7 items-center">
                <FaArrowUp
                  onClick={() => setOpenMenu(false)}
                  className="cursor-pointer hover:text-hover transition-all duration-300"
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6">
              <div className="text-white flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-300">
                <CiLogin className="text-3xl hover:text-hover transition-all duration-300" />
                <Link
                  to="/login"
                  className="font-bold text-xl hover:text-hover transition-all duration-300"
                >
                  Login
                </Link>
              </div>
              <div className="text-white flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-300 group">
                <FaRupeeSign className="text-3xl group-hover:text-hover transition-all duration-300" />
                <Link
                  to="/signup"
                  className="font-bold text-xl group-hover:text-hover transition-all duration-300"
                >
                  Signup
                </Link>
              </div>
              <div className="w-full h-auto text-white text-base flex justify-end pr-7 items-center">
                <FaArrowUp
                  onClick={() => setOpenMenu(false)}
                  className="cursor-pointer hover:text-hover transition-all duration-300"
                />
              </div>
            </div>
          )}
        </div>
      )}
      {openCreatePlaylist && (
        <CreatePlaylist setOpenCreatePlaylist={setOpenCreatePlaylist} />
      )}
    </div>
  );
};

export default Sidebar;
