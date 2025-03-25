export const FeaturesSection = () => {
  const features = [
    {
      title: "Seamless Integration",
      description: "Connect with your favorite tools and services without any hassle.",
    },
    {
      title: "Advanced Analytics",
      description: "Gain valuable insights with our comprehensive analytics dashboard.",
    },
    {
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security measures.",
    },
  ]

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Features that make a difference
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <div className="h-6 w-6 rounded-full bg-orange-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}