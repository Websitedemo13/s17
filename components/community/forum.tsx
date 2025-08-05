"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/lib/auth-store"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Eye,
  ThumbsUp,
  Pin,
  Search,
  Plus,
  Filter,
  Award,
  Flame,
  BookOpen,
  HelpCircle,
  Lightbulb,
  AlertCircle,
} from "lucide-react"

const categories = [
  {
    id: "general",
    name: "General Discussion",
    icon: MessageSquare,
    color: "text-blue-400",
    posts: 1247,
    description: "General trading discussions",
  },
  {
    id: "strategies",
    name: "Trading Strategies",
    icon: Lightbulb,
    color: "text-[#10B981]",
    posts: 892,
    description: "Share and discuss strategies",
  },
  {
    id: "analysis",
    name: "Market Analysis",
    icon: TrendingUp,
    color: "text-purple-400",
    posts: 634,
    description: "Technical and fundamental analysis",
  },
  {
    id: "education",
    name: "Education",
    icon: BookOpen,
    color: "text-orange-400",
    posts: 445,
    description: "Learning resources and tutorials",
  },
  {
    id: "help",
    name: "Help & Support",
    icon: HelpCircle,
    color: "text-red-400",
    posts: 321,
    description: "Get help with platform and trading",
  },
  {
    id: "announcements",
    name: "Announcements",
    icon: AlertCircle,
    color: "text-yellow-400",
    posts: 89,
    description: "Official platform updates",
  },
]

const forumPosts = [
  {
    id: "1",
    title: "Best Risk Management Strategies for Beginners",
    content: "I've been trading for 6 months now and want to improve my risk management. What are your top 3 rules?",
    author: "TradingNewbie",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "education",
    timestamp: new Date(Date.now() - 3600000),
    replies: 23,
    views: 156,
    likes: 12,
    isPinned: false,
    isLiked: false,
    tags: ["risk-management", "beginner", "advice"],
    lastReply: {
      author: "ProTrader99",
      timestamp: new Date(Date.now() - 1800000),
    },
  },
  {
    id: "2",
    title: "📈 Weekly Market Outlook: EUR/USD Analysis",
    content:
      "Looking at the weekly chart, EUR/USD is approaching a key resistance level at 1.0950. Here's my detailed analysis...",
    author: "MarketAnalyst",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "analysis",
    timestamp: new Date(Date.now() - 7200000),
    replies: 45,
    views: 289,
    likes: 34,
    isPinned: true,
    isLiked: true,
    tags: ["EUR/USD", "technical-analysis", "weekly-outlook"],
    lastReply: {
      author: "ForexKing",
      timestamp: new Date(Date.now() - 900000),
    },
  },
  {
    id: "3",
    title: "My 6-Month Trading Journey: From $1K to $5K",
    content:
      "Wanted to share my journey and the lessons I learned. Started with $1000 and now at $5000. Here's what worked...",
    author: "SuccessStory",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "general",
    timestamp: new Date(Date.now() - 10800000),
    replies: 67,
    views: 445,
    likes: 89,
    isPinned: false,
    isLiked: false,
    tags: ["success-story", "journey", "motivation"],
    lastReply: {
      author: "Inspired123",
      timestamp: new Date(Date.now() - 3600000),
    },
  },
  {
    id: "4",
    title: "🚨 Platform Update: New Features Released",
    content:
      "We're excited to announce several new features including advanced charting tools and improved copy trading...",
    author: "S17Admin",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "announcements",
    timestamp: new Date(Date.now() - 14400000),
    replies: 12,
    views: 234,
    likes: 45,
    isPinned: true,
    isLiked: false,
    tags: ["announcement", "update", "features"],
    lastReply: {
      author: "ExcitedUser",
      timestamp: new Date(Date.now() - 7200000),
    },
  },
]

const topContributors = [
  { name: "ProTrader99", posts: 234, likes: 1567, avatar: "/placeholder.svg?height=32&width=32", badge: "Expert" },
  { name: "MarketAnalyst", posts: 189, likes: 1234, avatar: "/placeholder.svg?height=32&width=32", badge: "Analyst" },
  { name: "ForexKing", posts: 156, likes: 987, avatar: "/placeholder.svg?height=32&width=32", badge: "Veteran" },
  { name: "CryptoGuru", posts: 134, likes: 876, avatar: "/placeholder.svg?height=32&width=32", badge: "Specialist" },
]

export function Forum() {
  const { user } = useAuthStore()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "general" })

  const filteredPosts = forumPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      case "popular":
        return b.likes - a.likes
      case "replies":
        return b.replies - a.replies
      case "views":
        return b.views - a.views
      default:
        return 0
    }
  })

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return

    // Add new post logic here
    setShowCreatePost(false)
    setNewPost({ title: "", content: "", category: "general" })
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
              <MessageSquare className="h-8 w-8 text-blue-400" />
            </div>
            Community Forum
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Connect, learn, and share with fellow traders</p>
        </div>
        <Button onClick={() => setShowCreatePost(true)} className="bg-[#10B981] hover:bg-[#059669] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Categories */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-6">
          {/* Categories */}
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "ghost"}
                onClick={() => setSelectedCategory("all")}
                className={`w-full justify-start ${
                  selectedCategory === "all" ? "bg-[#10B981] hover:bg-[#059669]" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                All Categories
              </Button>
              {categories.map((category) => (
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
                  <div className="flex-1 text-left">
                    <div className="text-sm">{category.name}</div>
                    <div className="text-xs opacity-75">{category.posts} posts</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topContributors.map((contributor, index) => (
                <div key={contributor.name} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-[#10B981]/20 text-[#10B981] text-xs">
                        {contributor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-black font-bold">1</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">{contributor.name}</span>
                      <Badge className="bg-[#10B981]/20 text-[#10B981] text-xs">{contributor.badge}</Badge>
                    </div>
                    <div className="text-xs text-gray-400">
                      {contributor.posts} posts • {contributor.likes} likes
                    </div>
                  </div>
                </div>
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
                placeholder="Search posts..."
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
                <option value="replies">Most Replies</option>
                <option value="views">Most Views</option>
              </select>
            </div>
          </div>

          {/* Forum Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Posts", value: "3,247", icon: MessageSquare, color: "text-blue-400" },
              { label: "Active Users", value: "892", icon: Users, color: "text-[#10B981]" },
              { label: "Today's Posts", value: "45", icon: Flame, color: "text-orange-400" },
              { label: "Online Now", value: "156", icon: Eye, color: "text-purple-400" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-[#111827] border-gray-800">
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {sortedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-[#111827] border-gray-800 hover:border-gray-700 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">
                          {post.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {post.isPinned && <Pin className="h-4 w-4 text-yellow-400" />}
                              <h3 className="text-lg font-semibold text-white hover:text-[#10B981] cursor-pointer">
                                {post.title}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <span>by {post.author}</span>
                              <span>•</span>
                              <span>{formatTime(post.timestamp)}</span>
                              <span>•</span>
                              <Badge className="bg-gray-800 text-gray-300 text-xs">
                                {categories.find((c) => c.id === post.category)?.name}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-3 line-clamp-2">{post.content}</p>

                        {post.tags && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="border-gray-700 text-gray-400 text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.views} views</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`p-0 h-auto ${post.isLiked ? "text-red-400" : "text-gray-400 hover:text-red-400"}`}
                            >
                              <ThumbsUp className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                              {post.likes}
                            </Button>
                          </div>

                          {post.lastReply && (
                            <div className="text-xs text-gray-400">
                              Last reply by {post.lastReply.author} {formatTime(post.lastReply.timestamp)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {sortedPosts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or browse different categories</p>
              <Button onClick={() => setShowCreatePost(true)} className="bg-[#10B981] hover:bg-[#059669]">
                Create First Post
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111827] border border-gray-800 rounded-xl p-6 w-full max-w-2xl"
          >
            <h2 className="text-xl font-bold text-white mb-4">Create New Post</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter post title..."
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Write your post content..."
                  rows={6}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCreatePost(false)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Cancel
                </Button>
                <Button onClick={handleCreatePost} className="bg-[#10B981] hover:bg-[#059669]">
                  Create Post
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
