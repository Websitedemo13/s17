"use client"

export interface NewsItem {
  id: string
  title: string
  summary: string
  category: "economy" | "crypto" | "stocks" | "forex" | "commodities"
  source: string
  timestamp: Date
  impact: "high" | "medium" | "low"
  sentiment: "positive" | "negative" | "neutral"
  url: string
  imageUrl?: string
}

class NewsAPI {
  private cache: { data: NewsItem[]; timestamp: number } | null = null
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  private getCachedData(): NewsItem[] | null {
    if (this.cache && Date.now() - this.cache.timestamp < this.CACHE_DURATION) {
      return this.cache.data
    }
    return null
  }

  private setCachedData(data: NewsItem[]) {
    this.cache = { data, timestamp: Date.now() }
  }

  async getFinancialNews(): Promise<NewsItem[]> {
    const cached = this.getCachedData()
    if (cached) return cached

    try {
      // Using NewsAPI for real financial news
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=trading OR forex OR cryptocurrency OR stock market&sortBy=publishedAt&pageSize=20&apiKey=YOUR_NEWS_API_KEY`,
        { 
          headers: { 'Accept': 'application/json' },
          next: { revalidate: 300 }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }

      const data = await response.json()
      
      const newsItems: NewsItem[] = data.articles?.map((article: any, index: number) => ({
        id: `news-${index}`,
        title: article.title || 'Market Update',
        summary: article.description || article.content?.substring(0, 200) + '...' || 'Latest market developments',
        category: this.categorizeNews(article.title + ' ' + article.description),
        source: article.source?.name || 'Financial News',
        timestamp: new Date(article.publishedAt || Date.now()),
        impact: this.assessImpact(article.title + ' ' + article.description),
        sentiment: this.analyzeSentiment(article.title + ' ' + article.description),
        url: article.url || '#',
        imageUrl: article.urlToImage
      })) || this.getFallbackNews()

      this.setCachedData(newsItems)
      return newsItems
    } catch (error) {
      console.warn('Failed to fetch real news, using fallback:', error)
      return this.getFallbackNews()
    }
  }

  private categorizeNews(text: string): NewsItem['category'] {
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('bitcoin') || lowerText.includes('crypto') || lowerText.includes('ethereum')) {
      return 'crypto'
    }
    if (lowerText.includes('forex') || lowerText.includes('currency') || lowerText.includes('dollar')) {
      return 'forex'
    }
    if (lowerText.includes('stock') || lowerText.includes('share') || lowerText.includes('nasdaq') || lowerText.includes('s&p')) {
      return 'stocks'
    }
    if (lowerText.includes('gold') || lowerText.includes('oil') || lowerText.includes('commodity')) {
      return 'commodities'
    }
    return 'economy'
  }

  private assessImpact(text: string): NewsItem['impact'] {
    const lowerText = text.toLowerCase()
    
    const highImpactKeywords = ['federal reserve', 'interest rate', 'inflation', 'recession', 'crisis', 'crash', 'surge', 'breaking']
    const mediumImpactKeywords = ['earnings', 'report', 'analysis', 'forecast', 'prediction']
    
    if (highImpactKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'high'
    }
    if (mediumImpactKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'medium'
    }
    return 'low'
  }

  private analyzeSentiment(text: string): NewsItem['sentiment'] {
    const lowerText = text.toLowerCase()
    
    const positiveKeywords = ['surge', 'gain', 'rise', 'growth', 'profit', 'success', 'bullish', 'optimistic', 'breakthrough']
    const negativeKeywords = ['crash', 'fall', 'decline', 'loss', 'bearish', 'pessimistic', 'concern', 'worry', 'risk']
    
    const positiveCount = positiveKeywords.filter(keyword => lowerText.includes(keyword)).length
    const negativeCount = negativeKeywords.filter(keyword => lowerText.includes(keyword)).length
    
    if (positiveCount > negativeCount) return 'positive'
    if (negativeCount > positiveCount) return 'negative'
    return 'neutral'
  }

  private getFallbackNews(): NewsItem[] {
    const now = Date.now()
    return [
      {
        id: "1",
        title: "Federal Reserve Signals Potential Rate Cut in Q2 2024",
        summary: "Fed Chairman Jerome Powell hints at possible interest rate adjustments following recent inflation data, potentially impacting global markets significantly.",
        category: "economy",
        source: "Financial Times",
        timestamp: new Date(now - 1800000),
        impact: "high",
        sentiment: "neutral",
        url: "#",
      },
      {
        id: "2",
        title: "Bitcoin Surges Past $45,000 as Institutional Adoption Grows",
        summary: "Major corporations continue to add Bitcoin to their treasury reserves, driving the cryptocurrency to new monthly highs amid growing institutional interest.",
        category: "crypto",
        source: "CoinDesk",
        timestamp: new Date(now - 3600000),
        impact: "high",
        sentiment: "positive",
        url: "#",
      },
      {
        id: "3",
        title: "Tech Stocks Rally as AI Sector Shows Strong Q4 Performance",
        summary: "Artificial Intelligence companies report better-than-expected earnings, leading to a broad rally in technology stocks across major indices.",
        category: "stocks",
        source: "Bloomberg",
        timestamp: new Date(now - 7200000),
        impact: "medium",
        sentiment: "positive",
        url: "#",
      },
      {
        id: "4",
        title: "Gold Prices Stabilize Amid Market Uncertainty",
        summary: "Precious metals maintain steady trading ranges as investors seek safe-haven assets during volatile market conditions.",
        category: "commodities",
        source: "Reuters",
        timestamp: new Date(now - 10800000),
        impact: "medium",
        sentiment: "neutral",
        url: "#",
      },
      {
        id: "5",
        title: "EUR/USD Breaks Key Resistance Level",
        summary: "Euro strengthens against the dollar following positive economic data from the Eurozone, breaking through technical resistance at 1.10.",
        category: "forex",
        source: "ForexLive",
        timestamp: new Date(now - 14400000),
        impact: "low",
        sentiment: "positive",
        url: "#",
      }
    ]
  }
}

export const newsAPI = new NewsAPI()
export const getNewsData = () => newsAPI.getFinancialNews()
