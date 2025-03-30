// Content management file for CSphere website

export const siteContent = {
  // SEO and general info
  seo: {
    title: "CSphere - AI-Powered CS Learning Platform",
    description:
      "CSphere helps students with CS subjects through 50+ specialized chatbots, providing real-time resources like blogs and YouTube videos. Open-source, powered by Gemini AI and Tavily.",
    keywords: "CS learning, computer science, AI chatbots, student resources, Gemini AI, Tavily",
  },

  // Navbar content
  navbar: {
    logo: "CSphere",
    links: [
      { text: "Features", href: "/features" },
      { text: "About", href: "/about" },
      { text: "Contact", href: "#contact" },
      { text: "Updates", href: "/updates" },
    ],
    buttons: {
      login: "Log in",
      signup: "Sign up",
    },
  },

  // Hero section content
  hero: {
    title: "AI-Powered CS Learning Platform",
    description:
      "CSphere helps students master computer science subjects with specialized AI chatbots and curated resources.",
    buttons: {
      primary: "Get Started",
      secondary: "Learn More",
    },
  },

  // Features section content
  features: {
    title: "Features that make a difference",
    items: [
      {
        title: "50+ Specialized Chatbots",
        description: "Access subject-specific AI assistants designed to help with various CS topics.",
      },
      {
        title: "Real-time Resources",
        description: "Get instant access to relevant blogs and YouTube videos for your CS subjects.",
      },
      {
        title: "Open-Source Platform",
        description: "Built on open-source technology, powered by Gemini AI and Tavily.",
      },
    ],
  },

  // About section content
  about: {
    title: "About CSphere",
    paragraphs: [
      "CSphere was founded with a simple mission: to help students excel in computer science subjects. Our platform features 50+ specialized chatbots used by over 100+ students worldwide.",
      "Our AI-powered platform provides real-time resources like blogs and YouTube videos, making learning more accessible and effective. CSphere is open-source and powered by Gemini AI and Tavily.",
    ],
  },

  // Contact section content
  contact: {
    title: "Contact Us",
    getInTouch: {
      title: "Get in Touch",
      description:
        "Have questions or need assistance? Our team is here to help. Reach out to us using the contact form or through email.",
    },
    email: "info@csphere.com",
  },

  // Footer content
  footer: {
    description: "Helping students master CS subjects with AI-powered tools and resources.",
    sections: [
      {
        title: "Product",
        links: [{ text: "Updates", href: "#" }],
      },
      {
        title: "Company",
        links: [{ text: "About", href: "#" }],
      },
      {
        title: "Legal",
        links: [{ text: "MIT License", href: "#" }],
      },
    ],
    copyright: `© ${new Date().getFullYear()} CSphere. All rights reserved.`,
  },
}

