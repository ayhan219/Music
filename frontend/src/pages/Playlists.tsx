import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import Album2 from "../components/Album2";

const Playlists = () => {
  const user = useAppSelector((state: RootState) => state.userSlice.user);

  return (
    <div className="w-full min-h-[90%] bg-primary p-8 sm:p-10 md:p-14">
      <div className="w-full text-white font-bold font-mono text-3xl border-b border-gray-600 pb-4 mb-6">
        <h1>🎵 My Playlists</h1>
      </div>

      <div className="h-[670px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 overflow-y-auto overflow-x-hidden scrollbar-custom">
        {user?.playlists? (
          user.playlists.map((item, index) => (
            <Album2 key={index} item={item}  />
          ))
        ) : (
          <p className="text-gray-400 text-lg col-span-full text-center">
            No playlists found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Playlists;
