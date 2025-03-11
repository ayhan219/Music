import { BrowserRouter ,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Sidebar from "./components/Sidebar"
import AlbumPage from "./pages/AlbumPage"
import Explore from "./pages/Explore"
import { useSelector } from "react-redux"
import { RootState } from "./app/store"
import MusicPlayBar from "./components/MusicPlayBar"
import SearchedDatas from "./pages/SearchedDatas"
import SearchbarArea from "./components/SearchbarArea"

function App() {

  const isMusicBarOpen = useSelector((state:RootState)=>state.musicPlayer.openMusicBar)

  return (
    <>
    <BrowserRouter>
    <div className="flex w-full ">
    <Sidebar />
    <div className="flex-1">
      <SearchbarArea />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/album/:id" element={<AlbumPage />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/search" element={<SearchedDatas/>} />
    </Routes>
    {
      isMusicBarOpen && 
      <MusicPlayBar />
    }
    </div>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
