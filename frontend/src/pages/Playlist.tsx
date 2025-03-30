import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import ToolsForMusic from "../components/ToolsForMusic";

const Playlist = () => {
  const currentPlaylist = useAppSelector((state:RootState)=>state.userSlice.currentPlaylist)
  const user = useAppSelector((state:RootState)=>state.userSlice.user);
  return (
    <div className="w-full h-[90%] bg-primary px-2">
      <div className="w-full h-[40%] rounded-lg flex relative bg-[#2b2b31] p-10 ">
        <div className="w-[30%] h-full bg-white grid grid-cols-2">
          <div className="w-full h-full bg-red-500"></div>
          <div className="w-full h-full bg-black"></div>
          <div className="w-full h-full bg-blue-600"></div>
          <div className="w-full h-full bg-amber-400"></div>
        </div>
        <div className="w-[70%] h-full ">
          <div className="text-primary font-mono flex flex-col justify-evenly px-5 h-full">
            <div className="text-xl">
              <p>Open for public playlist</p>
            </div>
            <div className="text-3xl">
              <h1>{currentPlaylist.playlist_name}</h1>
            </div>
            <div>
              <p>{currentPlaylist.playlist_description}</p>
            </div>
            <div className="flex items-center gap-2">
            <div className="w-9 h-9 ">
              <img
              className="w-full h-full rounded-full object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVva9csN-zOiY2wG9CXNuAI1VRsFunaiD3nQ&s"
                alt=""
              />
            </div>
            <div className="font-bold flex gap-4 items-center">
              <p>{user.username}</p>
              <p>125 music</p>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 pt-4">
            <ToolsForMusic />
              <div className="w-full border-b border-gray-600">
                <h1 className="text-primary font-bold font-mono text-xl">
                  Musics
                </h1>
              </div>
            </div>

            <div className="w-full max-h-[350px] px-14 pt-10 flex  flex-col gap-3 overflow-y-auto scrollbar-hidden scrollbar-custom">

            </div>
    </div>
  );
};

export default Playlist;
