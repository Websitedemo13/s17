"use client"

import type React from "react"

import { Sidebar } from "@/components/layout/sidebar"
import { ProfessionalHeader } from "@/components/layout/professional-header"
import { Footer } from "@/components/layout/footer"
import { AIAssistant } from "@/components/ai/ai-assistant"
import { NotificationCenter } from "@/components/notifications/notification-center"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen trading-gradient">
      <ProfessionalHeader />
      <div className="flex pt-16">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
            <div className="max-w-full pt-4">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
      <AIAssistant />
      <NotificationCenter />
    </div>
  )
}
