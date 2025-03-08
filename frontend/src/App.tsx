import { BrowserRouter ,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Sidebar from "./components/Sidebar"
import AlbumPage from "./pages/AlbumPage"
import Explore from "./pages/Explore"
import { useSelector } from "react-redux"
import { RootState } from "./app/store"
import MusicPlayBar from "./components/MusicPlayBar"

function App() {

  const isMusicBarOpen = useSelector((state:RootState)=>state.musicPlayer.openMusicBar)

  return (
    <>
    <BrowserRouter>
    <div className="flex">
    <Sidebar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/album/:id" element={<AlbumPage />} />
      <Route path="/explore" element={<Explore />} />
    </Routes>
    {
      isMusicBarOpen && 
      <MusicPlayBar />
    }
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
