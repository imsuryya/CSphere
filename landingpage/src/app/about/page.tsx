import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Mail, Twitter, Users, Lightbulb, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "CSphere - About Us",
  description: "Learn about CSphere's mission, team, and journey to revolutionize CS education",
}

export default function AboutPage() {
  return (
    <main className="container px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">About CSphere</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Our mission is to make computer science education accessible, engaging, and effective for students
            worldwide.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-20">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span className="inline-block w-8 h-1 bg-orange-500 rounded-full"></span>
            Our Story
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                CSphere was founded with a simple mission: to help students excel in computer science subjects. What
                started as a small project to create AI-powered study assistants has grown into a comprehensive platform
                used by over 100+ students worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our team of CS educators and AI specialists recognized a gap in computer science education - students
                often struggled to find reliable, accessible resources that could answer their specific questions and
                guide their learning journey.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By combining the power of advanced AI models like Gemini with educational expertise, we've created a
                platform that provides personalized, on-demand assistance across the entire CS curriculum.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-64 w-full overflow-hidden rounded-xl md:h-80 shadow-lg">
                <Image
                  src="/placeholder.svg?height=320&width=480"
                  alt="CSphere team working"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span className="inline-block w-8 h-1 bg-orange-500 rounded-full"></span>
            Our Values
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 border-orange-100 h-full hover:border-orange-300 hover:shadow-md transition-all duration-300">
              <CardContent className="pt-6 flex flex-col items-start h-full">
                <div className="bg-orange-100 p-3 rounded-lg mb-4">
                  <Users className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Accessibility</h3>
                <p className="text-gray-600">
                  We believe quality CS education should be accessible to everyone, regardless of background or
                  location.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 h-full hover:border-orange-300 hover:shadow-md transition-all duration-300">
              <CardContent className="pt-6 flex flex-col items-start h-full">
                <div className="bg-orange-100 p-3 rounded-lg mb-4">
                  <Lightbulb className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Innovation</h3>
                <p className="text-gray-600">
                  We continuously explore new technologies and teaching methods to improve the learning experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 h-full hover:border-orange-300 hover:shadow-md transition-all duration-300">
              <CardContent className="pt-6 flex flex-col items-start h-full">
                <div className="bg-orange-100 p-3 rounded-lg mb-4">
                  <Heart className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Community</h3>
                <p className="text-gray-600">
                  We foster a collaborative environment where students can learn from each other and contribute to the
                  platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Open Source */}
        <div className="mb-20 rounded-xl bg-gradient-to-br from-gray-50 to-orange-50 p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Open Source</h2>
              <p className="text-gray-600 leading-relaxed">
                CSphere is proudly open source. We believe in transparency and community-driven development, which is
                why our entire platform is available on GitHub under the MIT license.
              </p>
              <p className="mb-6 text-gray-600 leading-relaxed">
                By making CSphere open source, we invite developers, educators, and students to contribute to the
                project, suggest improvements, and help us build the best CS learning platform possible.
              </p>
              <Link href="https://github.com/yourusername/csphere">
                <Button className="flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300">
                  <Github className="h-5 w-5" />
                  View on GitHub
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-64 w-full overflow-hidden rounded-xl md:h-80 shadow-lg">
                <Image
                  src="/placeholder.svg?height=320&width=480"
                  alt="CSphere GitHub repository"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Impact */}
        <div className="mb-20">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span className="inline-block w-8 h-1 bg-orange-500 rounded-full"></span>
            Our Impact
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="mb-2 text-5xl font-bold text-orange-500">100+</span>
              <p className="text-gray-600 font-medium">Active Students</p>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="mb-2 text-5xl font-bold text-orange-500">50+</span>
              <p className="text-gray-600 font-medium">Specialized Chatbots</p>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="mb-2 text-5xl font-bold text-orange-500">24/7</span>
              <p className="text-gray-600 font-medium">Learning Support</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span className="inline-block w-8 h-1 bg-orange-500 rounded-full"></span>
            Our Team
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-orange-100 transition-transform duration-300 group-hover:scale-105 group-hover:border-orange-300">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Alex Johnson"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 font-semibold text-lg">Alex Johnson</h3>
              <p className="mb-3 text-sm text-orange-500 font-medium">Founder & Lead Developer</p>
              <div className="flex space-x-3">
                <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-orange-100 transition-transform duration-300 group-hover:scale-105 group-hover:border-orange-300">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Sarah Chen"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 font-semibold text-lg">Sarah Chen</h3>
              <p className="mb-3 text-sm text-orange-500 font-medium">AI Specialist</p>
              <div className="flex space-x-3">
                <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-orange-100 transition-transform duration-300 group-hover:scale-105 group-hover:border-orange-300">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Michael Rodriguez"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 font-semibold text-lg">Michael Rodriguez</h3>
              <p className="mb-3 text-sm text-orange-500 font-medium">CS Education Lead</p>
              <div className="flex space-x-3">
                <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 p-8 text-center shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Get in Touch</h2>
          <p className="mb-6 text-gray-600">
            Have questions or want to learn more about CSphere? We'd love to hear from you!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="mailto:info@csphere.com">
              <Button className="flex h-12 items-center gap-2 px-8 bg-orange-500 text-white hover:bg-orange-600">
                <Mail className="h-5 w-5" />
                Contact Us
              </Button>
            </Link>
            <Link href="https://github.com/yourusername/csphere">
              <Button
                variant="outline"
                className="flex h-12 items-center gap-2 px-8 border-orange-200 text-orange-500 hover:bg-orange-50"
              >
                <Github className="h-5 w-5" />
                GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

