"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Heart, Brain, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReducedMotion && containerRef.current) {
      // Hero title animation
      gsap.fromTo(
        ".hero-title span",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      )

      // Feature cards animation
      gsap.fromTo(
        ".feature-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.5,
        },
      )
    }
  }, [])

  const titleWords = "Join the LifeLine Network".split(" ")

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-pink-100 to-teal-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Navigation */}
          <nav className="absolute top-8 left-0 right-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                  Care Connect
                </span>
              </div>
              <div className="space-x-4">
                <Link href="/auth">
                  <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white">
                    Join Network
                  </Button>
                </Link>
              </div>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto pt-20">
            {/* Main Headline */}
            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {titleWords.map((word, index) => (
                <span key={index} className="inline-block mr-4">
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connecting Thalassemia warriors and donors in real time through AI-powered matching, predictive care, and
              compassionate community support.
            </p>

            {/* Role Selection CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/auth?role=patient">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Heart className="mr-2 w-5 h-5" />
                  I'm a Thalassemia Warrior
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <Link href="/auth?role=donor">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Users className="mr-2 w-5 h-5" />I Want to Donate
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">10,000+</div>
                <div className="text-gray-600">Lives Connected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
                <div className="text-gray-600">AI Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">98%</div>
                <div className="text-gray-600">Match Success</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              Revolutionary Care Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built during hackathon with cutting-edge AI technology for the Thalassemia community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card text-center p-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Prediction</h3>
              <p className="text-gray-600 text-sm">Forecasts transfusion needs 2-4 weeks ahead</p>
            </div>

            <div className="feature-card text-center p-6 bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600 text-sm">Connects compatible donors instantly</p>
            </div>

            <div className="feature-card text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Voice Assistant</h3>
              <p className="text-gray-600 text-sm">24/7 multilingual AI support</p>
            </div>

            <div className="feature-card text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emergency SOS</h3>
              <p className="text-gray-600 text-sm">One-click cascade emergency alerts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Care Connect</span>
          </div>
          <p className="text-gray-400 mb-4">Original hackathon solution built with ❤️ for the Thalassemia community</p>
          <p className="text-xs text-gray-500">© 2024 Care Connect Hackathon Team. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
