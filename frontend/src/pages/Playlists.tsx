import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import Album2 from "../components/Album2";

const Playlists = () => {
  const { user, loading } = useAppSelector(
    (state: RootState) => state.userSlice
  );

  return (
    <div className="w-full min-h-[90%] bg-primary p-8 sm:p-10 md:p-14">
      <div className="w-full text-white font-bold font-mono text-3xl border-b border-gray-600 pb-4 mb-6">
        <h1 onClick={() => console.log(user)}>🎵 My Playlists</h1>
      </div>

      <div className="h-[670px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 overflow-y-auto overflow-x-hidden scrollbar-custom">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {user?.playlists ? (
              user.playlists.map((item, index) => (
                <Album2 key={index} item={item} index={index} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-24 text-gray-400 mb-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19V6h13M9 6L3 9.5M9 6l6 3.5M9 12l6 3.5"
                  />
                </svg>
                <p className="text-2xl font-semibold text-gray-500 mb-2">
                  No Playlists Found
                </p>
                <p className="text-sm text-gray-400 text-center max-w-xs">
                  You haven’t created any playlists yet. Start exploring music
                  and add your favorites!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Playlists;
