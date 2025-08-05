"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Globe,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    contact: "support@s17trading.com",
    available: "24/7",
    color: "text-blue-400",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team instantly",
    contact: "Available in app",
    available: "24/7",
    color: "text-[#10B981]",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our experts",
    contact: "+1 (555) 123-4567",
    available: "Mon-Fri 9AM-6PM EST",
    color: "text-purple-400",
  },
  {
    icon: Headphones,
    title: "Premium Support",
    description: "Priority support for premium users",
    contact: "premium@s17trading.com",
    available: "24/7 Priority",
    color: "text-orange-400",
  },
]

const offices = [
  {
    city: "New York",
    address: "123 Wall Street, Suite 500",
    zipCode: "New York, NY 10005",
    phone: "+1 (555) 123-4567",
    email: "ny@s17trading.com",
  },
  {
    city: "London",
    address: "45 Canary Wharf",
    zipCode: "London E14 5AB, UK",
    phone: "+44 20 7123 4567",
    email: "london@s17trading.com",
  },
  {
    city: "Singapore",
    address: "1 Marina Bay Financial Centre",
    zipCode: "Singapore 018989",
    phone: "+65 6123 4567",
    email: "singapore@s17trading.com",
  },
]

const faqs = [
  {
    question: "How do I get started with S17 Trading?",
    answer:
      "Simply sign up for a free account, complete the verification process, and you can start exploring our platform. No minimum deposit required to get started.",
  },
  {
    question: "Is my money safe with S17 Trading?",
    answer:
      "Yes, we use bank-level security, segregated accounts, and are regulated by top-tier financial authorities. Your funds are protected by investor compensation schemes.",
  },
  {
    question: "What are the fees for using the platform?",
    answer:
      "We offer transparent pricing with no hidden fees. Basic features are free, and premium features start from $9.99/month. No commission on copy trading.",
  },
  {
    question: "Can I withdraw my money anytime?",
    answer:
      "Yes, you can withdraw your funds at any time. Most withdrawals are processed within 24 hours, depending on your payment method.",
  },
]

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitStatus("success")
    setIsSubmitting(false)

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "", type: "general" })
      setSubmitStatus("idle")
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1D2939] via-[#111827] to-[#0F172A]">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/10 to-blue-500/10 blur-3xl opacity-30" />

        <div className="relative max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30 px-4 py-2">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Us
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Get in Touch with
            <span className="bg-gradient-to-r from-[#10B981] to-blue-400 bg-clip-text text-transparent"> Our Team</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Have questions? Need support? Want to partner with us? We're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How Can We Help?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the best way to reach us. Our team is available 24/7 to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <Card
                key={method.title}
                className="bg-[#111827]/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm group"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-gray-800/50 ${method.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <method.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                  <p className="text-white font-medium mb-2">{method.contact}</p>
                  <Badge className="bg-[#10B981]/20 text-[#10B981] text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {method.available}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-[#111827]/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <Send className="h-6 w-6 text-[#10B981]" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-800/50 border-gray-700 text-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-800/50 border-gray-700 text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="type" className="text-white">
                      Inquiry Type
                    </Label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="press">Press & Media</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-white">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="bg-gray-800/50 border-gray-700 text-white"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {submitStatus === "success" && (
                    <div className="flex items-center gap-2 text-[#10B981] bg-[#10B981]/10 p-3 rounded-lg">
                      <CheckCircle className="h-5 w-5" />
                      <span>Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <span>Failed to send message. Please try again.</span>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Globe className="h-6 w-6 text-[#10B981]" />
                  Our Global Offices
                </h3>

                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <Card key={office.city} className="bg-[#111827]/50 border-gray-800 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold text-white mb-3">{office.city}</h4>
                        <div className="space-y-2 text-gray-400">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-1 text-[#10B981]" />
                            <div>
                              <p>{office.address}</p>
                              <p>{office.zipCode}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-[#10B981]" />
                            <p>{office.phone}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-[#10B981]" />
                            <p>{office.email}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#111827]/30 to-[#1D2939]/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400">
              Quick answers to common questions. Can't find what you're looking for? Contact us directly.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-[#111827]/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
