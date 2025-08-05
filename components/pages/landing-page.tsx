"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/lib/auth-store"
import { getMarketData } from "@/lib/mock-data"
import {
  TrendingUp,
  Users,
  Shield,
  Zap,
  BarChart3,
  Globe,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  DollarSign,
  Target,
  Award,
  Smartphone,
  Lock,
  TrendingDown,
} from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Copy Top Traders",
    description: "Follow and automatically copy trades from verified professional traders with proven track records.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Get detailed performance metrics, risk analysis, and portfolio insights powered by AI.",
    color: "text-[#10B981]",
    bgColor: "bg-[#10B981]/20",
  },
  {
    icon: Shield,
    title: "Secure & Regulated",
    description: "Your funds are protected with bank-level security and regulatory compliance.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    icon: Zap,
    title: "Real-time Signals",
    description: "Receive instant trading signals and market alerts from our community of experts.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
  },
  {
    icon: Globe,
    title: "Global Markets",
    description: "Trade forex, stocks, crypto, and commodities all from one unified platform.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
  },
  {
    icon: Smartphone,
    title: "Mobile Trading",
    description: "Trade on the go with our responsive web app optimized for all devices.",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
  },
]

const stats = [
  { label: "Active Traders", value: "50K+", icon: Users },
  { label: "Total Volume", value: "$2.5B+", icon: DollarSign },
  { label: "Success Rate", value: "78%", icon: Target },
  { label: "Countries", value: "120+", icon: Globe },
]

const testimonials = [
  {
    name: "Alex Chen",
    role: "Professional Trader",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "S17 has revolutionized my trading experience. The copy trading feature helped me diversify my strategies and increase my profits by 40%.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Retail Investor",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "As a beginner, I was able to learn from top traders while making profits. The platform is intuitive and the community is amazing.",
    rating: 5,
  },
  {
    name: "Mike Rodriguez",
    role: "Fund Manager",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "The analytics and risk management tools are top-notch. S17 provides institutional-grade features for retail traders.",
    rating: 5,
  },
]

export function LandingPage() {
  const { setCurrentPage } = useAuthStore()
  const [marketData, setMarketData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const data = await getMarketData()
        setMarketData(data)
      } catch (error) {
        console.error("Failed to load market data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMarketData()

    // Update market data every 30 seconds
    const interval = setInterval(loadMarketData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#10B981] to-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">S17</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage("login")}
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                Sign In
              </Button>
              <Button onClick={() => setCurrentPage("register")} className="bg-[#10B981] hover:bg-[#059669] text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="bg-[#10B981]/20 text-[#10B981] mb-6">🚀 #1 Social Trading Platform</Badge>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Trade Smarter with
                <span className="bg-gradient-to-r from-[#10B981] to-blue-500 bg-clip-text text-transparent">
                  {" "}
                  Social Trading
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join thousands of traders who are already profiting by copying top performers. Start your trading
                journey with zero experience required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  onClick={() => setCurrentPage("register")}
                  className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 text-lg"
                >
                  Start Trading Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#10B981]" />
                  <span className="text-gray-300">No minimum deposit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#10B981]" />
                  <span className="text-gray-300">Free to start</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Live Market Data</h3>

                    {isLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {marketData?.forex?.map((item: any, index: number) => (
                          <motion.div
                            key={item.symbol}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                          >
                            <div>
                              <div className="font-semibold text-white">{item.symbol}</div>
                              <div className="text-sm text-gray-400">{item.price}</div>
                            </div>
                            <div
                              className={`flex items-center gap-1 ${
                                item.trend === "up" ? "text-[#10B981]" : "text-red-400"
                              }`}
                            >
                              {item.trend === "up" ? (
                                <TrendingUp className="h-4 w-4" />
                              ) : (
                                <TrendingDown className="h-4 w-4" />
                              )}
                              <span className="font-semibold">{item.change}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Background decoration */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#10B981]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#10B981]/20 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-[#10B981]" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose S17 Trading?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with social trading to give you the best trading experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-lg mb-4`}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Traders Say</h2>
            <p className="text-xl text-gray-400">
              Join thousands of satisfied traders who trust S17 with their investments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Trading Journey?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Join S17 today and start copying successful traders. No experience required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setCurrentPage("register")}
                className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 text-lg"
              >
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setCurrentPage("login")}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg"
              >
                Sign In
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Regulated platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Funds protected</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#10B981] to-blue-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">S17</span>
              </div>
              <p className="text-gray-400 mb-4">
                The world's leading social trading platform. Trade smarter, not harder.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Copy Trading
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Social Feed
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Docs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Risk Disclosure
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 S17 Trading. All rights reserved. Trading involves risk and may not be suitable for all
              investors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
