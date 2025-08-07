"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/lib/auth-store"
import { getTradingSignals, getSignalProviders, type TradingSignal, type SignalProvider } from "@/lib/api/trading-signals"
import {
  Radio,
  Users,
  Send,
  TrendingUp,
  Volume2,
  VolumeX,
  Copy,
  Heart,
  MessageCircle,
  Share,
  Target,
  AlertCircle,
  Star,
  Bell,
  Settings,
  TrendingDown,
  Clock,
  Activity
} from "lucide-react"

interface ChatMessage {
  id: string
  userId: string
  userName: string
  userAvatar: string
  message: string
  timestamp: Date
  type: "message" | "signal" | "system" | "trade"
  likes?: number
  isLiked?: boolean
}

export function LiveSignalRoomImproved() {
  const { user } = useAuthStore()
  const [activeProvider, setActiveProvider] = useState<string>("")
  const [chatMessage, setChatMessage] = useState("")
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [viewers, setViewers] = useState(1247)
  const [isFollowing, setIsFollowing] = useState(false)
  const [signals, setSignals] = useState<TradingSignal[]>([])
  const [signalProviders, setSignalProviders] = useState<SignalProvider[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    loadSignalsData()
    initializeChatMessages()
    
    // Update signals every 30 seconds
    const signalsInterval = setInterval(loadSignalsData, 30000)
    
    // Simulate live chat activity
    const chatInterval = setInterval(simulateChatActivity, 15000)
    
    return () => {
      clearInterval(signalsInterval)
      clearInterval(chatInterval)
    }
  }, [])

  useEffect(() => {
    if (signalProviders.length > 0 && !activeProvider) {
      setActiveProvider(signalProviders[0].id)
    }
  }, [signalProviders, activeProvider])

  const loadSignalsData = async () => {
    try {
      const [signalsData, providersData] = await Promise.all([
        getTradingSignals(),
        getSignalProviders()
      ])
      setSignals(signalsData)
      setSignalProviders(providersData)
    } catch (error) {
      console.error('Failed to load signals data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const initializeChatMessages = () => {
    const initialMessages: ChatMessage[] = [
      {
        id: "1",
        userId: "system",
        userName: "System",
        userAvatar: "",
        message: "🚀 Welcome to Live Trading Signals! Connect with pro traders in real-time",
        timestamp: new Date(Date.now() - 1800000),
        type: "system",
      },
      {
        id: "2",
        userId: "trader1",
        userName: "TradingPro",
        userAvatar: "/placeholder.svg?height=32&width=32",
        message: "Great signals today! Already up 2.5% on my portfolio 📈",
        timestamp: new Date(Date.now() - 120000),
        type: "message",
        likes: 5,
        isLiked: false,
      },
      {
        id: "3",
        userId: "trader2",
        userName: "CryptoKing",
        userAvatar: "/placeholder.svg?height=32&width=32",
        message: "What's everyone's take on the market volatility today?",
        timestamp: new Date(Date.now() - 60000),
        type: "message",
        likes: 2,
        isLiked: true,
      }
    ]
    setChatMessages(initialMessages)
  }

  const simulateChatActivity = () => {
    if (Math.random() < 0.7) {
      const messages = [
        "Thanks for the signal! 🙏",
        "What's the next target?",
        "Great analysis as always 👍",
        "Following this trade",
        "Risk management is key! 💪",
        "When do you expect the breakout?",
        "Love the detailed reasoning 🔥",
        "Copied! Let's see how it goes",
        "Market looking bullish today 🚀",
        "Anyone else seeing this divergence?",
        "Stop loss hit, but good risk management"
      ]

      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        userId: `user_${Math.floor(Math.random() * 1000)}`,
        userName: `Trader${Math.floor(Math.random() * 1000)}`,
        userAvatar: "/placeholder.svg?height=32&width=32",
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(),
        type: "message",
        likes: 0,
        isLiked: false,
      }
      setChatMessages((prev) => [...prev.slice(-30), newMessage])
    }

    // Random viewer count changes
    setViewers((prev) => prev + Math.floor(Math.random() * 20 - 10))
  }

  const sendMessage = () => {
    if (!chatMessage.trim() || !user) return

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      userId: user.id || 'current-user',
      userName: user.name || 'You',
      userAvatar: user.avatar || "/placeholder.svg?height=32&width=32",
      message: chatMessage,
      timestamp: new Date(),
      type: "message",
      likes: 0,
      isLiked: false,
    }

    setChatMessages((prev) => [...prev.slice(-30), newMessage])
    setChatMessage("")
  }

  const activeProviderData = signalProviders.find(p => p.id === activeProvider)
  const activeProviderSignals = signals.filter(s => s.providerId === activeProvider)

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-gray-800 rounded-xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-gray-800 rounded-xl"></div>
          <div className="h-96 bg-gray-800 rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-xl">
              <Radio className="h-8 w-8 text-red-500" />
            </div>
            Live Trading Signals
          </h1>
          <p className="text-gray-400 mt-2">Real-time signals from verified traders</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-red-500/20 text-red-500 px-3 py-1">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            {viewers.toLocaleString()} viewers
          </Badge>
          <Button
            variant="outline"
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </motion.div>

      {/* Signal Providers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Featured Signal Providers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {signalProviders.map((provider) => (
                <motion.div
                  key={provider.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveProvider(provider.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    activeProvider === provider.id
                      ? 'border-[#10B981] bg-[#10B981]/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={provider.avatar} />
                      <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white flex items-center gap-1">
                        {provider.name}
                        {provider.verified && <Star className="h-4 w-4 text-yellow-400" />}
                      </h3>
                      <p className="text-xs text-gray-400">{provider.followers.toLocaleString()} followers</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Success Rate</span>
                      <span className="text-[#10B981] font-semibold">{provider.successRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total Signals</span>
                      <span className="text-white">{provider.totalSignals}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Signals Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#10B981]" />
                Live Signals {activeProviderData && `from ${activeProviderData.name}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {activeProviderSignals.length === 0 ? (
                  <div className="text-center py-12">
                    <Target className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No active signals</h3>
                    <p className="text-gray-400">Select a provider to see their latest trading signals</p>
                  </div>
                ) : (
                  activeProviderSignals.map((signal, index) => (
                    <motion.div
                      key={signal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-gray-800/50 to-gray-800/20 rounded-lg p-4 border border-gray-700"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>{signal.providerName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white">{signal.providerName}</h3>
                              <Badge variant="outline" className="text-xs">
                                {signal.timeframe}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-400">
                              {new Date(signal.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          className={`${
                            signal.action === 'BUY' 
                              ? 'bg-[#10B981]/20 text-[#10B981]' 
                              : 'bg-red-500/20 text-red-500'
                          }`}
                        >
                          {signal.action}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-xl font-bold text-white">{signal.symbol}</h4>
                            <p className="text-gray-400 text-sm">Entry: ${signal.entryPrice}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-[#10B981]">
                              {signal.confidence}% confidence
                            </div>
                            <div className="text-xs text-gray-400">
                              SL: ${signal.stopLoss} | TP: ${signal.takeProfit}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm bg-gray-800/30 p-3 rounded">
                          {signal.analysis}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Heart className="h-4 w-4 mr-1" />
                              Like
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Comment
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Share className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-[#10B981] hover:bg-[#059669] text-white"
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy Trade
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-400" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-96 overflow-y-auto space-y-3 p-2">
                  <AnimatePresence>
                    {chatMessages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex gap-3 ${message.type === 'system' ? 'justify-center' : ''}`}
                      >
                        {message.type !== 'system' && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src={message.userAvatar} />
                            <AvatarFallback className="text-xs">
                              {message.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`flex-1 ${message.type === 'system' ? 'text-center' : ''}`}>
                          {message.type !== 'system' && (
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white text-sm font-medium">
                                {message.userName}
                              </span>
                              <span className="text-gray-500 text-xs">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                          )}
                          <p className={`text-sm ${
                            message.type === 'system' 
                              ? 'text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full inline-block' 
                              : 'text-gray-300'
                          }`}>
                            {message.message}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="bg-gray-800 border-gray-700 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button 
                    onClick={sendMessage}
                    className="bg-[#10B981] hover:bg-[#059669] text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
