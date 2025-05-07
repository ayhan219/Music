import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import RadioSingle from "../components/RadioSingle";

const RadioTracks = () => {
  const { radios, loading } = useAppSelector(
    (state: RootState) => state.albumMusic
  );
  return (
    <div className="w-full h-[90%] bg-primary p-8 gap-8">
      <div className="w-full h-full grid grid-cols-4 gap-10 overflow-y-auto scrollbar-custom">
        {loading ? (
          <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {radios.map((item, index) => (
              <RadioSingle item={item} index={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RadioTracks;
