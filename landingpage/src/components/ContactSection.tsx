import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export const ContactSection = () => {
  return (
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
  )
}