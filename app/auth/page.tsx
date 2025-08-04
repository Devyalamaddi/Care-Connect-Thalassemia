"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [selectedRole, setSelectedRole] = useState<"patient" | "donor" | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    bloodType: "",
    location: "",
  })

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const roleParam = searchParams.get("role")
    if (roleParam === "patient" || roleParam === "donor") {
      setSelectedRole(roleParam)
      setIsLogin(false) // Show registration form when coming from role selection
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: Implement actual authentication
    // This is a hackathon prototype - real auth would be implemented here

    // Simulate successful auth and redirect based on role
    if (selectedRole === "patient") {
      router.push("/patient/dashboard")
    } else if (selectedRole === "donor") {
      router.push("/donor/dashboard")
    }
  }

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                Care Connect
              </span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isLogin ? "Welcome Back" : "Join Our Community"}
            </CardTitle>
            <p className="text-gray-600">
              {isLogin ? "Sign in to your account" : "Create your account to get started"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Role Selection (only for registration) */}
            {!isLogin && !selectedRole && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 text-center">Choose Your Role</h3>
                <div className="grid grid-cols-1 gap-4">
                  <Button
                    variant="outline"
                    className="h-16 border-2 border-teal-200 hover:border-teal-400 hover:bg-teal-50 bg-transparent"
                    onClick={() => setSelectedRole("patient")}
                  >
                    <div className="flex items-center space-x-3">
                      <Heart className="w-6 h-6 text-teal-600" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-800">Thalassemia Warrior</div>
                        <div className="text-sm text-gray-600">I need blood support</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-16 border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50 bg-transparent"
                    onClick={() => setSelectedRole("donor")}
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-pink-600" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-800">Compassionate Donor</div>
                        <div className="text-sm text-gray-600">I want to help others</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            )}

            {/* Selected Role Display */}
            {selectedRole && (
              <div className="text-center p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  {selectedRole === "patient" ? (
                    <Heart className="w-5 h-5 text-teal-600" />
                  ) : (
                    <Users className="w-5 h-5 text-pink-600" />
                  )}
                  <span className="font-semibold text-gray-800">
                    {selectedRole === "patient" ? "Thalassemia Warrior" : "Compassionate Donor"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-xs text-gray-600"
                  onClick={() => setSelectedRole(null)}
                >
                  Change Role
                </Button>
              </div>
            )}

            {/* Auth Form */}
            {(isLogin || selectedRole) && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                  />
                </div>

                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                      <select
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.bloodType}
                        onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                      >
                        <option value="">Select your blood type</option>
                        {bloodTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Enter your city"
                      />
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>
            )}

            {/* Toggle Auth Mode */}
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setSelectedRole(null)
                }}
                className="text-teal-600 hover:text-teal-700"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hackathon Compliance */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Original hackathon solution - Authentication is simulated for demo purposes
        </div>
      </div>
    </div>
  )
}
