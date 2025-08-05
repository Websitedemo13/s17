"use client"

import { motion } from "framer-motion"
import { useTradingStore } from "@/lib/trading-store"
import { useAuthStore } from "@/lib/auth-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  TrendingUp,
  DollarSign,
  Users,
  Activity,
  AlertTriangle,
  PieChart,
  BarChart3,
  Target,
  Star,
  ArrowUp,
  ArrowDown,
  Clock,
  Trophy,
} from "lucide-react"

export function DashboardPage() {
  const { user } = useAuthStore()
  const { copiedTraders, uncopyTrader } = useTradingStore()

  if (user?.role !== "investor") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-gray-400">This dashboard is only available for investors.</p>
      </motion.div>
    )
  }

  // Mock portfolio data with more realistic values
  const portfolioStats = {
    totalValue: 125430,
    totalInvested: 98500,
    totalROI: 27.3,
    monthlyReturn: 8.9,
    weeklyReturn: 2.1,
    dailyReturn: 0.5,
    activePositions: copiedTraders.length,
    totalTrades: 156,
    winRate: 78,
    profitLoss: 26930,
    riskScore: 65,
  }

  const mockPositions = copiedTraders.map((ct) => ({
    ...ct,
    currentROI: Math.random() * 40 - 10,
    unrealizedPL: Math.random() * 2000 - 500,
    lastUpdate: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    volume: Math.floor(Math.random() * 50000) + 10000,
    trades: Math.floor(Math.random() * 50) + 10,
  }))

  const recentActivity = [
    {
      type: "copy",
      action: "Started copying",
      trader: "Alex Chen",
      time: "2 hours ago",
      amount: "$5,000",
      icon: Users,
      color: "text-[#10B981]",
    },
    {
      type: "trade",
      action: "Trade executed",
      trader: "Sarah Johnson",
      time: "4 hours ago",
      amount: "+$245",
      icon: TrendingUp,
      color: "text-blue-400",
    },
    {
      type: "profit",
      action: "Profit realized",
      trader: "Mike Rodriguez",
      time: "1 day ago",
      amount: "+$1,250",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      type: "stop",
      action: "Stopped copying",
      trader: "Emma Wilson",
      time: "2 days ago",
      amount: "-$150",
      icon: AlertTriangle,
      color: "text-red-400",
    },
  ]

  const topPerformingCopies = mockPositions
    .filter((p) => p.currentROI > 0)
    .sort((a, b) => b.currentROI - a.currentROI)
    .slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-[#10B981]/20 rounded-xl">
              <BarChart3 className="h-8 w-8 text-[#10B981]" />
            </div>
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Here's your portfolio performance overview</p>
        </div>
        <Badge className="bg-gradient-to-r from-[#10B981]/20 to-blue-500/20 text-white px-4 py-2 text-lg">
          <Trophy className="h-5 w-5 mr-2" />
          Level 12 Investor
        </Badge>
      </motion.div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Portfolio",
            value: `$${portfolioStats.totalValue.toLocaleString()}`,
            change: `+${portfolioStats.totalROI}%`,
            icon: DollarSign,
            color: "text-[#10B981]",
            bgColor: "bg-[#10B981]/20",
            trend: "up",
          },
          {
            title: "Monthly Return",
            value: `+${portfolioStats.monthlyReturn}%`,
            change: `vs ${(portfolioStats.monthlyReturn - 2.1).toFixed(1)}% last month`,
            icon: TrendingUp,
            color: "text-blue-400",
            bgColor: "bg-blue-500/20",
            trend: "up",
          },
          {
            title: "Active Copies",
            value: portfolioStats.activePositions.toString(),
            change: `${portfolioStats.totalTrades} total trades`,
            icon: Users,
            color: "text-purple-400",
            bgColor: "bg-purple-500/20",
            trend: "neutral",
          },
          {
            title: "Win Rate",
            value: `${portfolioStats.winRate}%`,
            change: "Above average",
            icon: Target,
            color: "text-orange-400",
            bgColor: "bg-orange-500/20",
            trend: "up",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="bg-gradient-to-br from-[#111827] to-[#1D2939] border-gray-700 hover:border-gray-600 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="flex items-center gap-1">
                  {stat.trend === "up" && <ArrowUp className="h-3 w-3 text-[#10B981]" />}
                  {stat.trend === "down" && <ArrowDown className="h-3 w-3 text-red-400" />}
                  <p className={`text-xs ${stat.trend === "up" ? "text-[#10B981]" : "text-gray-400"}`}>{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart & Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="bg-[#111827] border-gray-800 h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-[#10B981]" />
                Portfolio Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-800/30 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-[#10B981] mx-auto mb-2" />
                  <p className="text-gray-400">Interactive chart coming soon</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#10B981]">+{portfolioStats.dailyReturn}%</p>
                  <p className="text-xs text-gray-400">Today</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">+{portfolioStats.weeklyReturn}%</p>
                  <p className="text-xs text-gray-400">This Week</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">+{portfolioStats.monthlyReturn}%</p>
                  <p className="text-xs text-gray-400">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-[#111827] border-gray-800 h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Risk Score</span>
                  <span className="text-white font-semibold">{portfolioStats.riskScore}/100</span>
                </div>
                <Progress value={portfolioStats.riskScore} className="h-3" />
                <p className="text-xs text-yellow-400 mt-1">Medium Risk Level</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Diversification</span>
                  <span className="text-[#10B981]">Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Drawdown</span>
                  <span className="text-red-400">-8.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sharpe Ratio</span>
                  <span className="text-blue-400">1.85</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-400">💡 Consider diversifying into more asset classes to reduce risk</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Performing Copies */}
      {topPerformingCopies.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />🏆 Top Performing Copies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topPerformingCopies.map((copy, index) => (
                  <div
                    key={copy.traderId}
                    className="bg-gradient-to-r from-[#10B981]/10 to-blue-500/10 rounded-lg p-4 border border-[#10B981]/30"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10 border-2 border-[#10B981]/50">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">
                          {copy.traderName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-white">{copy.traderName}</h3>
                        <p className="text-xs text-gray-400">${copy.allocation.toLocaleString()} allocated</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold text-[#10B981]">+{copy.currentROI.toFixed(1)}%</p>
                        <p className="text-xs text-gray-400">ROI</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-[#10B981]">+${copy.unrealizedPL.toFixed(0)}</p>
                        <p className="text-xs text-gray-400">Profit</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Active Copy Positions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#10B981]" />
              Active Copy Positions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockPositions.length === 0 ? (
              <div className="text-center py-12">
                <PieChart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No active copy positions</h3>
                <p className="text-gray-400 mb-6">Start copying traders to see your positions here</p>
                <Button className="bg-[#10B981] hover:bg-[#059669]">Browse Top Traders</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {mockPositions.map((position, index) => (
                  <motion.div
                    key={position.traderId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/30 to-gray-800/10 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-[#10B981]/30">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" />
                        <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">
                          {position.traderName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-white">{position.traderName}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>💰 ${position.allocation.toLocaleString()}</span>
                          <span>📊 {position.trades} trades</span>
                          <span>📈 ${position.volume.toLocaleString()} volume</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div
                          className={`text-xl font-bold ${position.currentROI >= 0 ? "text-[#10B981]" : "text-red-400"}`}
                        >
                          {position.currentROI >= 0 ? "+" : ""}
                          {position.currentROI.toFixed(2)}%
                        </div>
                        <div className={`text-sm ${position.unrealizedPL >= 0 ? "text-[#10B981]" : "text-red-400"}`}>
                          {position.unrealizedPL >= 0 ? "+" : ""}${position.unrealizedPL.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant={position.status === "active" ? "default" : "secondary"}
                          className={position.status === "active" ? "bg-[#10B981]/20 text-[#10B981]" : ""}
                        >
                          {position.status}
                        </Badge>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => uncopyTrader(position.traderId)}
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                        >
                          Stop Copy
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-800`}>
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {activity.action} <span className="text-[#10B981] font-semibold">{activity.trader}</span>
                      </p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-semibold ${activity.amount.startsWith("+") ? "text-[#10B981]" : activity.amount.startsWith("-") ? "text-red-400" : "text-white"}`}
                    >
                      {activity.amount}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
