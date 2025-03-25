export const AboutSection = () => {
  return (
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
  )
}