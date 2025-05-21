import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import Album from "../components/Album";
import {  getMoreReleasedAlbums } from "../features/MusicSlice";

const ReleasedAlbumsPage = () => {
  const { releasedAlbums, loading } = useAppSelector(
    (state: RootState) => state.albumMusic
  );
  const [offset, setOffset] = useState<number>(20);
  const dispatch = useAppDispatch();

  const handleLoadMore = () => {
    dispatch(getMoreReleasedAlbums(offset));
    setOffset((prev) => prev + 10);
  };

  return (
    <div className="w-full h-[90%] bg-primary overflow-y-auto scrollbar-custom px-6 ">
      <div className="text-white text-xl md:text-3xl font-bold mb-3">
        <h1>Popular Albums</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-16">
        {releasedAlbums.map((item, index) => (
          <Album item={item} key={index} />
        ))}
      </div>

      <div className="w-full flex justify-center pb-7">
        {loading ? (
          <>
            <div className="flex  h-full">
              <div className="w-12 h-9 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={handleLoadMore}
              className="px-4 py-1 bg-gray-600 cursor-pointer text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200"
            >
              See More
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReleasedAlbumsPage;
