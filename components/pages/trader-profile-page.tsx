"use client"

import { useParams } from "react-router-dom"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockTraders, mockTradeHistory } from "@/lib/mock-data"
import { useTradingStore } from "@/lib/trading-store"
import { useAuthStore } from "@/lib/auth-store"
import { TrendingUp, Users, Shield, Copy, CheckCircle, Star, Activity, BarChart3, Calendar } from "lucide-react"

export function TraderProfilePage() {
  const { id } = useParams()
  const { user } = useAuthStore()
  const { copiedTraders, copyTrader, uncopyTrader } = useTradingStore()
  const [isLoading, setIsLoading] = useState(false)

  const trader = mockTraders.find((t) => t.id === id)
  const tradeHistory = mockTradeHistory.filter((t) => t.traderId === id)
  const isCopied = copiedTraders.some((ct) => ct.traderId === id)

  if (!trader) {
    return <div className="text-white">Trader not found</div>
  }

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
    <div className="space-y-6">
      {/* Trader Header */}
      <Card className="bg-[#111827] border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 border-2 border-[#10B981]/30">
                <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
                <AvatarFallback className="bg-[#10B981]/20 text-[#10B981] text-xl">
                  {trader.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-white">{trader.name}</h1>
                  {trader.verified && <CheckCircle className="h-5 w-5 text-blue-400" />}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < trader.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                    />
                  ))}
                  <span className="text-sm text-gray-400 ml-1">({trader.rating})</span>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getRiskColor(trader.riskLevel)}>
                    <Shield className="h-3 w-3 mr-1" />
                    {trader.riskLevel} Risk
                  </Badge>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Users className="h-4 w-4" />
                    {trader.followers} followers
                  </div>
                </div>
              </div>
            </div>

            {user?.role === "investor" && (
              <div className="text-right">
                <div className="text-2xl font-bold text-[#10B981] mb-2">${trader.subscriptionFee}/month</div>
                <Button
                  onClick={handleCopyToggle}
                  disabled={isLoading}
                  className={`${
                    isCopied ? "bg-red-600 hover:bg-red-700 text-white" : "bg-[#10B981] hover:bg-[#059669] text-white"
                  }`}
                >
                  {isLoading ? <Activity className="h-4 w-4 mr-2 animate-spin" /> : <Copy className="h-4 w-4 mr-2" />}
                  {isCopied ? "Stop Copying" : "Copy Trader"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#10B981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#10B981]">+{trader.totalROI}%</div>
            <p className="text-xs text-gray-400">All time performance</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Monthly ROI</CardTitle>
            <Calendar className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+{trader.monthlyROI}%</div>
            <p className="text-xs text-gray-400">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Win Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{trader.winRate}%</div>
            <p className="text-xs text-gray-400">Success rate</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Trades</CardTitle>
            <Activity className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{trader.totalTrades}</div>
            <p className="text-xs text-gray-400">Completed trades</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#111827] border border-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trades">Trade History</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Equity Curve</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Equity curve chart would go here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Drawdown</span>
                  <span className="text-red-400">-12.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sharpe Ratio</span>
                  <span className="text-white">2.34</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Profit Factor</span>
                  <span className="text-[#10B981]">1.87</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Average Trade</span>
                  <span className="text-white">+2.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Best Trade</span>
                  <span className="text-[#10B981]">+45.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Worst Trade</span>
                  <span className="text-red-400">-8.7%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trades" className="mt-6">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-2 text-gray-400">Date</th>
                      <th className="text-left py-2 text-gray-400">Symbol</th>
                      <th className="text-left py-2 text-gray-400">Type</th>
                      <th className="text-left py-2 text-gray-400">Entry</th>
                      <th className="text-left py-2 text-gray-400">Exit</th>
                      <th className="text-left py-2 text-gray-400">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradeHistory.map((trade) => (
                      <tr key={trade.id} className="border-b border-gray-800">
                        <td className="py-2 text-gray-300">{new Date(trade.date).toLocaleDateString()}</td>
                        <td className="py-2 text-white font-medium">{trade.symbol}</td>
                        <td className="py-2">
                          <Badge variant={trade.type === "BUY" ? "default" : "secondary"}>{trade.type}</Badge>
                        </td>
                        <td className="py-2 text-gray-300">${trade.entryPrice}</td>
                        <td className="py-2 text-gray-300">${trade.exitPrice}</td>
                        <td className={`py-2 font-medium ${trade.pnl >= 0 ? "text-[#10B981]" : "text-red-400"}`}>
                          {trade.pnl >= 0 ? "+" : ""}${trade.pnl}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="mt-6">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Trading Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{trader.strategy}</h3>
                <p className="text-gray-300">
                  This strategy focuses on identifying momentum breakouts in major currency pairs and cryptocurrency
                  markets. Using a combination of technical indicators including RSI, MACD, and volume analysis to time
                  entries and exits.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Key Features</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Risk management with 2% max risk per trade</li>
                    <li>• Stop loss at 1.5% below entry</li>
                    <li>• Take profit at 3:1 risk-reward ratio</li>
                    <li>• Maximum 5 concurrent positions</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Markets</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Major Forex pairs (EUR/USD, GBP/USD)</li>
                    <li>• Cryptocurrency (BTC, ETH, major altcoins)</li>
                    <li>• Stock indices (S&P 500, NASDAQ)</li>
                    <li>• Commodities (Gold, Oil)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
