import { BrowserRouter ,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Sidebar from "./components/Sidebar"
import AlbumPage from "./pages/AlbumPage"
import Explore from "./pages/Explore"

function App() {

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
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
