import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            Simplify Your Digital Sphere
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            The all-in-one platform designed to streamline your workflow and boost productivity.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="h-12 px-8 bg-orange-500 text-white hover:bg-orange-600">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-12 px-8 border-orange-200 text-orange-500 hover:bg-orange-50">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}