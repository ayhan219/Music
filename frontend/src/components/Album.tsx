import { IoMdArrowDropright } from "react-icons/io";

const Album = () => {
  return (
    <div className="w-[250px] h-[350px] bg-black rounded-xl relative cursor-pointer overflow-hidden group">
      <img
        className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
        src="https://virtualpiano.net/wp-content/uploads/2020/10/Dummy-Undertale-Toby-Fox-Best-Online-Piano-Keyboard-Virtual-Piano.jpg"
        alt=""
      />

      <div className="w-full h-24 bg-black/70 backdrop-blur-md absolute bottom-0 px-4 py-3 transition-opacity duration-300 group-hover:bg-black/90">
        <div className="w-10 h-10 rounded-full bg-white shadow-lg absolute right-6 -top-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <IoMdArrowDropright className="text-3xl text-black" />
        </div>

        <p className="text-red-500 font-semibold text-xs tracking-wide">
          New for you
        </p>
        <p className="text-white text-sm font-medium mt-1">My New Arrivals</p>
        <p className="text-xs text-gray-400 mt-1 leading-tight">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>
    </div>
  );
};

export default Album;
