import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-background px-4">
      <hr />
      <div className="max-w-container mx-auto">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 py-12">

          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <GraduationCap className="bg-blue-600 p-1 rounded text-white text-xs"/>
              <h3 className="text-xl font-bold text-blue-900">CA MONK</h3>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-md pt-1 font-semibold">Product</h3>
            <a href="#" className="text-sm text-muted-foreground hover:text-blue-600">
              Changelog
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-blue-600">
              Documentation
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-md pt-1 font-semibold">Company</h3>
            <a href="#" className="text-sm text-muted-foreground hover:text-blue-600">
              About
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-blue-600">
              Careers
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-blue-600">
              Blog
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-md pt-1 font-semibold">Contact</h3>
            <a href="#" className="text-sm text-muted-foreground hover:text-blue-600">
              Discord
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-blue-600">
              Twitter
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-blue-600">
              Github
            </a>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t py-6 text-sm text-muted-foreground">
          <div>© 2026 CA MONK. All rights reserved</div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <button
              className="rounded-md border px-2 py-1 text-xs hover:bg-accent"
              aria-label="Toggle theme"
            >
              🌙
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
