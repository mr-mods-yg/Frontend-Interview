import BlogsView from "@/components/BlogsView"
import FooterSection from "@/sections/FooterSection"
import HeroSection from "@/sections/HeroSection"

function Homepage() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <BlogsView />
      <FooterSection/>
    </div>
  )
}

export default Homepage
