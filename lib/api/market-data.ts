"use client"

export interface MarketDataItem {
  symbol: string
  price: number
  change: string
  trend: "up" | "down"
  volume?: number
  high24h?: number
  low24h?: number
}

export interface MarketData {
  indices: MarketDataItem[]
  forex: MarketDataItem[]
  crypto: MarketDataItem[]
  commodities: MarketDataItem[]
}

// Real API endpoints - using multiple free APIs for different data sources
const API_ENDPOINTS = {
  crypto: "https://api.coinbase.com/v2/exchange-rates?currency=BTC",
  forex: "https://api.exchangerate-api.com/v4/latest/USD",
  stocks: "https://api.twelvedata.com/time_series"
}

// Fallback data in case APIs are down
const FALLBACK_DATA: MarketData = {
  indices: [
    { symbol: "S&P 500", price: 4567.89, change: "+1.2%", trend: "up" },
    { symbol: "NASDAQ", price: 14234.56, change: "+0.8%", trend: "up" },
    { symbol: "DOW", price: 34567.12, change: "-0.3%", trend: "down" },
  ],
  forex: [
    { symbol: "EUR/USD", price: 1.0945, change: "+0.15%", trend: "up" },
    { symbol: "GBP/USD", price: 1.2678, change: "-0.08%", trend: "down" },
    { symbol: "USD/JPY", price: 149.85, change: "+0.22%", trend: "up" },
  ],
  crypto: [
    { symbol: "BTC/USD", price: 45234.67, change: "+3.2%", trend: "up" },
    { symbol: "ETH/USD", price: 2456.78, change: "+2.8%", trend: "up" },
    { symbol: "ADA/USD", price: 0.4567, change: "-1.2%", trend: "down" },
  ],
  commodities: [
    { symbol: "GOLD", price: 2045.67, change: "+0.5%", trend: "up" },
    { symbol: "SILVER", price: 24.56, change: "+0.8%", trend: "up" },
    { symbol: "OIL", price: 78.45, change: "-0.3%", trend: "down" },
  ],
}

class MarketDataAPI {
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

  async getCryptoData(): Promise<MarketDataItem[]> {
    const cached = this.getCachedData('crypto')
    if (cached) return cached

    try {
      // Using CoinGecko API for crypto data
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd&include_24hr_change=true',
        { 
          headers: { 'Accept': 'application/json' },
          next: { revalidate: 30 }
        }
      )
      
      if (!response.ok) throw new Error('Failed to fetch crypto data')
      
      const data = await response.json()
      
      const cryptoData: MarketDataItem[] = [
        {
          symbol: "BTC/USD",
          price: data.bitcoin?.usd || FALLBACK_DATA.crypto[0].price,
          change: data.bitcoin?.usd_24h_change 
            ? `${data.bitcoin.usd_24h_change > 0 ? '+' : ''}${data.bitcoin.usd_24h_change.toFixed(2)}%`
            : FALLBACK_DATA.crypto[0].change,
          trend: (data.bitcoin?.usd_24h_change || 0) >= 0 ? "up" : "down"
        },
        {
          symbol: "ETH/USD",
          price: data.ethereum?.usd || FALLBACK_DATA.crypto[1].price,
          change: data.ethereum?.usd_24h_change 
            ? `${data.ethereum.usd_24h_change > 0 ? '+' : ''}${data.ethereum.usd_24h_change.toFixed(2)}%`
            : FALLBACK_DATA.crypto[1].change,
          trend: (data.ethereum?.usd_24h_change || 0) >= 0 ? "up" : "down"
        },
        {
          symbol: "ADA/USD",
          price: data.cardano?.usd || FALLBACK_DATA.crypto[2].price,
          change: data.cardano?.usd_24h_change 
            ? `${data.cardano.usd_24h_change > 0 ? '+' : ''}${data.cardano.usd_24h_change.toFixed(2)}%`
            : FALLBACK_DATA.crypto[2].change,
          trend: (data.cardano?.usd_24h_change || 0) >= 0 ? "up" : "down"
        }
      ]

      this.setCachedData('crypto', cryptoData)
      return cryptoData
    } catch (error) {
      console.warn('Failed to fetch crypto data, using fallback:', error)
      return FALLBACK_DATA.crypto
    }
  }

  async getForexData(): Promise<MarketDataItem[]> {
    const cached = this.getCachedData('forex')
    if (cached) return cached

    try {
      // Using Fixer.io API for forex data (free tier)
      const response = await fetch(
        'https://api.fixer.io/latest?access_key=YOUR_API_KEY&symbols=EUR,GBP,JPY',
        { 
          headers: { 'Accept': 'application/json' },
          next: { revalidate: 30 }
        }
      )
      
      // For demo purposes, we'll use mock data with random variations
      const baseData = FALLBACK_DATA.forex
      const forexData = baseData.map(item => ({
        ...item,
        price: item.price * (0.98 + Math.random() * 0.04), // ±2% variation
        change: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 0.5).toFixed(2)}%`,
        trend: Math.random() > 0.5 ? "up" as const : "down" as const
      }))

      this.setCachedData('forex', forexData)
      return forexData
    } catch (error) {
      console.warn('Failed to fetch forex data, using fallback:', error)
      return FALLBACK_DATA.forex
    }
  }

  async getIndicesData(): Promise<MarketDataItem[]> {
    const cached = this.getCachedData('indices')
    if (cached) return cached

    try {
      // For demo purposes, simulate real-time data with small variations
      const baseData = FALLBACK_DATA.indices
      const indicesData = baseData.map(item => ({
        ...item,
        price: item.price * (0.995 + Math.random() * 0.01), // ±0.5% variation
        change: `${Math.random() > 0.6 ? '+' : '-'}${(Math.random() * 2).toFixed(1)}%`,
        trend: Math.random() > 0.6 ? "up" as const : "down" as const
      }))

      this.setCachedData('indices', indicesData)
      return indicesData
    } catch (error) {
      console.warn('Failed to fetch indices data, using fallback:', error)
      return FALLBACK_DATA.indices
    }
  }

  async getCommoditiesData(): Promise<MarketDataItem[]> {
    const cached = this.getCachedData('commodities')
    if (cached) return cached

    try {
      // Simulate real commodity prices with variations
      const baseData = FALLBACK_DATA.commodities
      const commoditiesData = baseData.map(item => ({
        ...item,
        price: item.price * (0.99 + Math.random() * 0.02), // ±1% variation
        change: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 1.5).toFixed(1)}%`,
        trend: Math.random() > 0.5 ? "up" as const : "down" as const
      }))

      this.setCachedData('commodities', commoditiesData)
      return commoditiesData
    } catch (error) {
      console.warn('Failed to fetch commodities data, using fallback:', error)
      return FALLBACK_DATA.commodities
    }
  }

  async getAllMarketData(): Promise<MarketData> {
    try {
      const [indices, forex, crypto, commodities] = await Promise.all([
        this.getIndicesData(),
        this.getForexData(),
        this.getCryptoData(),
        this.getCommoditiesData()
      ])

      return {
        indices,
        forex,
        crypto,
        commodities
      }
    } catch (error) {
      console.error('Failed to fetch market data:', error)
      return FALLBACK_DATA
    }
  }
}

export const marketDataAPI = new MarketDataAPI()
export const getMarketData = () => marketDataAPI.getAllMarketData()
