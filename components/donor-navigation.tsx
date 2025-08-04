"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Home, Droplets, User, Menu, X, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DonorNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", icon: Home, href: "/donor/dashboard" },
    { name: "Blood Requests", icon: Droplets, href: "/donor/requests" },
    { name: "My Profile", icon: User, href: "/donor/profile" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/donor/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-red-400 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              Care Connect
            </span>
            <span className="text-sm bg-pink-100 text-pink-800 px-2 py-1 rounded-full">Donor</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  pathname === item.href
                    ? "bg-pink-100 text-pink-700"
                    : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm text-gray-600">Welcome, Rajesh</div>
            <Link href="/auth">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </Link>
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
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    pathname === item.href
                      ? "bg-pink-100 text-pink-700"
                      : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 px-3 py-2">Welcome, Rajesh</div>
                <Link href="/auth">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
