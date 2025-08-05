"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { TraderCard } from "@/components/trader/trader-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, SortAsc, TrendingUp, Users, BarChart3, Trophy, Zap, Target } from "lucide-react"
import { mockTraders } from "@/lib/mock-data"

const categories = [
  { id: "all", name: "All Traders", icon: Users, color: "text-blue-400" },
  { id: "crypto", name: "Crypto", icon: Zap, color: "text-yellow-400" },
  { id: "forex", name: "Forex", icon: TrendingUp, color: "text-green-400" },
  { id: "stocks", name: "Stocks", icon: BarChart3, color: "text-purple-400" },
  { id: "commodities", name: "Commodities", icon: Target, color: "text-orange-400" },
]

const topPerformers = [
  {
    rank: 1,
    name: "Alex Chen",
    roi: "+245%",
    followers: "12.5K",
    avatar: "/placeholder.svg?height=60&width=60",
    badge: "🏆 Top Performer",
  },
  {
    rank: 2,
    name: "Sarah Johnson",
    roi: "+198%",
    followers: "8.9K",
    avatar: "/placeholder.svg?height=60&width=60",
    badge: "🥈 Rising Star",
  },
  {
    rank: 3,
    name: "Mike Rodriguez",
    roi: "+167%",
    followers: "6.2K",
    avatar: "/placeholder.svg?height=60&width=60",
    badge: "🥉 Consistent",
  },
]

export function TopTradersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [sortBy, setSortBy] = useState("roi")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredAndSortedTraders = useMemo(() => {
    const filtered = mockTraders.filter((trader) => {
      const matchesSearch =
        trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trader.strategy.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRisk = riskFilter === "all" || trader.riskLevel.toLowerCase() === riskFilter
      return matchesSearch && matchesRisk
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "roi":
          return b.totalROI - a.totalROI
        case "followers":
          return b.followers - a.followers
        case "winRate":
          return b.winRate - a.winRate
        case "monthlyReturn":
          return b.monthlyROI - a.monthlyROI
        default:
          return 0
      }
    })
  }, [searchTerm, riskFilter, sortBy])

  return (
    <div className="w-full max-w-none space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-[#10B981]/20 rounded-xl">
              <TrendingUp className="h-8 w-8 text-[#10B981]" />
            </div>
            Top Traders
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Discover and copy successful trading strategies from verified professionals
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-[#10B981]/20 text-[#10B981] px-4 py-2">
            <Trophy className="h-4 w-4 mr-2" />
            {filteredAndSortedTraders.length} Active Traders
          </Badge>
        </div>
      </motion.div>

      {/* Top Performers Leaderboard */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-to-r from-[#111827] to-[#1D2939] border-gray-700 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="h-6 w-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">🏆 Top Performers This Month</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topPerformers.map((performer, index) => (
                <motion.div
                  key={performer.rank}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-[#10B981]/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-[#10B981]/30">
                        <AvatarImage src={performer.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">
                          {performer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {performer.rank}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{performer.name}</h3>
                      <p className="text-xs text-gray-400">{performer.badge}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-[#10B981]">{performer.roi}</p>
                      <p className="text-xs text-gray-400">Monthly ROI</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">{performer.followers}</p>
                      <p className="text-xs text-gray-400">Followers</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3"
      >
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-[#10B981] hover:bg-[#059669] text-white"
                : "border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            }`}
          >
            <category.icon className={`h-4 w-4 ${category.color}`} />
            {category.name}
          </Button>
        ))}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-4"
      >
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search traders, strategies, or markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#111827] border-gray-700 text-white placeholder-gray-400 h-12 text-lg"
          />
        </div>

        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="bg-[#111827] border-gray-700 text-white h-12">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent className="bg-[#111827] border-gray-700">
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="low">🟢 Low Risk</SelectItem>
            <SelectItem value="medium">🟡 Medium Risk</SelectItem>
            <SelectItem value="high">🔴 High Risk</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="bg-[#111827] border-gray-700 text-white h-12">
            <SortAsc className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-[#111827] border-gray-700">
            <SelectItem value="roi">📈 Total ROI</SelectItem>
            <SelectItem value="monthlyReturn">📊 Monthly Return</SelectItem>
            <SelectItem value="followers">👥 Followers</SelectItem>
            <SelectItem value="winRate">🎯 Win Rate</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Traders Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredAndSortedTraders.map((trader, index) => (
          <motion.div
            key={trader.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <TraderCard trader={trader} />
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredAndSortedTraders.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No traders found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
          <Button
            onClick={() => {
              setSearchTerm("")
              setRiskFilter("all")
              setSelectedCategory("all")
            }}
            className="bg-[#10B981] hover:bg-[#059669]"
          >
            Clear All Filters
          </Button>
        </motion.div>
      )}
    </div>
  )
}
