import { siteContent } from "@/lib/content"

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white/50">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{siteContent.about.title}</h2>
              {siteContent.about.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`${index < siteContent.about.paragraphs.length - 1 ? "mb-6" : ""} text-lg text-gray-600`}
                >
                  {paragraph}
                </p>
              ))}
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
  )
}

