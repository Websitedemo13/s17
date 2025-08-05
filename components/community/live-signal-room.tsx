"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/lib/auth-store"
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
} from "lucide-react"

interface LiveSignal {
  id: string
  traderId: string
  traderName: string
  traderAvatar: string
  symbol: string
  action: "BUY" | "SELL"
  price: number
  timestamp: Date
  confidence: number
  reasoning: string
  likes: number
  copies: number
  isLiked: boolean
  isCopied: boolean
  targetPrice?: number
  stopLoss?: number
  timeframe: string
}

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

const mockTraders = [
  { id: "1", name: "Alex Chen", avatar: "/placeholder.svg?height=40&width=40", status: "live", viewers: 1247 },
  { id: "2", name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40", status: "live", viewers: 892 },
  { id: "3", name: "Mike Rodriguez", avatar: "/placeholder.svg?height=40&width=40", status: "offline", viewers: 0 },
]

export function LiveSignalRoom() {
  const { user } = useAuthStore()
  const [activeRoom, setActiveRoom] = useState("alex-chen")
  const [chatMessage, setChatMessage] = useState("")
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [viewers, setViewers] = useState(1247)
  const [isFollowing, setIsFollowing] = useState(false)

  const [signals, setSignals] = useState<LiveSignal[]>([
    {
      id: "1",
      traderId: "1",
      traderName: "Alex Chen",
      traderAvatar: "/placeholder.svg?height=40&width=40",
      symbol: "EUR/USD",
      action: "BUY",
      price: 1.0895,
      timestamp: new Date(Date.now() - 300000),
      confidence: 85,
      reasoning: "Strong bullish momentum, RSI oversold, breaking key resistance at 1.0880. Target 1.0950",
      likes: 24,
      copies: 156,
      isLiked: false,
      isCopied: false,
      targetPrice: 1.095,
      stopLoss: 1.085,
      timeframe: "4H",
    },
    {
      id: "2",
      traderId: "1",
      traderName: "Alex Chen",
      traderAvatar: "/placeholder.svg?height=40&width=40",
      symbol: "BTC/USD",
      action: "SELL",
      price: 43250,
      timestamp: new Date(Date.now() - 600000),
      confidence: 78,
      reasoning: "Profit taking at resistance level, volume declining, expecting pullback to 42k support",
      likes: 18,
      copies: 89,
      isLiked: true,
      isCopied: false,
      targetPrice: 42000,
      stopLoss: 44000,
      timeframe: "1H",
    },
    {
      id: "3",
      traderId: "1",
      traderName: "Alex Chen",
      traderAvatar: "/placeholder.svg?height=40&width=40",
      symbol: "AAPL",
      action: "BUY",
      price: 185.5,
      timestamp: new Date(Date.now() - 900000),
      confidence: 92,
      reasoning: "Earnings beat expectations, strong institutional buying, breaking out of consolidation",
      likes: 31,
      copies: 203,
      isLiked: false,
      isCopied: true,
      targetPrice: 195.0,
      stopLoss: 180.0,
      timeframe: "Daily",
    },
  ])

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      userId: "system",
      userName: "System",
      userAvatar: "",
      message: "🚀 Welcome to Alex Chen's Live Trading Room! Currently 1,247 traders online",
      timestamp: new Date(Date.now() - 1800000),
      type: "system",
    },
    {
      id: "2",
      userId: "2",
      userName: "TradingPro",
      userAvatar: "/placeholder.svg?height=32&width=32",
      message: "Great call on EUR/USD! Already up 15 pips 📈",
      timestamp: new Date(Date.now() - 120000),
      type: "message",
      likes: 5,
      isLiked: false,
    },
    {
      id: "3",
      userId: "3",
      userName: "CryptoKing",
      userAvatar: "/placeholder.svg?height=32&width=32",
      message: "What's your take on Bitcoin breaking 44k? @AlexChen",
      timestamp: new Date(Date.now() - 60000),
      type: "message",
      likes: 2,
      isLiked: true,
    },
    {
      id: "4",
      userId: "1",
      userName: "Alex Chen",
      userAvatar: "/placeholder.svg?height=32&width=32",
      message: "BTC looking weak here, expecting pullback. Watch 42k support level 👀",
      timestamp: new Date(Date.now() - 30000),
      type: "message",
      likes: 12,
      isLiked: false,
    },
  ])

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random viewer count changes
      setViewers((prev) => prev + Math.floor(Math.random() * 20 - 10))

      // Simulate new messages occasionally
      if (Math.random() < 0.3) {
        const messages = [
          "Thanks for the signal! 🙏",
          "What's the next target?",
          "Great analysis as always 👍",
          "Following this trade",
          "Risk management is key! 💪",
          "When do you expect the breakout?",
          "Love the detailed reasoning 🔥",
          "Copied! Let's see how it goes",
        ]

        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          userId: `user_${Math.floor(Math.random() * 1000)}`,
          userName: `Trader${Math.floor(Math.random() * 1000)}`,
          userAvatar: "/placeholder.svg?height=32&width=32",
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp: new Date(),
          type: "message",
          likes: 0,
          isLiked: false,
        }
        setChatMessages((prev) => [...prev.slice(-50), newMessage])
      }

      // Simulate new signals occasionally
      if (Math.random() < 0.1) {
        const symbols = ["EUR/USD", "GBP/USD", "USD/JPY", "BTC/USD", "ETH/USD", "AAPL", "TSLA", "GOOGL"]
        const actions: ("BUY" | "SELL")[] = ["BUY", "SELL"]
        const newSignal: LiveSignal = {
          id: Date.now().toString(),
          traderId: "1",
          traderName: "Alex Chen",
          traderAvatar: "/placeholder.svg?height=40&width=40",
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          price: Math.random() * 1000 + 100,
          timestamp: new Date(),
          confidence: Math.floor(Math.random() * 30) + 70,
          reasoning: "Technical analysis shows strong momentum with good risk/reward ratio",
          likes: 0,
          copies: 0,
          isLiked: false,
          isCopied: false,
          timeframe: ["1H", "4H", "Daily"][Math.floor(Math.random() * 3)],
        }
        setSignals((prev) => [newSignal, ...prev.slice(0, 9)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: user?.id || "",
      userName: user?.name || "Anonymous",
      userAvatar: user?.avatar || "/placeholder.svg?height=32&width=32",
      message: chatMessage,
      timestamp: new Date(),
      type: "message",
      likes: 0,
      isLiked: false,
    }

    setChatMessages((prev) => [...prev, newMessage])
    setChatMessage("")
  }

  const handleCopySignal = (signal: LiveSignal) => {
    setSignals((prev) => prev.map((s) => (s.id === signal.id ? { ...s, copies: s.copies + 1, isCopied: true } : s)))

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: "system",
      userName: "System",
      message: `💰 ${user?.name} copied ${signal.symbol} ${signal.action} signal`,
      timestamp: new Date(),
      type: "system",
      userAvatar: "",
    }
    setChatMessages((prev) => [...prev, newMessage])
  }

  const handleLikeSignal = (signalId: string) => {
    setSignals((prev) =>
      prev.map((s) =>
        s.id === signalId ? { ...s, likes: s.isLiked ? s.likes - 1 : s.likes + 1, isLiked: !s.isLiked } : s,
      ),
    )
  }

  const handleLikeMessage = (messageId: string) => {
    setChatMessages((prev) =>
      prev.map((m) =>
        m.id === messageId && m.likes !== undefined
          ? { ...m, likes: m.isLiked ? m.likes - 1 : m.likes + 1, isLiked: !m.isLiked }
          : m,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="relative">
              <div className="p-2 bg-red-500/20 rounded-xl">
                <Radio className="h-8 w-8 text-red-500" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            Live Signal Room
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Real-time trading signals and community interaction</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="h-5 w-5" />
            <span className="font-semibold">{viewers.toLocaleString()}</span>
            <span>viewers</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className={`border-gray-700 ${isVoiceEnabled ? "text-[#10B981] border-[#10B981]" : "text-gray-400"} bg-transparent`}
          >
            {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFollowing(!isFollowing)}
            className={`border-gray-700 ${isFollowing ? "text-[#10B981] border-[#10B981]" : "text-gray-400"} bg-transparent`}
          >
            <Bell className="h-4 w-4 mr-2" />
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </motion.div>

      {/* Trader Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 overflow-x-auto pb-2"
      >
        {mockTraders.map((trader) => (
          <Button
            key={trader.id}
            variant={activeRoom === trader.name.toLowerCase().replace(" ", "-") ? "default" : "outline"}
            onClick={() => setActiveRoom(trader.name.toLowerCase().replace(" ", "-"))}
            className={`flex items-center gap-3 min-w-fit ${
              activeRoom === trader.name.toLowerCase().replace(" ", "-")
                ? "bg-[#10B981] hover:bg-[#059669]"
                : "border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            }`}
          >
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={trader.avatar || "/placeholder.svg"} />
                <AvatarFallback>{trader.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {trader.status === "live" && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="text-left">
              <div className="font-medium">{trader.name}</div>
              <div className="text-xs opacity-75">
                {trader.status === "live" ? `${trader.viewers} viewers` : "Offline"}
              </div>
            </div>
          </Button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Signals */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#10B981]" />
                  Live Signals - Alex Chen
                </div>
                <Badge className="bg-red-500/20 text-red-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                  LIVE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
              <AnimatePresence>
                {signals.map((signal, index) => (
                  <motion.div
                    key={signal.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-800/20 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
                  >
                    {/* Signal Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-[#10B981]/30">
                          <AvatarImage src={signal.traderAvatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">
                            {signal.traderName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-white">{signal.traderName}</h3>
                          <p className="text-xs text-gray-400">{signal.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                      <Badge
                        className={`${signal.timeframe === "Daily" ? "bg-purple-500/20 text-purple-400" : signal.timeframe === "4H" ? "bg-blue-500/20 text-blue-400" : "bg-orange-500/20 text-orange-400"}`}
                      >
                        {signal.timeframe}
                      </Badge>
                    </div>

                    {/* Signal Details */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Symbol</span>
                          <Badge
                            variant={signal.action === "BUY" ? "default" : "secondary"}
                            className={
                              signal.action === "BUY" ? "bg-[#10B981]/20 text-[#10B981]" : "bg-red-500/20 text-red-400"
                            }
                          >
                            {signal.action}
                          </Badge>
                        </div>
                        <div className="text-xl font-bold text-white">{signal.symbol}</div>
                        <div className="text-sm text-gray-400">
                          ${signal.price.toFixed(signal.symbol.includes("USD") ? 4 : 2)}
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-gray-400 text-sm mb-2">Confidence</div>
                        <div className="flex items-center gap-2">
                          <div className="text-xl font-bold text-[#10B981]">{signal.confidence}%</div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(signal.confidence / 20)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Targets & Stop Loss */}
                    {(signal.targetPrice || signal.stopLoss) && (
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        {signal.targetPrice && (
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-[#10B981]" />
                            <span className="text-sm text-gray-400">Target:</span>
                            <span className="text-sm font-semibold text-[#10B981]">
                              ${signal.targetPrice.toFixed(signal.symbol.includes("USD") ? 4 : 2)}
                            </span>
                          </div>
                        )}
                        {signal.stopLoss && (
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <span className="text-sm text-gray-400">Stop:</span>
                            <span className="text-sm font-semibold text-red-400">
                              ${signal.stopLoss.toFixed(signal.symbol.includes("USD") ? 4 : 2)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Reasoning */}
                    <p className="text-gray-300 text-sm mb-4 bg-gray-800/30 rounded-lg p-3 border-l-4 border-[#10B981]">
                      💡 {signal.reasoning}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          onClick={() => handleCopySignal(signal)}
                          disabled={signal.isCopied}
                          className={`${
                            signal.isCopied ? "bg-gray-600 text-gray-400" : "bg-[#10B981] hover:bg-[#059669] text-white"
                          }`}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          {signal.isCopied ? "Copied" : "Copy Signal"}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLikeSignal(signal.id)}
                          className={`border-gray-700 bg-transparent ${
                            signal.isLiked ? "text-red-400 border-red-400" : "text-gray-300"
                          }`}
                        >
                          <Heart className={`h-3 w-3 mr-1 ${signal.isLiked ? "fill-current" : ""}`} />
                          {signal.likes}
                        </Button>

                        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 bg-transparent">
                          <Share className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Copy className="h-3 w-3" />
                          {signal.copies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {signal.likes}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Chat */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-[#111827] border-gray-800 h-[700px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                  Live Chat
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Settings className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <AnimatePresence>
                  {chatMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-1"
                    >
                      {message.type === "system" ? (
                        <div className="text-center">
                          <span className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
                            {message.message}
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={message.userAvatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-[#10B981]/20 text-[#10B981] text-xs">
                                {message.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium text-[#10B981]">{message.userName}</span>
                            <span className="text-xs text-gray-500">{message.timestamp.toLocaleTimeString()}</span>
                          </div>
                          <div className="flex items-start justify-between">
                            <p className="text-sm text-gray-300 flex-1">{message.message}</p>
                            {message.likes !== undefined && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLikeMessage(message.id)}
                                className={`p-1 h-auto ${
                                  message.isLiked ? "text-red-400" : "text-gray-500 hover:text-red-400"
                                }`}
                              >
                                <Heart className={`h-3 w-3 ${message.isLiked ? "fill-current" : ""}`} />
                                <span className="text-xs ml-1">{message.likes}</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="p-4 border-t border-gray-800">
                <div className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    size="sm"
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
