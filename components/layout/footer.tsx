"use client"

import Link from "next/link"
import { TrendingUp, Mail, MessageCircle, FileText, Users, AlertTriangle, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { name: "Top Traders", href: "/traders" },
      { name: "Live Signals", href: "/live-signals" },
      { name: "Community", href: "/forum" },
      { name: "News & Analysis", href: "/news" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Report Bug", href: "/report-bug" },
      { name: "Feature Request", href: "/feature-request" },
    ],
    legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Risk Disclosure", href: "/risk-disclosure" },
      { name: "Compliance", href: "/compliance" },
    ],
    social: [
      { name: "Twitter", href: "https://twitter.com/s17trading" },
      { name: "Discord", href: "https://discord.gg/s17trading" },
      { name: "Telegram", href: "https://t.me/s17trading" },
      { name: "LinkedIn", href: "https://linkedin.com/company/s17trading" },
    ],
  }

  return (
    <footer className="bg-gray-800/30 border-t border-gray-700 p-4">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-8 w-8 text-[#10B981]" />
              <div>
                <h3 className="text-xl font-bold text-white">S17 Trading</h3>
                <p className="text-xs text-gray-400">Empower Traders, Amplify Wealth</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-md">
              The world's leading social trading platform where traders connect, share strategies, and grow together.
              Join thousands of successful traders today.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="h-4 w-4 text-[#10B981]" />
                <span>50K+ Active Traders</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <TrendingUp className="h-4 w-4 text-[#10B981]" />
                <span>$2.5B+ Volume</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-[#10B981] text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-[#10B981] text-sm transition-colors flex items-center gap-2"
                  >
                    {link.name === "Report Bug" && <AlertTriangle className="h-3 w-3" />}
                    {link.name === "Contact Us" && <Mail className="h-3 w-3" />}
                    {link.name === "Feature Request" && <MessageCircle className="h-3 w-3" />}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-[#10B981] text-sm transition-colors flex items-center gap-2"
                  >
                    <FileText className="h-3 w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Social</h4>
            <ul className="space-y-2">
              {footerLinks.social.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#10B981] transition-colors"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-400">© {currentYear} S17 Trading. All rights reserved.</p>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                Made with <Heart className="h-4 w-4 text-red-400 fill-current" /> by S17 Team
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="/terms" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/support" className="hover:text-white transition-colors">
                Support
              </a>
              <a href="/api" className="hover:text-white transition-colors">
                API
              </a>
            </div>
          </div>

          {/* Risk Warning */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-yellow-200">
                <strong>Risk Warning:</strong> Trading involves substantial risk and may result in the loss of your
                invested capital. Past performance does not guarantee future results. Please ensure you fully understand
                the risks involved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
