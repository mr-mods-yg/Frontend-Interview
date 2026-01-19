import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import CreateBlog from "./pages/CreateBlog";
import Navbar from "./components/Navbar";
import Footer from "./sections/FooterSection";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-blog" element={<CreateBlog />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
