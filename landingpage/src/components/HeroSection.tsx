import { siteContent } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"
import Link from "next/link"

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">{siteContent.hero.title}</h1>
          <p className="mb-8 text-xl text-gray-600">{siteContent.hero.description}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={process.env.NEXT_PUBLIC_CLIENT_APP_URL || "/client"}>
              <Button className="h-12 px-8 bg-orange-500 text-white hover:bg-orange-600">
                {siteContent.hero.buttons.primary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://github.com/yourusername/csphere">
              <Button
                variant="outline"
                className="h-12 px-8 border-orange-200 text-orange-500 hover:bg-orange-50 flex items-center"
              >
                <Github className="mr-2 h-4 w-4" />
                Contribute on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

