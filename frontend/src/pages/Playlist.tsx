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
    <div className="w-full h-[90%] bg-primary px-2">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div onClick={()=>console.log(playlistMusics)} className="w-full h-[35%] rounded-lg flex relative  p-10 ">
            <div className="w-[30%] h-full ">
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

              {/* <div className="w-full h-full bg-red-500"></div>
          <div className="w-full h-full bg-black"></div>
          <div className="w-full h-full bg-blue-600"></div>
          <div className="w-full h-full bg-amber-400"></div> */}
            </div>
            <div className="w-[70%] h-full p-4  rounded-2xl shadow-lg">
              <div className="text-primary font-mono flex flex-col justify-evenly h-full space-y-3">
                {/* Access Text */}
                <div className="text-md font-semibold ">
                  <p>This playlist is public and open to everyone</p>
                </div>

                <div className="text-2xl font-bold ">
                  <h1>{currentPlaylist.playlist_name}</h1>
                </div>

                <div className="text-base ">
                  <p>{currentPlaylist.playlist_description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10">
                    <img
                      className="w-full h-full rounded-full object-cover border border-gray-300 shadow-sm"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVva9csN-zOiY2wG9CXNuAI1VRsFunaiD3nQ&s"
                      alt="User Avatar"
                    />
                  </div>
                  <div className="font-semibold flex gap-4 items-center">
                    <p>{user.username}</p>
                    <p className="text-sm text-gray-500">
                      {playlistMusics.length === 0 ? (
                        <span>
                          No tracks yet. Start adding some music to bring this
                          playlist to life!
                        </span>
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
      <div className="px-10">
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

      <div className="w-full max-h-[300px] px-6 pt-6 flex flex-col gap-3 overflow-y-auto scrollbar-hidden scrollbar-custom">
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
