"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CopiedTrader {
  traderId: string
  traderName: string
  allocation: number
  startDate: string
  currentROI: number
  status: "active" | "paused" | "stopped"
  subscriptionFee: number
}

interface TradingStore {
  copiedTraders: CopiedTrader[]
  copyTrader: (trader: CopiedTrader) => void
  uncopyTrader: (traderId: string) => void
  updateAllocation: (traderId: string, allocation: number) => void
  pauseTrader: (traderId: string) => void
  resumeTrader: (traderId: string) => void
}

export const useTradingStore = create<TradingStore>()(
  persist(
    (set) => ({
      copiedTraders: [],

      copyTrader: (trader) =>
        set((state) => ({
          copiedTraders: [...state.copiedTraders, trader],
        })),

      uncopyTrader: (traderId) =>
        set((state) => ({
          copiedTraders: state.copiedTraders.filter((t) => t.traderId !== traderId),
        })),

      updateAllocation: (traderId, allocation) =>
        set((state) => ({
          copiedTraders: state.copiedTraders.map((t) => (t.traderId === traderId ? { ...t, allocation } : t)),
        })),

      pauseTrader: (traderId) =>
        set((state) => ({
          copiedTraders: state.copiedTraders.map((t) =>
            t.traderId === traderId ? { ...t, status: "paused" as const } : t,
          ),
        })),

      resumeTrader: (traderId) =>
        set((state) => ({
          copiedTraders: state.copiedTraders.map((t) =>
            t.traderId === traderId ? { ...t, status: "active" as const } : t,
          ),
        })),
    }),
    {
      name: "s17-trading-storage",
    },
  ),
)
