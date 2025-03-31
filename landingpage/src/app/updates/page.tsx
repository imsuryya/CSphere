import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Calendar, ArrowRight, ExternalLink, Bell, Code, Users, BarChart } from "lucide-react"

export const metadata: Metadata = {
  title: "CSphere - Updates & Integrations",
  description: "Latest updates, feature integrations, and improvements to the CSphere platform",
}

export default function UpdatesPage() {
  return (
    <main className="container px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Updates & Integrations</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Stay up to date with the latest features, integrations, and improvements to CSphere
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <Link href="https://github.com/yourusername/csphere">
            <Button className="flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800">
              <Github className="h-5 w-5" />
              Contribute on GitHub
            </Button>
          </Link>
        </div>

        {/* Latest Updates */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Latest Updates</h2>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CardTitle>Gemini AI Integration</CardTitle>
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">New</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    March 30, 2025
                  </div>
                </div>
                <CardDescription>Major Feature Update</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    We've integrated Gemini AI to power our specialized chatbots, providing more accurate and helpful
                    responses for CS students. This update significantly improves the quality of answers and enables
                    more natural conversations.
                  </p>
                  <h3 className="font-semibold text-gray-900">Key Improvements:</h3>
                  <ul className="list-inside space-y-2 text-gray-600">
                    {[
                      "Enhanced understanding of complex CS concepts",
                      "Better code explanation and debugging assistance",
                      "More accurate answers to theoretical questions",
                      "Support for multiple programming languages",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-xs">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                    <h4 className="mb-2 font-medium text-gray-900">Technical Details</h4>
                    <p className="text-sm text-gray-600">
                      This integration uses Gemini Pro 1.5 with 1M context window, allowing our chatbots to reference
                      more information and provide more comprehensive answers. The model is fine-tuned specifically for
                      computer science education.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle>Tavily Search API Integration</CardTitle>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    February 15, 2025
                  </div>
                </div>
                <CardDescription>Resource Enhancement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Added Tavily Search API integration to provide real-time, relevant resources from across the web for
                    various CS topics. This allows our platform to suggest the most up-to-date learning materials.
                  </p>
                  <h3 className="font-semibold text-gray-900">Features:</h3>
                  <ul className="list-inside space-y-2 text-gray-600">
                    {[
                      "Real-time web search for CS resources",
                      "Filtering for academic and trusted sources",
                      "Personalized resource recommendations",
                      "Integration with chatbot responses",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                    <h4 className="mb-2 font-medium text-gray-900">How It Works</h4>
                    <p className="text-sm text-gray-600">
                      When you ask a question, our platform uses Tavily to search for relevant resources in real-time,
                      ensuring you get the most current information. The search results are then filtered and ranked
                      based on relevance and credibility.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle>YouTube Resource Integration</CardTitle>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    January 20, 2025
                  </div>
                </div>
                <CardDescription>Content Enhancement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Our platform now suggests relevant YouTube tutorials and lectures based on the topics you're
                    studying. This feature helps visual learners and provides alternative explanations for complex
                    concepts.
                  </p>
                  <h3 className="font-semibold text-gray-900">Benefits:</h3>
                  <ul className="list-inside space-y-2 text-gray-600">
                    {[
                      "Curated video content from top CS educators",
                      "Time-stamped recommendations for specific topics",
                      "Integration with chatbot conversations",
                      "Ability to save videos to your learning library",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle>Open Source Release</CardTitle>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    December 10, 2024
                  </div>
                </div>
                <CardDescription>Platform Milestone</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    CSphere is now fully open-source! Contribute to our GitHub repository and help improve CS education
                    for students worldwide. This milestone marks our commitment to transparency and community-driven
                    development.
                  </p>
                  <h3 className="font-semibold text-gray-900">What This Means:</h3>
                  <ul className="list-inside space-y-2 text-gray-600">
                    {[
                      "Full access to the CSphere codebase under MIT license",
                      "Community contributions are welcome and encouraged",
                      "Transparent development roadmap",
                      "Collaborative improvement of CS education resources",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex mt-4">
                    <Link href="https://github.com/yourusername/csphere">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        View Repository
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Features */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Coming Soon</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="bg-orange-100 p-3 rounded-lg inline-flex mb-4">
                <Code className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="mb-2 font-semibold text-lg">Code Playground</h3>
              <p className="mb-4 text-gray-600">Interactive coding environment for practicing CS concepts</p>
              <div className="text-xs font-medium text-orange-500 bg-orange-50 py-1 px-2 rounded-full inline-flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Expected: Q2 2025
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <div className="bg-orange-100 p-3 rounded-lg inline-flex mb-4">
                <Users className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="mb-2 font-semibold text-lg">Study Groups</h3>
              <p className="mb-4 text-gray-600">Collaborative learning spaces for students</p>
              <div className="text-xs font-medium text-orange-500 bg-orange-50 py-1 px-2 rounded-full inline-flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Expected: Q3 2025
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <div className="bg-orange-100 p-3 rounded-lg inline-flex mb-4">
                <BarChart className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="mb-2 font-semibold text-lg">Progress Tracking</h3>
              <p className="mb-4 text-gray-600">Monitor your learning journey across different CS subjects</p>
              <div className="text-xs font-medium text-orange-500 bg-orange-50 py-1 px-2 rounded-full inline-flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Expected: Q2 2025
              </div>
            </div>
          </div>
        </div>

        {/* Integration Partners */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Integration Partners</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    G
                  </span>
                  Gemini AI
                </CardTitle>
                <CardDescription>Advanced AI model powering our chatbots</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Google's Gemini AI provides the foundation for our specialized chatbots, enabling natural
                  conversations and accurate responses to complex CS questions.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center mt-4 text-sm font-medium text-orange-500 hover:text-orange-600"
                >
                  Learn more about this integration
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    T
                  </span>
                  Tavily
                </CardTitle>
                <CardDescription>AI-powered search for educational resources</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tavily's search API helps us find and recommend the most relevant and up-to-date resources for your CS
                  learning journey.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center mt-4 text-sm font-medium text-orange-500 hover:text-orange-600"
                >
                  Learn more about this integration
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Release Notes */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Recent Release Notes</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  v1.3.0
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">Latest</Badge>
                </h3>
                <div className="text-xs text-gray-500 flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  March 30, 2025
                </div>
              </div>
              <ul className="mt-2 list-inside space-y-1 text-sm text-gray-600">
                {[
                  "Added Gemini AI integration",
                  "Improved response accuracy by 40%",
                  "Enhanced code explanation capabilities",
                  "Fixed 12 bugs related to user authentication",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-[10px]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">v1.2.0</h3>
                <div className="text-xs text-gray-500 flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  February 15, 2025
                </div>
              </div>
              <ul className="mt-2 list-inside space-y-1 text-sm text-gray-600">
                {[
                  "Integrated Tavily Search API",
                  "Added resource recommendation system",
                  "Improved UI/UX for mobile devices",
                  "Performance optimizations",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-[10px]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">v1.1.0</h3>
                <div className="text-xs text-gray-500 flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  January 20, 2025
                </div>
              </div>
              <ul className="mt-2 list-inside space-y-1 text-sm text-gray-600">
                {[
                  "Added YouTube resource integration",
                  "Implemented video recommendation algorithm",
                  "Added user preferences for learning resources",
                  "Fixed accessibility issues",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-[10px]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="https://github.com/yourusername/csphere/releases">
              <Button variant="outline" className="flex items-center gap-2">
                View All Release Notes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Subscribe */}
        <div className="rounded-xl bg-orange-50 p-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full mb-4">
            <Bell className="h-6 w-6 text-orange-500" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Stay Updated</h2>
          <p className="mb-6 text-gray-600 max-w-lg mx-auto">
            Subscribe to our newsletter to receive updates about new features, integrations, and improvements.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 rounded-md border border-gray-300 px-4 focus:border-orange-500 focus:outline-none"
            />
            <Button className="h-12 bg-orange-500 text-white hover:bg-orange-600">Subscribe</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

