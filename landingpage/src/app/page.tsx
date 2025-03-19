import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-100">
      {/* Floating Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between rounded-full bg-white/80 px-6 py-3 shadow-md backdrop-blur-sm">
            <Link href="/" className="text-xl font-bold text-orange-500">
              CSphere
            </Link>
            <nav className="hidden space-x-6 md:flex">
              <Link href="#features" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                Features
              </Link>
              <Link href="#about" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                About
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                Pricing
              </Link>
              <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="h-9 border-orange-200 text-orange-500 hover:bg-orange-50">
                Log in
              </Button>
              <Button className="h-9 bg-orange-500 text-white hover:bg-orange-600">Sign up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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


      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">About CSphere</h2>
                <p className="mb-6 text-lg text-gray-600">
                  CSphere was founded with a simple mission: to create tools that simplify complex workflows. Our team
                  of experts is dedicated to building solutions that help businesses thrive in the digital age.
                </p>
                <p className="text-lg text-gray-600">
                  With years of industry experience, we understand the challenges you face and are committed to
                  providing innovative solutions that address your specific needs.
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 p-1">
                <div className="aspect-video rounded-lg bg-white/80 flex items-center justify-center">
                  <p className="text-orange-500 font-medium">Company Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              Simple, transparent pricing
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "$9",
                  description: "Perfect for individuals and small projects",
                  features: ["5 Projects", "Basic Analytics", "24/7 Support"],
                },
                {
                  name: "Professional",
                  price: "$29",
                  description: "Ideal for growing businesses and teams",
                  features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "Team Collaboration"],
                },
                {
                  name: "Enterprise",
                  price: "$99",
                  description: "For large organizations with complex needs",
                  features: ["Custom Solutions", "Dedicated Account Manager", "SLA Guarantees", "Advanced Security"],
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-6 ${index === 1 ? "bg-orange-50 ring-1 ring-orange-200" : "bg-white"} shadow-sm`}
                >
                  <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="mb-6 text-gray-600">{plan.description}</p>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-orange-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${index === 1 ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-white text-orange-500 border border-orange-200 hover:bg-orange-50"}`}
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">Contact Us</h2>
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your message" rows={5} />
                  </div>
                  <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">Send Message</Button>
                </form>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-xl font-bold">Get in Touch</h3>
                  <p className="text-gray-600">
                    Have questions or need assistance? Our team is here to help. Reach out to us using the contact form
                    or through any of the channels below.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="mr-3 h-5 w-5 text-orange-500" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600">info@csphere.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="mr-3 h-5 w-5 text-orange-500" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="mr-3 h-5 w-5 text-orange-500" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-600">123 Innovation Street, Tech City, TC 12345</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                      Pricing
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
    </div>
  )
}
