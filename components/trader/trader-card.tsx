"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTradingStore } from "@/lib/trading-store"
import { useAuthStore } from "@/lib/auth-store"
import { TrendingUp, TrendingDown, Users, Shield, Copy, CheckCircle, Star, Activity, DollarSign } from "lucide-react"

interface TraderCardProps {
  trader: {
    id: string
    name: string
    avatar: string
    totalROI: number
    monthlyROI: number
    riskLevel: string
    followers: number
    winRate: number
    totalTrades: number
    verified: boolean
    rating: number
    strategy: string
    subscriptionFee: number
  }
}

export function TraderCard({ trader }: TraderCardProps) {
  const { user } = useAuthStore()
  const { copiedTraders, copyTrader, uncopyTrader } = useTradingStore()
  const [isLoading, setIsLoading] = useState(false)
  const isCopied = copiedTraders.some((ct) => ct.traderId === trader.id)

  const handleCopyToggle = async () => {
    if (user?.role !== "investor") return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (isCopied) {
      uncopyTrader(trader.id)
    } else {
      copyTrader({
        traderId: trader.id,
        traderName: trader.name,
        allocation: 1000,
        startDate: new Date().toISOString(),
        currentROI: 0,
        status: "active",
        subscriptionFee: trader.subscriptionFee,
      })
    }

    setIsLoading(false)
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <Card className="bg-[#111827] border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-[#10B981]/10">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-[#10B981]/30">
              <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
              <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">
                {trader.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/trader/${trader.id}`}
                  className="font-semibold text-white hover:text-[#10B981] transition-colors"
                >
                  {trader.name}
                </Link>
                {trader.verified && <CheckCircle className="h-4 w-4 text-blue-400" />}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < trader.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">({trader.rating})</span>
              </div>
            </div>
          </div>
          <Badge className={getRiskColor(trader.riskLevel)}>
            <Shield className="h-3 w-3 mr-1" />
            {trader.riskLevel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total ROI</span>
              <div className="flex items-center gap-1">
                {trader.totalROI >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-[#10B981]" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <span className={`font-semibold ${trader.totalROI >= 0 ? "text-[#10B981]" : "text-red-400"}`}>
                  {trader.totalROI > 0 ? "+" : ""}
                  {trader.totalROI}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Monthly</span>
              <span className={`font-semibold ${trader.monthlyROI >= 0 ? "text-[#10B981]" : "text-red-400"}`}>
                {trader.monthlyROI > 0 ? "+" : ""}
                {trader.monthlyROI}%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Win Rate</span>
              <span className="font-semibold text-white">{trader.winRate}%</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Trades</span>
              <span className="font-semibold text-white">{trader.totalTrades}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">{trader.followers} followers</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <DollarSign className="h-3 w-3" />
            {trader.subscriptionFee}/month
          </div>
        </div>

        <div className="pt-2">
          <div className="text-xs text-gray-500 mb-2">Strategy: {trader.strategy}</div>
          {user?.role === "investor" && (
            <Button
              onClick={handleCopyToggle}
              disabled={isLoading}
              className={`w-full ${
                isCopied ? "bg-red-600 hover:bg-red-700 text-white" : "bg-[#10B981] hover:bg-[#059669] text-white"
              }`}
            >
              {isLoading ? <Activity className="h-4 w-4 mr-2 animate-spin" /> : <Copy className="h-4 w-4 mr-2" />}
              {isCopied ? "Stop Copying" : "Copy Trader"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
