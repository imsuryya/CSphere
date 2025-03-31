import { siteContent } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white/50">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            {siteContent.contact.title}
          </h2>
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
                <Textarea id="message" placeholder="Your message" rows={5} className="resize-none" />
              </div>
              <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">Send Message</Button>
            </form>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-xl font-bold">{siteContent.contact.getInTouch.title}</h3>
                <p className="text-gray-600">{siteContent.contact.getInTouch.description}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-orange-500" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">{siteContent.contact.email}</p>
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