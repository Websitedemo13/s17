"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/lib/auth-store"
import { mockSocialPosts } from "@/lib/mock-data"
import {
  Heart,
  MessageCircle,
  Share,
  Send,
  TrendingUp,
  ImageIcon,
  Video,
  BarChart3,
  Users,
  Search,
  Bookmark,
  MoreHorizontal,
  Eye,
  Zap,
} from "lucide-react"

const trendingTopics = [
  { tag: "#Bitcoin", posts: 1247, trend: "up" },
  { tag: "#ForexTrading", posts: 892, trend: "up" },
  { tag: "#StockMarket", posts: 634, trend: "down" },
  { tag: "#CryptoNews", posts: 445, trend: "up" },
  { tag: "#TradingTips", posts: 321, trend: "neutral" },
]

const suggestedTraders = [
  {
    id: "1",
    name: "Emma Wilson",
    username: "@emmawilson",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "12.5K",
    roi: "+245%",
    isFollowing: false,
  },
  {
    id: "2",
    name: "David Kim",
    username: "@davidkim",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "8.9K",
    roi: "+189%",
    isFollowing: false,
  },
  {
    id: "3",
    name: "Lisa Chen",
    username: "@lisachen",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "6.2K",
    roi: "+167%",
    isFollowing: true,
  },
]

export function SocialFeedPage() {
  const { user } = useAuthStore()
  const [newPost, setNewPost] = useState("")
  const [posts, setPosts] = useState(mockSocialPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [followedTraders, setFollowedTraders] = useState(suggestedTraders)

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
          : post,
      ),
    )
  }

  const handleBookmark = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post)))
  }

  const handleFollow = (traderId: string) => {
    setFollowedTraders(
      followedTraders.map((trader) =>
        trader.id === traderId ? { ...trader, isFollowing: !trader.isFollowing } : trader,
      ),
    )
  }

  const handlePost = () => {
    if (!newPost.trim()) return

    const post = {
      id: Date.now().toString(),
      authorId: user?.id || "",
      authorName: user?.name || "",
      authorUsername: `@${user?.name?.toLowerCase().replace(" ", "")}` || "@user",
      authorAvatar: user?.avatar || "/placeholder.svg?height=40&width=40",
      content: newPost,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      isLiked: false,
      isBookmarked: false,
      type: "text",
      tags: [],
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diff = now.getTime() - time.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || post.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Sidebar - Trending & Suggestions */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-6">
        {/* Trending Topics */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#10B981]" />
              Trending Topics
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={topic.tag}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors"
              >
                <div>
                  <p className="font-medium text-[#10B981]">{topic.tag}</p>
                  <p className="text-xs text-gray-400">{topic.posts.toLocaleString()} posts</p>
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full ${
                    topic.trend === "up"
                      ? "bg-green-500/20 text-green-400"
                      : topic.trend === "down"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {topic.trend === "up" ? "↗" : topic.trend === "down" ? "↘" : "→"}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Suggested Traders */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Suggested Traders
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {followedTraders.map((trader, index) => (
              <motion.div
                key={trader.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={trader.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">{trader.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white text-sm">{trader.name}</p>
                    <p className="text-xs text-gray-400">{trader.username}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400">{trader.followers}</span>
                      <span className="text-[#10B981]">{trader.roi}</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={trader.isFollowing ? "outline" : "default"}
                  onClick={() => handleFollow(trader.id)}
                  className={
                    trader.isFollowing
                      ? "border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                      : "bg-[#10B981] hover:bg-[#059669] text-white"
                  }
                >
                  {trader.isFollowing ? "Following" : "Follow"}
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Feed */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#10B981]/20 rounded-xl">
              <TrendingUp className="h-8 w-8 text-[#10B981]" />
            </div>
            Social Feed
          </h1>
          <p className="text-gray-400 text-lg">Share insights and connect with the trading community</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search posts, traders, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#111827] border-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2">
            {["all", "text", "image", "video", "trade"].map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant={selectedFilter === filter ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter)}
                className={
                  selectedFilter === filter
                    ? "bg-[#10B981] hover:bg-[#059669]"
                    : "border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                }
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Create Post */}
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-4">
            <div className="flex space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="Share your trading insights, market analysis, or ask questions..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 resize-none min-h-[100px]"
                  rows={4}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Chart
                    </Button>
                  </div>
                  <Button
                    onClick={handlePost}
                    disabled={!newPost.trim()}
                    className="bg-[#10B981] hover:bg-[#059669] text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-[#111827] border-gray-800 hover:border-gray-700 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.authorName} />
                          <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">
                            {post.authorName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">{post.authorName}</h3>
                            <Badge className="bg-[#10B981]/20 text-[#10B981] text-xs">Verified</Badge>
                          </div>
                          <p className="text-sm text-gray-400">
                            {post.authorUsername || `@${post.authorName.toLowerCase().replace(" ", "")}`}
                          </p>
                          <p className="text-xs text-gray-500">{formatTime(post.timestamp)}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="mb-4">
                      <p className="text-gray-300 leading-relaxed">{post.content}</p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="border-[#10B981] text-[#10B981]">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Post Image/Chart placeholder */}
                    {post.type === "image" && (
                      <div className="mb-4 bg-gray-800/30 rounded-lg h-64 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-gray-600" />
                      </div>
                    )}

                    {post.type === "trade" && (
                      <div className="mb-4 bg-gradient-to-r from-[#10B981]/10 to-blue-500/10 rounded-lg p-4 border border-[#10B981]/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-[#10B981]" />
                          <span className="text-sm font-medium text-[#10B981]">Trade Signal</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Symbol</p>
                            <p className="text-white font-semibold">EUR/USD</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Action</p>
                            <p className="text-[#10B981] font-semibold">BUY</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Target</p>
                            <p className="text-white font-semibold">1.0950</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                      <div className="flex items-center space-x-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`text-gray-400 hover:text-red-400 ${post.isLiked ? "text-red-400" : ""}`}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                          {post.likes}
                        </Button>

                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>

                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#10B981]">
                          <Share className="h-4 w-4 mr-1" />
                          {post.shares || 0}
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Eye className="h-3 w-3" />
                          {post.views || Math.floor(Math.random() * 1000)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(post.id)}
                          className={`text-gray-400 hover:text-yellow-400 ${post.isBookmarked ? "text-yellow-400" : ""}`}
                        >
                          <Bookmark className={`h-4 w-4 ${post.isBookmarked ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or follow more traders</p>
            <Button className="bg-[#10B981] hover:bg-[#059669]">Discover Traders</Button>
          </motion.div>
        )}
      </motion.div>

      {/* Right Sidebar - Activity & Stats */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-6">
        {/* Your Activity */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              Your Activity
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Posts this week</span>
              <span className="text-white font-semibold">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Likes received</span>
              <span className="text-[#10B981] font-semibold">248</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Comments made</span>
              <span className="text-blue-400 font-semibold">67</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Followers gained</span>
              <span className="text-purple-400 font-semibold">+23</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Share Market Analysis
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent justify-start"
            >
              <Users className="h-4 w-4 mr-2" />
              Find Traders to Follow
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent justify-start"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Join Live Chat
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
