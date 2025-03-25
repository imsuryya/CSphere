import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { AboutSection } from "@/components/AboutSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-100">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}