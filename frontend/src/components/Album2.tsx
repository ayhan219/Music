const Album2 = () => {
    return (
      <div className="w-[220px] h-[320px] rounded-xl overflow-hidden relative cursor-pointer shadow-lg ">
        <img
          className="w-full h-[220px] object-cover"
          src="https://virtualpiano.net/wp-content/uploads/2020/10/Dummy-Undertale-Toby-Fox-Best-Online-Piano-Keyboard-Virtual-Piano.jpg"
          alt="Album Cover"
        />
  
        <div className="w-full h-[100px] bg-[#181818] py-3 px-4 l ">
          <p className="text-[#1DB954] text-sm font-semibold">My Mix</p>
          <p className="text-xs text-gray-300 mt-1 leading-tight">
            Discover new songs and enjoy your favorite tunes!
          </p>
          <p className="text-xs text-gray-400 pt-3">Label • 2024</p>
        </div>
      </div>
    );
  };
  
  export default Album2;
  