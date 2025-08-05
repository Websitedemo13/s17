"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Store, Star, Download, Zap, Bot, Target, Brain } from "lucide-react"

const mockStrategies = [
  {
    id: "1",
    name: "AI Momentum Scanner",
    description: "Advanced AI-powered momentum detection with 85% accuracy rate",
    price: 299,
    rating: 4.8,
    downloads: 1247,
    category: "AI Strategy",
    roi: "156%",
    risk: "Medium",
    icon: Brain,
    features: ["Real-time scanning", "AI predictions", "Risk management"],
  },
  {
    id: "2",
    name: "Scalping Bot Pro",
    description: "High-frequency trading bot for quick profits in volatile markets",
    price: 199,
    rating: 4.6,
    downloads: 892,
    category: "Automated Bot",
    roi: "89%",
    risk: "High",
    icon: Bot,
    features: ["1-minute trades", "Auto-execution", "Stop-loss protection"],
  },
  {
    id: "3",
    name: "Swing Master",
    description: "Conservative swing trading strategy for steady long-term gains",
    price: 149,
    rating: 4.9,
    downloads: 2156,
    category: "Manual Strategy",
    roi: "67%",
    risk: "Low",
    icon: Target,
    features: ["Weekly signals", "Risk-adjusted", "Backtested results"],
  },
  {
    id: "4",
    name: "Crypto Arbitrage",
    description: "Multi-exchange arbitrage opportunities with automated execution",
    price: 399,
    rating: 4.7,
    downloads: 634,
    category: "Arbitrage",
    roi: "234%",
    risk: "Medium",
    icon: Zap,
    features: ["Cross-exchange", "Instant execution", "Profit alerts"],
  },
]

export function TradingStore() {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "High":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI Strategy":
        return "bg-purple-500/20 text-purple-400"
      case "Automated Bot":
        return "bg-blue-500/20 text-blue-400"
      case "Manual Strategy":
        return "bg-green-500/20 text-green-400"
      case "Arbitrage":
        return "bg-orange-500/20 text-orange-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Strategy Marketplace</h2>
        <p className="text-gray-400">Discover and purchase proven trading strategies from top performers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockStrategies.map((strategy) => {
          const IconComponent = strategy.icon
          return (
            <Card
              key={strategy.id}
              className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <IconComponent className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{strategy.name}</CardTitle>
                      <Badge className={getCategoryColor(strategy.category)}>{strategy.category}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">${strategy.price}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-400">{strategy.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">{strategy.description}</p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-emerald-400 font-semibold">{strategy.roi}</div>
                    <div className="text-xs text-gray-400">Avg ROI</div>
                  </div>
                  <div>
                    <Badge className={getRiskColor(strategy.risk)} variant="outline">
                      {strategy.risk}
                    </Badge>
                    <div className="text-xs text-gray-400 mt-1">Risk</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{strategy.downloads}</div>
                    <div className="text-xs text-gray-400">Downloads</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-300">Key Features:</div>
                  <ul className="space-y-1">
                    {strategy.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-center gap-2">
                        <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Purchase
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-500/30">
        <CardContent className="p-6 text-center">
          <Store className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Become a Strategy Seller</h3>
          <p className="text-gray-300 mb-4">
            Share your profitable strategies with the community and earn passive income
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Start Selling</Button>
        </CardContent>
      </Card>
    </div>
  )
}
