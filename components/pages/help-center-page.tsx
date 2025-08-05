"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HelpCircle,
  Search,
  BookOpen,
  MessageCircle,
  Video,
  TrendingUp,
  Shield,
  CreditCard,
  Settings,
  ChevronRight,
  ExternalLink,
} from "lucide-react"

export function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-blue-500/20 text-blue-400",
      articles: 12,
      description: "Learn the basics of S17 Trading platform",
    },
    {
      id: "trading",
      name: "Trading & Copy Trading",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-[#10B981]/20 text-[#10B981]",
      articles: 18,
      description: "Master trading strategies and copy trading",
    },
    {
      id: "security",
      name: "Security & Safety",
      icon: <Shield className="h-5 w-5" />,
      color: "bg-red-500/20 text-red-400",
      articles: 8,
      description: "Keep your account and funds secure",
    },
    {
      id: "payments",
      name: "Payments & Billing",
      icon: <CreditCard className="h-5 w-5" />,
      color: "bg-yellow-500/20 text-yellow-400",
      articles: 10,
      description: "Deposits, withdrawals, and subscription management",
    },
    {
      id: "account",
      name: "Account Management",
      icon: <Settings className="h-5 w-5" />,
      color: "bg-purple-500/20 text-purple-400",
      articles: 15,
      description: "Profile settings and account preferences",
    },
  ]

  const popularArticles = [
    {
      title: "How to start copy trading?",
      category: "Trading",
      views: 15420,
      helpful: 89,
    },
    {
      title: "Setting up two-factor authentication",
      category: "Security",
      views: 12350,
      helpful: 95,
    },
    {
      title: "Understanding risk management",
      category: "Trading",
      views: 9870,
      helpful: 92,
    },
    {
      title: "How to withdraw funds?",
      category: "Payments",
      views: 8640,
      helpful: 88,
    },
    {
      title: "Choosing the right traders to copy",
      category: "Trading",
      views: 7530,
      helpful: 91,
    },
  ]

  const tutorials = [
    {
      title: "S17 Platform Overview",
      duration: "5:30",
      type: "video",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "Your First Copy Trade",
      duration: "8:15",
      type: "video",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "Portfolio Management Guide",
      duration: "12:45",
      type: "video",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "Advanced Trading Strategies",
      duration: "18:20",
      type: "video",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <HelpCircle className="h-8 w-8 text-[#10B981]" />
          Help Center
        </h1>
        <p className="text-gray-400 text-lg">Find answers to your questions and learn how to use S17 Trading</p>
      </div>

      {/* Search */}
      <Card className="bg-[#111827] border-gray-800">
        <CardContent className="p-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help articles, tutorials, or FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[#111827] border border-gray-800">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="popular">Popular Articles</TabsTrigger>
          <TabsTrigger value="tutorials">Video Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="bg-[#111827] border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${category.color}`}>{category.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">{category.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-gray-700 text-gray-400">
                          {category.articles} articles
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Most Popular Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-1">{article.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <Badge variant="outline" className="border-gray-700 text-gray-400">
                          {article.category}
                        </Badge>
                        <span>{article.views.toLocaleString()} views</span>
                        <span>{article.helpful}% found helpful</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutorials.map((tutorial, index) => (
              <Card
                key={index}
                className="bg-[#111827] border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={tutorial.thumbnail || "/placeholder.svg"}
                      alt={tutorial.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-t-lg">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                    <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">{tutorial.duration}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-white mb-2">{tutorial.title}</h3>
                    <Button variant="outline" size="sm" className="w-full border-gray-700 text-gray-300 bg-transparent">
                      <Video className="h-4 w-4 mr-2" />
                      Watch Tutorial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Live Chat</h4>
                  <p className="text-gray-400 text-sm mb-3">Get instant help from our support team</p>
                  <Button className="w-full bg-[#10B981] hover:bg-[#059669]">Start Live Chat</Button>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Email Support</h4>
                  <p className="text-gray-400 text-sm mb-3">Send us a detailed message</p>
                  <Button variant="outline" className="w-full border-gray-700 text-gray-300 bg-transparent">
                    Send Email
                  </Button>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Community Forum</h4>
                  <p className="text-gray-400 text-sm mb-3">Ask questions and get help from other traders</p>
                  <Button variant="outline" className="w-full border-gray-700 text-gray-300 bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Forum
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Support Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Live Chat</span>
                    <span className="text-white">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email Support</span>
                    <span className="text-white">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone Support</span>
                    <span className="text-white">Mon-Fri 9AM-6PM EST</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <h4 className="font-medium text-white mb-3">Emergency Contact</h4>
                  <p className="text-gray-400 text-sm mb-2">For urgent account security issues:</p>
                  <p className="text-[#10B981] font-medium">+1 (555) 123-HELP</p>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <h4 className="font-medium text-white mb-3">Response Times</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Live Chat</span>
                      <span className="text-white">&lt; 2 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email</span>
                      <span className="text-white">&lt; 4 hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
