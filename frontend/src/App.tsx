import { BrowserRouter ,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Sidebar from "./components/Sidebar"

function App() {

  return (
    <>
    <BrowserRouter>
    <div className="flex">
    <Sidebar />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
