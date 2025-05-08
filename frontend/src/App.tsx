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
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { getUser } from "./features/UserSlice";
import Redirect from "./pages/Redirect";
import Playlist from "./pages/Playlist";
import Playlists from "./pages/Playlists";
import PopularAlbumsPage from "./pages/PopularAlbumsPage";
import ReleasedAlbumsPage from "./pages/ReleasedAlbumsPage";
import Radios from "./pages/Radios";
import Genres from "./pages/Genres";
import Artists from "./pages/Artists";
import RadioTracks from "./pages/RadioTracks";

function App() {
  const isMusicBarOpen = useSelector(
    (state: RootState) => state.musicPlayer.openMusicBar
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/redirect" element={<Redirect />} />

        <Route
          path="*"
          element={
            <div className="flex w-full h-screen overflow-y-hidden">
              <Sidebar />
              <div className="w-[calc(100%-300px)] flex-1 pt-14 h-auto bg-black">
                <SearchbarArea />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/album/:id" element={<MusicPage />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/search" element={<SearchedDatas />} />
                  <Route path="/albums" element={<AlbumsAndArtists />} />
                  <Route path="/artist/:id" element={<ArtistDetail />} />
                  <Route path="/playlist/:id" element={<Playlist />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route
                    path="/popularalbums"
                    element={<PopularAlbumsPage />}
                  />
                  <Route
                    path="/releasedalbums"
                    element={<ReleasedAlbumsPage />}
                  />
                  <Route path="/radios" element={<Radios />} />
                  <Route path="/genres" element={<Genres />} />
                  <Route path="/artists" element={<Artists />} />
                  <Route path="/radios/:id" element={<RadioTracks />} />
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
