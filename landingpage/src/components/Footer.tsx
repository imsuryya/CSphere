import { siteContent } from "@/lib/content"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Link href="/" className="text-xl font-bold text-orange-500">
                {siteContent.navbar.logo}
              </Link>
              <p className="mt-2 text-sm text-gray-600">{siteContent.footer.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {siteContent.footer.sections.slice(0, 2).map((section, index) => (
                <div key={index}>
                  <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">{section.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link href={link.href} className="text-gray-600 hover:text-orange-500">
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row md:justify-between text-sm text-gray-600">
            <div>{siteContent.footer.copyright}</div>
            {siteContent.footer.sections[2] && (
              <div className="mt-4 md:mt-0">
                <span className="font-semibold">{siteContent.footer.sections[2].title}: </span>
                {siteContent.footer.sections[2].links.map((link, linkIndex) => (
                  <Link key={linkIndex} href={link.href} className="text-gray-600 hover:text-orange-500 ml-1">
                    {link.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

