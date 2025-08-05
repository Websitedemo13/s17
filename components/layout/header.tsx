"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/lib/auth-store"
import { Search, Bell, Settings, TrendingUp, TrendingDown, DollarSign } from "lucide-react"

export function Header() {
  const { user } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock market data
  const marketData = [
    { symbol: "BTC/USD", price: "$45,234", change: "+3.2%", trend: "up" },
    { symbol: "EUR/USD", price: "1.0945", change: "+0.15%", trend: "up" },
    { symbol: "S&P 500", price: "4,567", change: "-0.3%", trend: "down" },
  ]

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left Section - Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search traders, markets, or news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Center Section - Market Ticker */}
        <div className="hidden lg:flex items-center gap-6">
          {marketData.map((item) => (
            <div key={item.symbol} className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-300">{item.symbol}</span>
              <span className="text-sm font-semibold text-white">{item.price}</span>
              <div className={`flex items-center gap-1 ${item.trend === "up" ? "text-[#10B981]" : "text-red-400"}`}>
                {item.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span className="text-xs font-medium">{item.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center gap-3">
          {/* Portfolio Value */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-700/50 rounded-lg">
            <DollarSign className="h-4 w-4 text-[#10B981]" />
            <div className="text-right">
              <div className="text-sm font-semibold text-white">$125,430</div>
              <div className="text-xs text-[#10B981]">+27.3%</div>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Avatar */}
          {user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-semibold text-white">{user.name}</div>
                <Badge className="bg-[#10B981]/20 text-[#10B981] text-xs capitalize">{user.role}</Badge>
              </div>
              <Avatar className="h-10 w-10 border-2 border-[#10B981]/30">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
