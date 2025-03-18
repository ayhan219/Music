import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Explore from "./pages/Explore";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import MusicPlayBar from "./components/MusicPlayBar";
import SearchedDatas from "./pages/SearchedDatas";
import SearchbarArea from "./components/SearchbarArea";
import AlbumsAndArtists from "./pages/AlbumsAndArtists";
import MusicPage from "./pages/MusicPage";
import ArtistDetail from "./pages/ArtistDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";

function App() {
  const isMusicBarOpen = useSelector((state: RootState) => state.musicPlayer.openMusicBar);

  return (
    <BrowserRouter>
     <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="*"
          element={
            <div className="flex w-full h-screen">
              <Sidebar />
              <div className="w-full flex-1 h-auto bg-black">
                <SearchbarArea />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/album/:id" element={<MusicPage />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/search" element={<SearchedDatas />} />
                  <Route path="/albums" element={<AlbumsAndArtists />} />
                  <Route path="/artist/:id" element={<ArtistDetail />} />
                </Routes>
              </div>
              {isMusicBarOpen && <MusicPlayBar />}
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
