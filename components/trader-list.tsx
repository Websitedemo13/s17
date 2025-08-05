"use client"

import { useState, useMemo } from "react"
import { TraderCard } from "@/components/trader-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, SortAsc } from "lucide-react"

// Mock trader data
const mockTraders = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=48&width=48",
    roi: 127.5,
    risk: "Medium" as const,
    followers: 2847,
    winRate: 78,
    totalTrades: 342,
    monthlyReturn: 12.3,
    verified: true,
    rating: 5,
    strategy: "Swing Trading + Technical Analysis",
    copyCost: 99,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=48&width=48",
    roi: 89.2,
    risk: "Low" as const,
    followers: 1923,
    winRate: 82,
    totalTrades: 156,
    monthlyReturn: 8.7,
    verified: true,
    rating: 4,
    strategy: "Conservative Growth",
    copyCost: 79,
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    avatar: "/placeholder.svg?height=48&width=48",
    roi: 203.8,
    risk: "High" as const,
    followers: 4521,
    winRate: 65,
    totalTrades: 789,
    monthlyReturn: 18.9,
    verified: true,
    rating: 5,
    strategy: "Aggressive Scalping",
    copyCost: 149,
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=48&width=48",
    roi: 156.7,
    risk: "Medium" as const,
    followers: 3102,
    winRate: 74,
    totalTrades: 445,
    monthlyReturn: 14.2,
    verified: false,
    rating: 4,
    strategy: "Momentum Trading",
    copyCost: 119,
  },
  {
    id: "5",
    name: "David Kim",
    avatar: "/placeholder.svg?height=48&width=48",
    roi: 67.3,
    risk: "Low" as const,
    followers: 1456,
    winRate: 85,
    totalTrades: 234,
    monthlyReturn: 6.8,
    verified: true,
    rating: 4,
    strategy: "Value Investing",
    copyCost: 69,
  },
  {
    id: "6",
    name: "Lisa Zhang",
    avatar: "/placeholder.svg?height=48&width=48",
    roi: 178.9,
    risk: "High" as const,
    followers: 3876,
    winRate: 69,
    totalTrades: 623,
    monthlyReturn: 16.4,
    verified: true,
    rating: 5,
    strategy: "Crypto Arbitrage",
    copyCost: 129,
  },
]

export function TraderList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [sortBy, setSortBy] = useState("roi")

  const filteredAndSortedTraders = useMemo(() => {
    const filtered = mockTraders.filter((trader) => {
      const matchesSearch =
        trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trader.strategy.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRisk = riskFilter === "all" || trader.risk.toLowerCase() === riskFilter
      return matchesSearch && matchesRisk
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "roi":
          return b.roi - a.roi
        case "followers":
          return b.followers - a.followers
        case "winRate":
          return b.winRate - a.winRate
        case "monthlyReturn":
          return b.monthlyReturn - a.monthlyReturn
        default:
          return 0
      }
    })
  }, [searchTerm, riskFilter, sortBy])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search traders or strategies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-gray-900 border-gray-700 text-white">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
            <SelectItem value="medium">Medium Risk</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px] bg-gray-900 border-gray-700 text-white">
            <SortAsc className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            <SelectItem value="roi">Total ROI</SelectItem>
            <SelectItem value="monthlyReturn">Monthly Return</SelectItem>
            <SelectItem value="followers">Followers</SelectItem>
            <SelectItem value="winRate">Win Rate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedTraders.map((trader) => (
          <TraderCard key={trader.id} trader={trader} />
        ))}
      </div>

      {filteredAndSortedTraders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No traders found matching your criteria</div>
          <Button
            onClick={() => {
              setSearchTerm("")
              setRiskFilter("all")
            }}
            variant="outline"
            className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
