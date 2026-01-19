import BlogsView from "@/components/BlogsView"
import HeroSection from "@/sections/HeroSection"

function Homepage() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <BlogsView />
    </div>
  )
}

export default Homepage
