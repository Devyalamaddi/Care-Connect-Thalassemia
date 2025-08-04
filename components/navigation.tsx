"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, Users, MessageCircle, Activity, AlertTriangle } from "lucide-react"
import { gsap } from "gsap"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReducedMotion) {
      gsap.to(".nav-morph", {
        scale: isScrolled ? 0.95 : 1,
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.8)",
        backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [isScrolled])

  const navItems = [
    { name: "LifeLine Requests", icon: Heart, href: "#lifeline" },
    { name: "Samarthan Circle", icon: Users, href: "#samarthan" },
    { name: "Voice Ally", icon: MessageCircle, href: "#voice" },
    { name: "Wellness Insights", icon: Activity, href: "#wellness" },
    { name: "Emergency Beacon", icon: AlertTriangle, href: "#emergency" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="nav-morph mx-4 mt-4 rounded-2xl border border-white/20 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                Care Connect
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors duration-200 group"
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium">{item.name}</span>
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white">
                Join Network
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-700 hover:text-teal-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                ))}
                <div className="pt-4 space-y-2">
                  <Button variant="ghost" className="w-full text-teal-600">
                    Sign In
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white">Join Network</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
