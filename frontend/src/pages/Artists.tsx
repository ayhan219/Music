import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import Artist from "../components/Artist";

const Artists = () => {
  const { artists, loading } = useAppSelector(
    (state: RootState) => state.albumMusic
  );

  const transformArtist = (item: any) => ({
    artist: {
      id: item.id,
      name: item.name,
      picture_big: item.picture_big ?? item.picture,
    },
  });

  return (
    <div className="w-full h-[90%] bg-primary">
      {loading ? (
        <div className="flex justify-center items-center pt-20 h-full">
          <div className="w-12 h-12 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center  xl:grid-cols-5 gap-4 p-4 overflow-y-auto scrollbar-custom">
            {artists.map((item, index) => (
              <Artist item={transformArtist(item)} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Artists;
