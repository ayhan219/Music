interface RadioSingleProps {
  item: {
    id: number;
    title: string;
    duration: number;
    rank: number;
    md5_image: string;
    artist: {
      id: number;
      name: string;
      picture: string;
    };
    album: {
      id: number;
      title: string;
      cover: string;
      cover_xl: string;
      md5_image: string;
    };
  };
  index: number;
}

const RadioSingle = ({ item, index }: RadioSingleProps) => {
  return (
    <div
      key={index}
      className="relative w-[350px] h-[400px] rounded-xl shadow-2xl overflow-hidden cursor-pointer text-white group"
    >
      <div className="relative">
        <img
          src={item.album.cover_xl}
          alt={item.album.title}
          className="w-full h-[200px] object-cover transform group-hover:scale-110 transition duration-500"
        />
        {/* Artist Picture Badge */}
        <div className="absolute -bottom-6 left-4 w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-lg">
          <img
            src={item.artist.picture}
            alt={item.artist.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Info */}
      <div className="pt-10 px-6 pb-6">
        <h1 className="text-2xl font-bold">{item.title}</h1>
        <p className="text-sm text-gray-300">by {item.artist.name}</p>
        <p className="mt-2 text-sm text-gray-400 italic">{item.album.title}</p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">Duration</span>
            <span className="text-base font-semibold">
              {Math.floor(item.duration / 60)}:
              {String(item.duration % 60).padStart(2, "0")}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">Rank</span>
            <span className="text-base font-semibold">{item.rank}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioSingle;
