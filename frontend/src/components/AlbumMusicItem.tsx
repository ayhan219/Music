import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useAppDispatch } from "../app/hooks";
import {
  setIsPlaying,
  setMusicId,
  setOpenMusicBar,
} from "../features/PlayingMusicSlice";
import { setCurrentAlbumMusic } from "../features/MusicSlice";

interface ArtistMusicProps {
  item: {
    id: number;
    title: string;
    duration: number;
    rank: number;
    preview: string;
    contributers: [
      {
        name: string;
      }
    ];
  };
  index: number;
}

const AlbumMusicItem = ({ item, index }: ArtistMusicProps) => {
  const dispatch = useAppDispatch();
  const { artist, artistPopularMusic } = useSelector(
    (state: RootState) => state.artist
  );
  return (
    <div
      onClick={() => {
        dispatch(setMusicId(item.id));
        dispatch(setCurrentAlbumMusic(artistPopularMusic || []));
        dispatch(setOpenMusicBar(true));
        dispatch(setIsPlaying(true));
      }}
      key={index}
      className="w-[70%] h-16 p-2 flex justify-between items-center cursor-pointer hover:bg-[#222224] rounded-md "
    >
      <div className="w-[300px] h-full flex items-center">
        <img
          className="w-[70px] h-full rounded-lg object-cover"
          src={artist?.picture_xl}
          alt=""
        />
        <div className="text-primary w-full font-mono px-4 font-bold ">
          <p>{item.title}</p>
        </div>
      </div>
      <div>
        <p>{item.rank}</p>
      </div>
      <div>
        <p>
          {Math.floor(item.duration / 60)}:
          {(item.duration % 60).toString().padStart(2, "0")}
        </p>
      </div>
    </div>
  );
};

export default AlbumMusicItem;
