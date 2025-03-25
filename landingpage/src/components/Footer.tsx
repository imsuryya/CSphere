import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="text-xl font-bold text-orange-500">
                CSphere
              </Link>
              <p className="mt-2 text-sm text-gray-600">
                Simplifying your digital workflow with innovative solutions.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-orange-500">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-orange-500">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-orange-500">
                    Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-orange-500">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-orange-500">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-orange-500">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-orange-500">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-orange-500">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-orange-500">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-orange-500">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-orange-500">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} CSphere. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}