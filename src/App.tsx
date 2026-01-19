import BlogsView from "./components/BlogsView"
import Navbar from "./components/Navbar"
import HeroSection from "./sections/HeroSection"


function App() {
  return (
    <div className="flex flex-col items-center font-inter">
      <Navbar />
      <HeroSection />
      <BlogsView />
    </div>
  )
}

export default App
