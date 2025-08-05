"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Newspaper,
  TrendingUp,
  Clock,
  Eye,
  Bookmark,
  Share,
  Search,
  Filter,
  Globe,
  Zap,
  BarChart3,
  DollarSign,
  Star,
  ExternalLink,
  RefreshCw,
} from "lucide-react"

const newsCategories = [
  { id: "all", name: "All News", icon: Newspaper, color: "text-blue-400" },
  { id: "market", name: "Market News", icon: TrendingUp, color: "text-[#10B981]" },
  { id: "crypto", name: "Cryptocurrency", icon: Zap, color: "text-yellow-400" },
  { id: "forex", name: "Forex", icon: Globe, color: "text-purple-400" },
  { id: "stocks", name: "Stocks", icon: BarChart3, color: "text-orange-400" },
  { id: "economy", name: "Economy", icon: DollarSign, color: "text-red-400" },
]

const mockNews = [
  {
    id: "1",
    title: "Federal Reserve Signals Potential Rate Cut in Q2 2024",
    summary:
      "Fed Chairman Jerome Powell hints at possible interest rate adjustments following recent inflation data, potentially impacting global markets significantly.",
    content:
      "In a recent statement, Federal Reserve Chairman Jerome Powell indicated that the central bank is closely monitoring inflation trends and may consider rate adjustments in the second quarter of 2024...",
    category: "economy",
    source: "Financial Times",
    sourceAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: new Date(Date.now() - 1800000),
    readTime: "3 min read",
    views: 2847,
    likes: 156,
    isBookmarked: false,
    isLiked: false,
    imageUrl: "/placeholder.svg?height=200&width=400",
    tags: ["Federal Reserve", "Interest Rates", "Inflation"],
    impact: "high",
    sentiment: "neutral",
  },
  {
    id: "2",
    title: "Bitcoin Surges Past $45,000 as Institutional Adoption Grows",
    summary:
      "Major corporations continue to add Bitcoin to their treasury reserves, driving the cryptocurrency to new monthly highs amid growing institutional interest.",
    content:
      "Bitcoin has broken through the $45,000 resistance level following announcements from several Fortune 500 companies about their cryptocurrency adoption strategies...",
    category: "crypto",
    source: "CoinDesk",
    sourceAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: new Date(Date.now() - 3600000),
    readTime: "4 min read",
    views: 3921,
    likes: 234,
    isBookmarked: true,
    isLiked: true,
    imageUrl: "/placeholder.svg?height=200&width=400",
    tags: ["Bitcoin", "Cryptocurrency", "Institutional"],
    impact: "high",
    sentiment: "positive",
  },
  {
    id: "3",
    title: "EUR/USD Reaches 3-Month High Following ECB Policy Decision",
    summary:
      "The European Central Bank's latest monetary policy announcement has strengthened the Euro against the Dollar, with traders eyeing the 1.10 level.",
    content:
      "The EUR/USD currency pair has climbed to its highest level in three months after the European Central Bank maintained its hawkish stance on monetary policy...",
    category: "forex",
    source: "Reuters",
    sourceAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: new Date(Date.now() - 5400000),
    readTime: "2 min read",
    views: 1567,
    likes: 89,
    isBookmarked: false,
    isLiked: false,
    imageUrl: "/placeholder.svg?height=200&width=400",
    tags: ["EUR/USD", "ECB", "Forex"],
    impact: "medium",
    sentiment: "positive",
  },
  {
    id: "4",
    title: "Tech Stocks Rally as AI Sector Shows Strong Q4 Performance",
    summary:
      "Artificial Intelligence companies report better-than-expected earnings, leading to a broad rally in technology stocks across major indices.",
    content:
      "The technology sector is experiencing significant gains today as several major AI companies reported strong quarterly results, exceeding analyst expectations...",
    category: "stocks",
    source: "Bloomberg",
    sourceAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: new Date(Date.now() - 7200000),
    readTime: "5 min read",
    views: 2134,
    likes: 167,
    isBookmarked: false,
    isLiked: false,
    imageUrl: "/placeholder.svg?height=200&width=400",
    tags: ["Tech Stocks", "AI", "Earnings"],
    impact: "medium",
    sentiment: "positive",
  },
  {
    id: "5",
    title: "Oil Prices Volatile Amid Middle East Tensions",
    summary:
      "Crude oil futures show increased volatility as geopolitical tensions in the Middle East raise concerns about supply chain disruptions.",
    content:
      "Oil markets are experiencing heightened volatility today as ongoing geopolitical tensions in the Middle East region continue to impact trader sentiment...",
    category: "market",
    source: "MarketWatch",
    sourceAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: new Date(Date.now() - 9000000),
    readTime: "3 min read",
    views: 1789,
    likes: 92,
    isBookmarked: true,
    isLiked: false,
    imageUrl: "/placeholder.svg?height=200&width=400",
    tags: ["Oil", "Commodities", "Geopolitics"],
    impact: "high",
    sentiment: "negative",
  },
]

const trendingTopics = [
  { topic: "Federal Reserve", mentions: 1247, change: "+15%" },
  { topic: "Bitcoin ETF", mentions: 892, change: "+8%" },
  { topic: "AI Stocks", mentions: 634, change: "+23%" },
  { topic: "EUR/USD", mentions: 445, change: "+5%" },
  { topic: "Oil Prices", mentions: 321, change: "-3%" },
]

const marketMovers = [
  { symbol: "BTC/USD", price: "$45,234", change: "+3.2%", trend: "up" },
  { symbol: "EUR/USD", price: "1.0945", change: "+0.8%", trend: "up" },
  { symbol: "AAPL", price: "$185.50", change: "+2.1%", trend: "up" },
  { symbol: "TSLA", price: "$234.67", change: "-1.5%", trend: "down" },
  { symbol: "GOLD", price: "$2,045", change: "+0.5%", trend: "up" },
]

export function AINewsFeed() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [news, setNews] = useState(mockNews)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredNews = news.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedNews = [...filteredNews].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      case "popular":
        return b.views - a.views
      case "impact":
        const impactOrder = { high: 3, medium: 2, low: 1 }
        return impactOrder[b.impact as keyof typeof impactOrder] - impactOrder[a.impact as keyof typeof impactOrder]
      default:
        return 0
    }
  })

  const handleLike = (articleId: string) => {
    setNews(
      news.map((article) =>
        article.id === articleId
          ? { ...article, likes: article.isLiked ? article.likes - 1 : article.likes + 1, isLiked: !article.isLiked }
          : article,
      ),
    )
  }

  const handleBookmark = (articleId: string) => {
    setNews(
      news.map((article) => (article.id === articleId ? { ...article, isBookmarked: !article.isBookmarked } : article)),
    )
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-400 bg-red-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/20"
      case "low":
        return "text-green-400 bg-green-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-400"
      case "negative":
        return "text-red-400"
      case "neutral":
        return "text-gray-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Newspaper className="h-8 w-8 text-blue-400" />
            </div>
            AI-Powered News Feed
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stay updated with real-time market news and analysis</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing} className="bg-[#10B981] hover:bg-[#059669] text-white">
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Categories & Trending */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-6">
          {/* Categories */}
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {newsCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full justify-start ${
                    selectedCategory === category.id
                      ? "bg-[#10B981] hover:bg-[#059669]"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <category.icon className={`h-4 w-4 mr-2 ${category.color}`} />
                  {category.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#10B981]" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="font-medium text-white text-sm">{topic.topic}</p>
                    <p className="text-xs text-gray-400">{topic.mentions} mentions</p>
                  </div>
                  <Badge
                    className={`text-xs ${
                      topic.change.startsWith("+") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {topic.change}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Market Movers */}
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                Market Movers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {marketMovers.map((mover, index) => (
                <motion.div
                  key={mover.symbol}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-white text-sm">{mover.symbol}</p>
                    <p className="text-xs text-gray-400">{mover.price}</p>
                  </div>
                  <div className={`text-sm font-semibold ${mover.trend === "up" ? "text-[#10B981]" : "text-red-400"}`}>
                    {mover.change}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3 space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#111827] border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-[#111827] border border-gray-700 rounded-md text-white text-sm"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="impact">High Impact</option>
              </select>
            </div>
          </div>

          {/* News Articles */}
          <div className="space-y-6">
            {sortedNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-[#111827] border-gray-800 hover:border-gray-700 transition-colors overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Article Image */}
                    <div className="md:col-span-1">
                      <div className="relative h-48 md:h-full bg-gray-800/30 rounded-lg overflow-hidden">
                        <img
                          src={article.imageUrl || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className={getImpactColor(article.impact)}>
                            {article.impact.toUpperCase()} IMPACT
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <div className={`w-3 h-3 rounded-full ${getSentimentColor(article.sentiment)}`}></div>
                        </div>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="md:col-span-2 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={article.sourceAvatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#10B981]/20 text-[#10B981] text-xs">
                              {article.source.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-white">{article.source}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Clock className="h-3 w-3" />
                              <span>{formatTime(article.timestamp)}</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-gray-800 text-gray-300 text-xs">
                          {newsCategories.find((c) => c.id === article.category)?.name}
                        </Badge>
                      </div>

                      <h2 className="text-xl font-bold text-white mb-3 hover:text-[#10B981] cursor-pointer transition-colors">
                        {article.title}
                      </h2>

                      <p className="text-gray-300 mb-4 line-clamp-3">{article.summary}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="border-gray-700 text-gray-400 text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(article.id)}
                            className={`p-0 h-auto ${article.isLiked ? "text-red-400" : "text-gray-400 hover:text-red-400"}`}
                          >
                            <Star className={`h-4 w-4 mr-1 ${article.isLiked ? "fill-current" : ""}`} />
                            {article.likes}
                          </Button>

                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Eye className="h-4 w-4" />
                            {article.views.toLocaleString()}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBookmark(article.id)}
                            className={`p-0 h-auto ${article.isBookmarked ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"}`}
                          >
                            <Bookmark className={`h-4 w-4 ${article.isBookmarked ? "fill-current" : ""}`} />
                          </Button>

                          <Button variant="ghost" size="sm" className="p-0 h-auto text-gray-400 hover:text-[#10B981]">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          Read Full Article
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {sortedNews.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <Newspaper className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or browse different categories</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
                className="bg-[#10B981] hover:bg-[#059669]"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
