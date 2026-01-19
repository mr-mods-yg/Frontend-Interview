import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import CreateBlog from "./pages/CreateBlog";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-blog" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
