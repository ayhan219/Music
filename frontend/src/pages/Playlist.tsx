import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import ToolsForMusic from "../components/ToolsForMusic";
import { getPlaylistMusics } from "../features/MusicSlice";
import Music from "../components/Music";
import { FaMusic } from "react-icons/fa";

const Playlist = () => {
  const currentPlaylist = useAppSelector(
    (state: RootState) => state.userSlice.currentPlaylist
  );
  const user = useAppSelector((state: RootState) => state.userSlice.user);
  const { playlistMusics, loading } = useAppSelector(
    (state: RootState) => state.albumMusic
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.id && currentPlaylist.playlist_id) {
      dispatch(
        getPlaylistMusics({
          user_id: user.id,
          playlist_id: currentPlaylist.playlist_id,
        })
      );
    }
  }, [currentPlaylist]);
  return (
    <div className="w-full h-[90%] pb-16 bg-primary px-2 overflow-y-auto scrollbar-custom">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="w-full h-[45%] md:h-[35%] rounded-lg flex flex-col md:flex-row relative px-10 ">
            <div className=" w-full md:w-[30%] h-[50%] md:h-full ">
              {playlistMusics.length === 0 && (
                <div className="w-full h-full">
                  <div className="w-full h-full flex justify-center items-center text-8xl text-primary shadow-lg">
                    <FaMusic />
                  </div>
                </div>
              )}
              {playlistMusics.length === 1 && (
                <div className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src={`https://cdn-images.dzcdn.net/images/cover/${playlistMusics[0].album?.cover_medium}/500x500-000000-80-0-0.jpg`}
                    alt=""
                  />
                </div>
              )}
              {playlistMusics.length === 2 && (
                <div className="w-full h-full flex">
                  {playlistMusics.slice(0, 2).map((item) => (
                    <img
                      key={item.id}
                      className="w-[50%] h-full object-cover"
                      src={`https://cdn-images.dzcdn.net/images/cover/${item.album?.cover_medium}/500x500-000000-80-0-0.jpg`}
                      alt=""
                    />
                  ))}
                </div>
              )}
              {playlistMusics.length === 3 && (
                <div className="w-full h-full flex flex-col">
                  <div className="flex w-full h-1/2 gap-1">
                    {playlistMusics.slice(0, 3).map((item) => (
                      <img
                        key={item.id}
                        className="w-1/2 h-full object-cover"
                        src={`https://cdn-images.dzcdn.net/images/cover/${item.album?.cover_medium}/500x500-000000-80-0-0.jpg`}
                        alt=""
                      />
                    ))}
                  </div>

                  <div className="flex w-full h-1/2">
                    <img
                      className="w-full h-full object-cover"
                      src={`https://cdn-images.dzcdn.net/images/cover/${playlistMusics[2].album?.cover_medium}/500x500-000000-80-0-0.jpg`}
                      alt=""
                    />
                  </div>
                </div>
              )}
              {playlistMusics.length >= 4 && (
                <div className="w-full h-full grid grid-cols-2 grid-rows-2">
                  {playlistMusics.slice(0, 4).map((item) => (
                    <img
                      key={item.id}
                      className="w-full h-full object-cover"
                      src={`https://cdn-images.dzcdn.net/images/cover/${item.album?.cover_medium}/500x500-000000-80-0-0.jpg`}
                      alt=""
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="w-full md:w-[70%] h-auto md:h-full p-6 rounded-2xl shadow-xl bg-primary transition-all duration-300 flex flex-col">
              <div className="text-gray-900 dark:text-white font-mono flex flex-col justify-between h-full space-y-6">
                {/* Access Text with Icon */}
                <div className="flex items-center space-x-2 text-sm font-medium text-green-600 dark:text-green-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>Public Playlist</p>
                </div>

                {/* Playlist Header with More Prominent Title */}
                <div className="space-y-3">
                  <h1 className="text-xl md:text-3xl font-extrabold leading-tight text-gray-900 dark:text-white">
                    {currentPlaylist.playlist_name}
                  </h1>
                  {currentPlaylist.playlist_description && (
                    <p className="text-xs md:text-base text-gray-600 dark:text-gray-400">
                      {currentPlaylist.playlist_description}
                    </p>
                  )}
                </div>

                {/* User Info with Subtle Separator */}
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-md"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVva9csN-zOiY2wG9CXNuAI1VRsFunaiD3nQ&s"
                    alt="User Avatar"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-800 text-xs md:text-base dark:text-gray-100">
                      {user.username}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {playlistMusics.length === 0 ? (
                        <span className="italic">No tracks yet</span>
                      ) : (
                        `${playlistMusics.length} track${
                          playlistMusics.length > 1 ? "s" : ""
                        }`
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="px-10 pt-16 md:pt-0">
        <ToolsForMusic />
        {playlistMusics.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-primary font-bold text-2xl">
              This playlist is currently empty
            </h1>
          </div>
        ) : (
          <div className="w-full border-b border-gray-600">
            <h1 className="text-primary font-bold font-mono text-xl">Musics</h1>
          </div>
        )}
      </div>

      <div className="w-full h-auto px-6 pt-6 flex flex-col gap-1 ">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {playlistMusics?.map((item, index) => (
              <Music
                key={item.id}
                item={item}
                index={index}
                whichMusic={playlistMusics}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Playlist;
