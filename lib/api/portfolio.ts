"use client"

export interface PortfolioStats {
  totalValue: number
  totalInvested: number
  totalROI: number
  monthlyReturn: number
  weeklyReturn: number
  dailyReturn: number
  activePositions: number
  totalTrades: number
  winRate: number
  profitLoss: number
  riskScore: number
}

export interface Position {
  id: string
  traderId: string
  traderName: string
  allocation: number
  currentROI: number
  unrealizedPL: number
  lastUpdate: string
  volume: number
  trades: number
  status: "active" | "paused" | "closed"
  entryDate: Date
  traderAvatar?: string
}

export interface ActivityItem {
  id: string
  type: "copy" | "trade" | "profit" | "stop" | "deposit" | "withdrawal"
  action: string
  trader?: string
  time: string
  amount: string
  description: string
  icon: string
  color: string
}

class PortfolioAPI {
  private cache: { [key: string]: { data: any; timestamp: number } } = {}
  private readonly CACHE_DURATION = 30 * 1000 // 30 seconds

  private getCachedData(key: string) {
    const cached = this.cache[key]
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }
    return null
  }

  private setCachedData(key: string, data: any) {
    this.cache[key] = { data, timestamp: Date.now() }
  }

  async getPortfolioStats(userId: string): Promise<PortfolioStats> {
    const cached = this.getCachedData(`portfolio-stats-${userId}`)
    if (cached) return cached

    try {
      // In a real app, this would fetch from your backend API
      // For now, we'll simulate realistic portfolio data
      const stats = this.generateRealisticPortfolioStats()
      
      this.setCachedData(`portfolio-stats-${userId}`, stats)
      return stats
    } catch (error) {
      console.warn('Failed to fetch portfolio stats:', error)
      return this.getFallbackPortfolioStats()
    }
  }

  async getPositions(userId: string): Promise<Position[]> {
    const cached = this.getCachedData(`positions-${userId}`)
    if (cached) return cached

    try {
      const positions = this.generateRealisticPositions()
      
      this.setCachedData(`positions-${userId}`, positions)
      return positions
    } catch (error) {
      console.warn('Failed to fetch positions:', error)
      return []
    }
  }

  async getRecentActivity(userId: string): Promise<ActivityItem[]> {
    const cached = this.getCachedData(`activity-${userId}`)
    if (cached) return cached

    try {
      const activity = this.generateRealisticActivity()
      
      this.setCachedData(`activity-${userId}`, activity)
      return activity
    } catch (error) {
      console.warn('Failed to fetch activity:', error)
      return this.getFallbackActivity()
    }
  }

  private generateRealisticPortfolioStats(): PortfolioStats {
    // Simulate realistic portfolio progression
    const baseInvestment = 75000 + Math.random() * 50000
    const totalROI = 15 + Math.random() * 25 // 15-40% ROI
    const totalValue = baseInvestment * (1 + totalROI / 100)
    
    return {
      totalValue: Math.round(totalValue),
      totalInvested: Math.round(baseInvestment),
      totalROI: Number(totalROI.toFixed(1)),
      monthlyReturn: Number((5 + Math.random() * 10).toFixed(1)), // 5-15% monthly
      weeklyReturn: Number((0.5 + Math.random() * 3).toFixed(1)), // 0.5-3.5% weekly
      dailyReturn: Number((-0.5 + Math.random() * 2).toFixed(1)), // -0.5% to 1.5% daily
      activePositions: 3 + Math.floor(Math.random() * 5), // 3-7 positions
      totalTrades: 120 + Math.floor(Math.random() * 200), // 120-320 trades
      winRate: 65 + Math.floor(Math.random() * 20), // 65-85% win rate
      profitLoss: Math.round(totalValue - baseInvestment),
      riskScore: 45 + Math.floor(Math.random() * 35) // 45-80 risk score
    }
  }

  private generateRealisticPositions(): Position[] {
    const traders = [
      { id: "trader-1", name: "Alex Chen" },
      { id: "trader-2", name: "Sarah Johnson" },
      { id: "trader-3", name: "Mike Rodriguez" },
      { id: "trader-4", name: "Emma Wilson" },
      { id: "trader-5", name: "David Kim" }
    ]

    const numPositions = 3 + Math.floor(Math.random() * 3) // 3-5 positions
    const positions: Position[] = []

    for (let i = 0; i < numPositions; i++) {
      const trader = traders[i % traders.length]
      const allocation = 5000 + Math.random() * 20000 // $5k-25k allocation
      const currentROI = -10 + Math.random() * 50 // -10% to +40% ROI
      const unrealizedPL = allocation * (currentROI / 100)

      positions.push({
        id: `position-${i + 1}`,
        traderId: trader.id,
        traderName: trader.name,
        allocation: Math.round(allocation),
        currentROI: Number(currentROI.toFixed(2)),
        unrealizedPL: Math.round(unrealizedPL),
        lastUpdate: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        volume: Math.floor(20000 + Math.random() * 80000), // $20k-100k volume
        trades: Math.floor(10 + Math.random() * 40), // 10-50 trades
        status: Math.random() > 0.1 ? "active" : "paused", // 90% active
        entryDate: new Date(Date.now() - Math.random() * 30 * 86400000), // Within last 30 days
        traderAvatar: "/placeholder.svg?height=48&width=48"
      })
    }

    return positions.sort((a, b) => b.currentROI - a.currentROI) // Sort by performance
  }

  private generateRealisticActivity(): ActivityItem[] {
    const activities: ActivityItem[] = []
    const now = Date.now()

    const activityTypes = [
      {
        type: "copy" as const,
        action: "Started copying",
        icon: "Users",
        color: "text-[#10B981]",
        amountRange: [1000, 10000]
      },
      {
        type: "trade" as const,
        action: "Trade executed",
        icon: "TrendingUp",
        color: "text-blue-400",
        amountRange: [50, 500]
      },
      {
        type: "profit" as const,
        action: "Profit realized",
        icon: "DollarSign",
        color: "text-green-400",
        amountRange: [100, 2000]
      },
      {
        type: "stop" as const,
        action: "Stopped copying",
        icon: "AlertTriangle",
        color: "text-red-400",
        amountRange: [-500, 0]
      }
    ]

    const traders = ["Alex Chen", "Sarah Johnson", "Mike Rodriguez", "Emma Wilson", "David Kim"]

    for (let i = 0; i < 8; i++) {
      const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)]
      const trader = traders[Math.floor(Math.random() * traders.length)]
      const amount = activityType.amountRange[0] + 
        Math.random() * (activityType.amountRange[1] - activityType.amountRange[0])
      
      const timeAgo = Math.floor(Math.random() * 48) // 0-48 hours ago
      let timeString = ""
      if (timeAgo < 1) {
        timeString = "Just now"
      } else if (timeAgo < 24) {
        timeString = `${timeAgo} hour${timeAgo > 1 ? 's' : ''} ago`
      } else {
        const days = Math.floor(timeAgo / 24)
        timeString = `${days} day${days > 1 ? 's' : ''} ago`
      }

      activities.push({
        id: `activity-${i + 1}`,
        type: activityType.type,
        action: activityType.action,
        trader: activityType.type !== "deposit" && activityType.type !== "withdrawal" ? trader : undefined,
        time: timeString,
        amount: activityType.type === "copy" 
          ? `$${Math.abs(amount).toLocaleString()}`
          : `${amount >= 0 ? '+' : '-'}$${Math.abs(amount).toFixed(0)}`,
        description: `${activityType.action} ${trader}`,
        icon: activityType.icon,
        color: activityType.color
      })
    }

    return activities.sort((a, b) => {
      // Sort by time (most recent first)
      const timeA = this.parseTimeAgo(a.time)
      const timeB = this.parseTimeAgo(b.time)
      return timeA - timeB
    })
  }

  private parseTimeAgo(timeString: string): number {
    if (timeString === "Just now") return 0
    
    const match = timeString.match(/(\d+)\s+(hour|day)s?\s+ago/)
    if (match) {
      const value = parseInt(match[1])
      const unit = match[2]
      return unit === "hour" ? value : value * 24
    }
    
    return 999 // Unknown format, put at end
  }

  private getFallbackPortfolioStats(): PortfolioStats {
    return {
      totalValue: 125430,
      totalInvested: 98500,
      totalROI: 27.3,
      monthlyReturn: 8.9,
      weeklyReturn: 2.1,
      dailyReturn: 0.5,
      activePositions: 4,
      totalTrades: 156,
      winRate: 78,
      profitLoss: 26930,
      riskScore: 65
    }
  }

  private getFallbackActivity(): ActivityItem[] {
    return [
      {
        id: "activity-1",
        type: "copy",
        action: "Started copying",
        trader: "Alex Chen",
        time: "2 hours ago",
        amount: "$5,000",
        description: "Started copying Alex Chen",
        icon: "Users",
        color: "text-[#10B981]"
      },
      {
        id: "activity-2",
        type: "trade",
        action: "Trade executed",
        trader: "Sarah Johnson",
        time: "4 hours ago",
        amount: "+$245",
        description: "Trade executed Sarah Johnson",
        icon: "TrendingUp",
        color: "text-blue-400"
      }
    ]
  }

  async getPortfolioPerformanceData(userId: string): Promise<any[]> {
    // Generate realistic performance chart data
    const data = []
    const startValue = 50000
    let currentValue = startValue
    
    for (let i = 0; i < 30; i++) {
      const change = (Math.random() - 0.5) * 0.04 // ±2% daily change
      currentValue *= (1 + change)
      
      data.push({
        date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
        value: Math.round(currentValue),
        change: change * 100
      })
    }
    
    return data
  }
}

export const portfolioAPI = new PortfolioAPI()
