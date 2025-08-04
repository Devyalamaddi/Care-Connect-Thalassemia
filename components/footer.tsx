"use client"

import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const footerLinks = {
    platform: [
      { name: "LifeLine Requests", href: "#lifeline" },
      { name: "Samarthan Circle", href: "#samarthan" },
      { name: "Voice Ally", href: "#voice" },
      { name: "Wellness Insights", href: "#wellness" },
      { name: "Emergency Beacon", href: "#emergency" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Community Guidelines", href: "/guidelines" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Contact Support", href: "/contact" },
    ],
    resources: [
      { name: "Thalassemia Guide", href: "/guide" },
      { name: "Donor Resources", href: "/donors" },
      { name: "Medical Partners", href: "/partners" },
      { name: "Research & Data", href: "/research" },
      { name: "Success Stories", href: "/stories" },
    ],
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Care Connect
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering Thalassemia warriors through AI-powered community support, predictive care, and compassionate
              connections that save lives.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>support@careconnect.health</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-teal-400" />
                <span>+91 1800-CARE-CONNECT</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-teal-800/50 to-blue-800/50 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest updates on platform features, community stories, and Thalassemia care insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2024 Care Connect. All rights reserved. Built with ❤️ for the Thalassemia community.
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 bg-gray-700 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-8 p-4 bg-red-900/30 border border-red-700/50 rounded-lg">
          <div className="flex items-center space-x-2 text-red-300">
            <Heart className="w-5 h-5" />
            <span className="font-semibold">Emergency Notice:</span>
          </div>
          <p className="text-red-200 text-sm mt-2">
            In case of medical emergency, always contact your local emergency services first. Care Connect is a support
            platform and not a replacement for professional medical care.
          </p>
        </div>
      </div>
    </footer>
  )
}
