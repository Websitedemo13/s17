"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Target,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Shield,
  Award,
  Globe,
  Linkedin,
  Twitter,
  Mail,
  Calendar,
} from "lucide-react"

const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description: "S17 Trading was established with a vision to democratize trading through technology.",
  },
  {
    year: "2021",
    title: "AI Integration",
    description: "Launched our first AI-powered trading signals and risk management system.",
  },
  {
    year: "2022",
    title: "Social Features",
    description: "Introduced copy trading and social networking features for traders.",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Expanded to 50+ countries with multi-language support and local partnerships.",
  },
  {
    year: "2024",
    title: "50K+ Users",
    description: "Reached 50,000+ active traders with $2.5B+ in trading volume.",
  },
]

const team = [
  {
    name: "Alex Chen",
    role: "CEO & Founder",
    bio: "Former Goldman Sachs trader with 15+ years in fintech. Led multiple successful trading platforms.",
    avatar: "/placeholder.svg?height=120&width=120",
    linkedin: "#",
    twitter: "#",
    email: "alex@s17trading.com",
  },
  {
    name: "Sarah Kim",
    role: "CTO",
    bio: "Ex-Google engineer specializing in AI/ML. Built scalable trading systems for millions of users.",
    avatar: "/placeholder.svg?height=120&width=120",
    linkedin: "#",
    twitter: "#",
    email: "sarah@s17trading.com",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Trading",
    bio: "20+ years trading experience. Former hedge fund manager with proven track record.",
    avatar: "/placeholder.svg?height=120&width=120",
    linkedin: "#",
    twitter: "#",
    email: "michael@s17trading.com",
  },
  {
    name: "Emma Johnson",
    role: "Head of Product",
    bio: "Product leader from Robinhood. Expert in user experience and financial product design.",
    avatar: "/placeholder.svg?height=120&width=120",
    linkedin: "#",
    twitter: "#",
    email: "emma@s17trading.com",
  },
]

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "Your funds and data are protected with bank-level security and encryption.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "We believe in the power of collective intelligence and shared success.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "Constantly pushing boundaries with AI, machine learning, and cutting-edge technology.",
  },
  {
    icon: Heart,
    title: "Transparency",
    description: "Open, honest communication and transparent fee structures with no hidden costs.",
  },
]

export function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1D2939] via-[#111827] to-[#0F172A]">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/10 to-blue-500/10 blur-3xl opacity-30" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge className="mb-6 bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30 px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              About S17 Trading
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Empowering Traders,
              <span className="bg-gradient-to-r from-[#10B981] to-blue-400 bg-clip-text text-transparent">
                {" "}
                Amplifying Wealth
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We're on a mission to democratize trading through technology, community, and innovation. Join us in
              building the future of social trading.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <Card className="bg-[#111827]/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-[#10B981] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">
                  To make professional-grade trading accessible to everyone through innovative technology,
                  community-driven insights, and transparent practices.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#111827]/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Eye className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed">
                  To become the world's leading social trading platform where traders of all levels can learn, share,
                  and prosper together.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#111827]/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Globe className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Our Impact</h3>
                <p className="text-gray-400 leading-relaxed">
                  50,000+ traders across 120+ countries have already transformed their financial future with our
                  platform and community.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              These principles guide everything we do and shape the culture of our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="bg-[#111827]/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#111827]/30 to-[#1D2939]/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Journey</h2>
            <p className="text-xl text-gray-400">
              From a small startup to a global trading platform - here's how we got here.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#10B981] to-blue-400"></div>

            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="relative flex items-start mb-12 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center text-white font-bold text-lg border-4 border-[#1D2939] z-10">
                  <Calendar className="h-6 w-6" />
                </div>

                <Card className="ml-8 bg-[#111827]/50 border-gray-800 backdrop-blur-sm flex-1">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-[#10B981]/20 text-[#10B981]">{milestone.year}</Badge>
                      <h3 className="text-xl font-semibold text-white">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our diverse team of experts brings together decades of experience in trading, technology, and finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={member.name}
                className="bg-[#111827]/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm group"
              >
                <CardContent className="p-6 text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-[#10B981]/30">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#10B981]/20 text-[#10B981] text-xl">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-[#10B981] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{member.bio}</p>

                  <div className="flex justify-center gap-3">
                    <a
                      href={member.linkedin}
                      className="w-8 h-8 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center hover:bg-blue-600/30 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={member.twitter}
                      className="w-8 h-8 bg-sky-600/20 text-sky-400 rounded-full flex items-center justify-center hover:bg-sky-600/30 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="w-8 h-8 bg-gray-600/20 text-gray-400 rounded-full flex items-center justify-center hover:bg-gray-600/30 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#10B981]/5 to-blue-500/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">By the Numbers</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#10B981] mb-2">50K+</div>
              <div className="text-gray-400">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">$2.5B+</div>
              <div className="text-gray-400">Trading Volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">120+</div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">87%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
