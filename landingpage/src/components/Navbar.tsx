// In your Navbar.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export const Navbar = () => {
  // Get the client app URL from environment variable
  const clientAppUrl = process.env.NEXT_PUBLIC_CLIENT_APP_URL || "/client"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between rounded-full bg-white/80 px-6 py-3 shadow-md backdrop-blur-sm">
          <Link href="/" className="text-xl font-bold text-orange-500">
            CSphere
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/features.tsx" className="text-sm font-medium text-gray-700 hover:text-orange-500">
              Features
            </Link>
            <Link href="/about.tsx" className="text-sm font-medium text-gray-700 hover:text-orange-500">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-orange-500">
              Contact
            </Link>
            <Link
              href="https://github.com/imsuryya/csphere"
              className="text-sm font-medium text-gray-700 hover:text-orange-500 flex items-center"
            >
              <Github className="mr-1 h-4 w-4" />
              GitHub
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href={`${clientAppUrl}`}>
              <Button variant="outline" className="h-9 border-orange-200 text-orange-500 hover:bg-orange-50">
                Log in
              </Button>
            </Link>
            <Link href={`${clientAppUrl}/signup`}>
              <Button className="h-9 bg-orange-500 text-white hover:bg-orange-600">Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}