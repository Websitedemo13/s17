"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, Shield, AlertTriangle } from "lucide-react"

export function TermsPage() {
  const lastUpdated = "January 15, 2024"

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <FileText className="h-8 w-8 text-[#10B981]" />
          Terms of Service
        </h1>
        <p className="text-gray-400 flex items-center justify-center gap-2">
          <Calendar className="h-4 w-4" />
          Last updated: {lastUpdated}
        </p>
      </div>

      <Card className="bg-yellow-500/10 border-yellow-500/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div className="text-yellow-200 text-sm">
              <strong>Important Notice:</strong> Please read these terms carefully before using S17 Trading platform. By
              accessing or using our services, you agree to be bound by these terms.
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>
              By accessing and using S17 Trading ("the Platform"), you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p>
              These Terms of Service ("Terms") govern your use of our website located at s17trading.com (the "Service")
              operated by S17 Trading Inc. ("us", "we", or "our").
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">2. Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>S17 Trading is a social trading platform that allows users to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Copy trades from experienced traders</li>
              <li>Share trading strategies and insights</li>
              <li>Access real-time market data and analysis</li>
              <li>Participate in community discussions</li>
              <li>Manage investment portfolios</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>
              To access certain features of the Service, you must register for an account. When you register, you agree
              to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5" />
              4. Risk Disclosure
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-200 font-medium mb-2">HIGH RISK WARNING:</p>
              <p className="text-red-200 text-sm">
                Trading involves substantial risk and may result in the loss of your invested capital. Past performance
                does not guarantee future results. You should not invest money that you cannot afford to lose.
              </p>
            </div>
            <p>By using our copy trading features, you acknowledge that:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All trading involves risk of loss</li>
              <li>Past performance is not indicative of future results</li>
              <li>You are responsible for your own investment decisions</li>
              <li>We do not provide investment advice</li>
              <li>You should seek independent financial advice if needed</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">5. Prohibited Uses</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>You may not use our Service:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>For any unlawful purpose or to solicit others to unlawful acts</li>
              <li>
                To violate any international, federal, provincial, or state regulations, rules, laws, or local
                ordinances
              </li>
              <li>
                To infringe upon or violate our intellectual property rights or the intellectual property rights of
                others
              </li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">6. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive
              property of S17 Trading Inc. and its licensors. The Service is protected by copyright, trademark, and
              other laws.
            </p>
            <p>
              Our trademarks and trade dress may not be used in connection with any product or service without our prior
              written consent.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">7. Termination</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice
              or liability, under our sole discretion, for any reason whatsoever and without limitation, including but
              not limited to a breach of the Terms.
            </p>
            <p>
              If you wish to terminate your account, you may simply discontinue using the Service and contact our
              support team for account closure.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">8. Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>
              The information on this website is provided on an "as is" basis. To the fullest extent permitted by law,
              this Company excludes all representations, warranties, conditions and terms.
            </p>
            <p>We do not warrant that the Service will be uninterrupted, timely, secure, or error-free.</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">9. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <div className="space-y-2">
              <p>Email: legal@s17trading.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Trading Street, Financial District, NY 10001</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
