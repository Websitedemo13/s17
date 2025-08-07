"use client"

export interface TradingSignal {
  id: string
  symbol: string
  action: "BUY" | "SELL"
  entryPrice: number
  stopLoss: number
  takeProfit: number
  confidence: number // 0-100
  timeframe: "1m" | "5m" | "15m" | "1h" | "4h" | "1d"
  analysis: string
  timestamp: Date
  status: "active" | "triggered" | "expired"
  providerId: string
  providerName: string
  category: "forex" | "crypto" | "stocks" | "commodities"
}

export interface SignalProvider {
  id: string
  name: string
  avatar: string
  successRate: number
  totalSignals: number
  followers: number
  verified: boolean
  specialties: string[]
}

class TradingSignalsAPI {
  private signalsCache: { data: TradingSignal[]; timestamp: number } | null = null
  private providersCache: { data: SignalProvider[]; timestamp: number } | null = null
  private readonly CACHE_DURATION = 60 * 1000 // 1 minute for signals

  private getCachedSignals(): TradingSignal[] | null {
    if (this.signalsCache && Date.now() - this.signalsCache.timestamp < this.CACHE_DURATION) {
      return this.signalsCache.data
    }
    return null
  }

  private setCachedSignals(data: TradingSignal[]) {
    this.signalsCache = { data, timestamp: Date.now() }
  }

  async getActiveSignals(): Promise<TradingSignal[]> {
    const cached = this.getCachedSignals()
    if (cached) return cached

    try {
      // In a real application, this would connect to a trading signals API
      // For now, we'll generate realistic signals based on current market conditions
      const signals = await this.generateRealisticSignals()
      
      this.setCachedSignals(signals)
      return signals
    } catch (error) {
      console.warn('Failed to fetch trading signals:', error)
      return this.getFallbackSignals()
    }
  }

  private async generateRealisticSignals(): Promise<TradingSignal[]> {
    const symbols = [
      { symbol: "EUR/USD", category: "forex" as const },
      { symbol: "GBP/USD", category: "forex" as const },
      { symbol: "USD/JPY", category: "forex" as const },
      { symbol: "BTC/USD", category: "crypto" as const },
      { symbol: "ETH/USD", category: "crypto" as const },
      { symbol: "AAPL", category: "stocks" as const },
      { symbol: "TSLA", category: "stocks" as const },
      { symbol: "GOLD", category: "commodities" as const }
    ]

    const providers = await this.getSignalProviders()
    const timeframes: TradingSignal['timeframe'][] = ["15m", "1h", "4h", "1d"]
    
    const signals: TradingSignal[] = []
    const now = Date.now()

    // Generate 5-8 active signals
    for (let i = 0; i < 6; i++) {
      const symbolData = symbols[Math.floor(Math.random() * symbols.length)]
      const provider = providers[Math.floor(Math.random() * providers.length)]
      const action: "BUY" | "SELL" = Math.random() > 0.5 ? "BUY" : "SELL"
      const basePrice = this.getBasePrice(symbolData.symbol)
      
      const entryPrice = basePrice * (0.99 + Math.random() * 0.02)
      const stopLoss = action === "BUY" 
        ? entryPrice * (0.95 + Math.random() * 0.03)
        : entryPrice * (1.02 + Math.random() * 0.03)
      const takeProfit = action === "BUY"
        ? entryPrice * (1.02 + Math.random() * 0.05)
        : entryPrice * (0.95 + Math.random() * 0.03)

      signals.push({
        id: `signal-${i + 1}`,
        symbol: symbolData.symbol,
        action,
        entryPrice: Number(entryPrice.toFixed(symbolData.category === 'forex' ? 4 : 2)),
        stopLoss: Number(stopLoss.toFixed(symbolData.category === 'forex' ? 4 : 2)),
        takeProfit: Number(takeProfit.toFixed(symbolData.category === 'forex' ? 4 : 2)),
        confidence: 70 + Math.floor(Math.random() * 25),
        timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
        analysis: this.generateAnalysis(symbolData.symbol, action),
        timestamp: new Date(now - Math.random() * 3600000), // Within last hour
        status: "active",
        providerId: provider.id,
        providerName: provider.name,
        category: symbolData.category
      })
    }

    return signals.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  private getBasePrice(symbol: string): number {
    const prices: { [key: string]: number } = {
      "EUR/USD": 1.0945,
      "GBP/USD": 1.2678,
      "USD/JPY": 149.85,
      "BTC/USD": 45234.67,
      "ETH/USD": 2456.78,
      "AAPL": 185.50,
      "TSLA": 245.00,
      "GOLD": 2045.67
    }
    return prices[symbol] || 100
  }

  private generateAnalysis(symbol: string, action: "BUY" | "SELL"): string {
    const analyses = {
      BUY: [
        `${symbol} showing strong bullish momentum with RSI indicating oversold conditions. Entry above resistance.`,
        `Technical analysis suggests ${symbol} is breaking key resistance levels with increasing volume.`,
        `${symbol} forming ascending triangle pattern with positive fundamentals supporting upward movement.`,
        `Strong support holding at current levels for ${symbol}. Expecting bounce to next resistance.`
      ],
      SELL: [
        `${symbol} showing bearish divergence with overbought RSI. Expecting pullback from resistance.`,
        `Technical indicators suggest ${symbol} is losing momentum at key resistance levels.`,
        `${symbol} forming descending triangle with weak fundamentals indicating downward pressure.`,
        `Resistance holding strong for ${symbol}. Expecting rejection and move to lower support.`
      ]
    }
    
    const options = analyses[action]
    return options[Math.floor(Math.random() * options.length)]
  }

  async getSignalProviders(): Promise<SignalProvider[]> {
    if (this.providersCache && Date.now() - this.providersCache.timestamp < 3600000) {
      return this.providersCache.data
    }

    const providers: SignalProvider[] = [
      {
        id: "provider-1",
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        successRate: 78.5,
        totalSignals: 342,
        followers: 12547,
        verified: true,
        specialties: ["Forex", "Technical Analysis"]
      },
      {
        id: "provider-2",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        successRate: 82.1,
        totalSignals: 198,
        followers: 8934,
        verified: true,
        specialties: ["Crypto", "Scalping"]
      },
      {
        id: "provider-3",
        name: "Mike Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        successRate: 75.3,
        totalSignals: 456,
        followers: 6234,
        verified: true,
        specialties: ["Stocks", "Day Trading"]
      },
      {
        id: "provider-4",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        successRate: 71.8,
        totalSignals: 123,
        followers: 4567,
        verified: false,
        specialties: ["Commodities", "Swing Trading"]
      }
    ]

    this.providersCache = { data: providers, timestamp: Date.now() }
    return providers
  }

  private getFallbackSignals(): TradingSignal[] {
    const now = Date.now()
    return [
      {
        id: "signal-1",
        symbol: "EUR/USD",
        action: "BUY",
        entryPrice: 1.0945,
        stopLoss: 1.0920,
        takeProfit: 1.0980,
        confidence: 85,
        timeframe: "1h",
        analysis: "EUR/USD showing strong bullish momentum with RSI indicating oversold conditions.",
        timestamp: new Date(now - 900000),
        status: "active",
        providerId: "provider-1",
        providerName: "Alex Chen",
        category: "forex"
      },
      {
        id: "signal-2",
        symbol: "BTC/USD",
        action: "SELL",
        entryPrice: 45200,
        stopLoss: 45800,
        takeProfit: 44000,
        confidence: 72,
        timeframe: "4h",
        analysis: "Bitcoin showing bearish divergence with overbought RSI. Expecting pullback.",
        timestamp: new Date(now - 1800000),
        status: "active",
        providerId: "provider-2",
        providerName: "Sarah Johnson",
        category: "crypto"
      }
    ]
  }
}

export const tradingSignalsAPI = new TradingSignalsAPI()
export const getTradingSignals = () => tradingSignalsAPI.getActiveSignals()
export const getSignalProviders = () => tradingSignalsAPI.getSignalProviders()
