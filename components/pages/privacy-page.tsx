"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Calendar, Eye, Lock, Database, UserCheck } from "lucide-react"

export function PrivacyPage() {
  const lastUpdated = "January 15, 2024"

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-[#10B981]" />
          Privacy Policy
        </h1>
        <p className="text-gray-400 flex items-center justify-center gap-2">
          <Calendar className="h-4 w-4" />
          Last updated: {lastUpdated}
        </p>
      </div>

      <Card className="bg-[#10B981]/10 border-[#10B981]/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-[#10B981] mt-0.5" />
            <div className="text-[#10B981] text-sm">
              <strong>Your Privacy Matters:</strong> We are committed to protecting your personal information and being
              transparent about how we collect, use, and share your data.
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="h-5 w-5" />
              1. Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <div>
              <h4 className="font-medium text-white mb-2">Personal Information</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Name, email address, and contact information</li>
                <li>Government-issued ID for verification purposes</li>
                <li>Financial information for payment processing</li>
                <li>Profile information and preferences</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Usage Information</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Trading activity and transaction history</li>
                <li>Platform usage patterns and preferences</li>
                <li>Device information and IP addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="h-5 w-5" />
              2. How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and maintain our trading platform services</li>
              <li>Process transactions and manage your account</li>
              <li>Verify your identity and prevent fraud</li>
              <li>Send you important updates and notifications</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Provide customer support and respond to inquiries</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">3. Information Sharing</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>We may share your information with:</p>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-white mb-1">Service Providers</h4>
                <p className="text-sm">Third-party companies that help us operate our platform and provide services.</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Regulatory Authorities</h4>
                <p className="text-sm">When required by law or to comply with regulatory requirements.</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Business Transfers</h4>
                <p className="text-sm">In connection with mergers, acquisitions, or sale of assets.</p>
              </div>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-200 text-sm">
                <strong>We never sell your personal information</strong> to third parties for marketing purposes.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="h-5 w-5" />
              4. Data Security
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>We implement industry-standard security measures to protect your information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>256-bit SSL encryption for data transmission</li>
              <li>Advanced firewall and intrusion detection systems</li>
              <li>Regular security audits and penetration testing</li>
              <li>Multi-factor authentication options</li>
              <li>Secure data centers with 24/7 monitoring</li>
              <li>Employee background checks and security training</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              5. Your Rights
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access and review your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Delete your account and associated data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request data portability</li>
              <li>Object to certain data processing activities</li>
            </ul>
            <p className="text-sm text-gray-400 mt-4">
              To exercise these rights, please contact us at privacy@s17trading.com
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">6. Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze platform usage and performance</li>
              <li>Provide personalized content and recommendations</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>
            <p className="text-sm text-gray-400">You can control cookie settings through your browser preferences.</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">7. Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>
              We retain your information for as long as necessary to provide our services and comply with legal
              obligations:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Account information: Until account closure + 7 years</li>
              <li>Transaction records: 7 years for regulatory compliance</li>
              <li>Marketing data: Until you opt-out or 3 years of inactivity</li>
              <li>Support communications: 3 years</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">8. International Transfers</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure
              appropriate safeguards are in place to protect your data during international transfers.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">9. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="space-y-2">
              <p>Email: privacy@s17trading.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Trading Street, Financial District, NY 10001</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
