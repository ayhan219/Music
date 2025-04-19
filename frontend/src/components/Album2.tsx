interface AlbumProps {
  item: {
    id: number;
    user_id: number;
    playlist_name: string;
    playlist_description: string;
    playlist_id: number;
    created_at: string;
  };
  key: number;
}
const Album2 = ({ item, key }: AlbumProps) => {
  return (
    <div
    onClick={()=>console.log(item)}
      key={key}
      className="w-[220px] h-[320px] rounded-xl overflow-hidden relative cursor-pointer shadow-lg "
    >
      <img
        className="w-full h-[220px] object-cover"
        src="https://artists.apple.com/assets/artist-og-share-c766a5950ae664ea9073ede99da0df1094ae1a24bee32b86ab9e43e7e02bce2e.jpg"
        alt="Album Cover"
      />

      <div className="w-full h-[100px] bg-[#181818] py-3 px-4 l ">
        <p className="text-[#1DB954] text-sm font-semibold">
          {item.playlist_name}
        </p>
        <p className="text-xs text-gray-300 mt-1 leading-tight">
          {item.playlist_description}
        </p>
        <p className="text-xs text-gray-400 pt-3">Playlist</p>
      </div>
    </div>
  );
};

export default Album2;
