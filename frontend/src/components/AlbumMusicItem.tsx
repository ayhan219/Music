

const AlbumMusicItem = () => {
  return (
    <div className="w-[50%] h-16 p-2 flex justify-between ">
      <div className="w-[200px] h-full flex items-center">
        <img
          className="w-[70px] h-full rounded-lg object-cover"
          src="https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg"
          alt=""
        />
        <div className="text-primary font-mono px-4 font-bold">
          <p>Axel F</p>
        </div>
      </div>
      <div>
        <p>134.234</p>
      </div>
      <div>
        <p>2:53</p>
      </div>
    </div>
  );
};

export default AlbumMusicItem;
