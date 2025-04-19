import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import ToolsForMusic from "../components/ToolsForMusic";
import { getPlaylistMusics } from "../features/MusicSlice";
import Music from "../components/Music";

const Playlist = () => {
  const currentPlaylist = useAppSelector(
    (state: RootState) => state.userSlice.currentPlaylist
  );
  const user = useAppSelector((state: RootState) => state.userSlice.user);
  const playlistMusics = useAppSelector(
    (state: RootState) => state.albumMusic.playlistMusics
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
    <div
      onClick={() => console.log(playlistMusics)}
      className="w-full h-[90%] bg-primary px-2"
    >
      <div className="w-full h-[40%] rounded-lg flex relative bg-[#2b2b31] p-10 ">
        <div className="w-[30%] h-full ">
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
          {playlistMusics.length === 4 && (
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
                <p>
                  {playlistMusics.length === 0 ? (
                    <p>No music. Add some musics to your playlist</p>
                  ) : (
                    playlistMusics.length
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 pt-4">
        <ToolsForMusic />
        {playlistMusics.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-primary font-bold text-2xl">No music found</h1>
          </div>
        ) : (
          <div className="w-full border-b border-gray-600">
            <h1 className="text-primary font-bold font-mono text-xl">Musics</h1>
          </div>
        )}
      </div>

      <div className="w-full max-h-[350px] px-14 pt-10 flex  flex-col gap-3 overflow-y-auto scrollbar-hidden scrollbar-custom">
        {playlistMusics?.map((item, index) => (
          <Music
            key={item.id}
            item={item}
            index={index}
            whichMusic={playlistMusics}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
