import { GraduationCap } from "lucide-react"
import { Link, NavLink } from "react-router"

function Navbar() {
    return (
        <nav className="w-full bg-white border-b px-8 py-4 flex justify-between items-center">
            <NavLink to={"/"} className="flex items-center gap-2 font-bold text-xl text-blue-900">
                <GraduationCap className="bg-blue-600 p-1 rounded text-white text-xs"/> CA MONK
            </NavLink>
            <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                <a href="#" className="hover:text-blue-600">Tools</a>
                <a href="#" className="hover:text-blue-600">Practice</a>
                <a href="#" className="hover:text-blue-600">Events</a>
                <a href="#" className="hover:text-blue-600">Job Board</a>
            </div>
            <Link to={"/create-blog"} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold">Create Blog</Link>
        </nav>
    )
}

export default Navbar
