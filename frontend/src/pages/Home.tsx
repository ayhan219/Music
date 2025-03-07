
import Album from "../components/Album";
import Album2 from "../components/Album2";
import SearchbarArea from "../components/SearchbarArea";

const Home = () => {
  return (
    <div className="w-full min-h-screen overflow-y-auto bg-primary">
      <SearchbarArea />
      <div className="px-24 flex flex-col gap-8">
        <div>
        <div className="text-primary text-xl">
          <h3>Album 1</h3>
        </div>
        <div className="flex gap-8 pt-3">
          <Album />
          <Album />
          <Album />
          <Album />
        </div>
        </div>

        <div className="pt-3">
        <div className="text-primary text-xl">
          <h3>Album 2</h3>
        </div>
        <div className="flex gap-8 pt-3">
          <Album2 />
          <Album2 />
          <Album2 />
          <Album2 />
          <Album2 />
        </div>
        </div>

        <div className="pt-3">
        <div className="text-primary text-xl">
          <h3>Album 3</h3>
        </div>
        <div className="flex gap-8 pt-3">
          <Album2 />
          <Album2 />
          <Album2 />
          <Album2 />
          <Album2 />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
