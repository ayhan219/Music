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
        <h1 onClick={()=>console.log(user)}>🎵 My Playlists</h1>
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
              <p className="text-gray-400 text-lg col-span-full text-center">
                No playlists found.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Playlists;
