"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Pill, Apple, Activity, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"

export function WellnessInsights() {
  const [activeTab, setActiveTab] = useState("overview")

  // TODO: fetch(`/api/wellness/insights?patientId=${user.id}`)
  //       .then(res => res.json())
  //       .then(setWellnessData)

  const mockData = {
    medicationAdherence: 85,
    nutritionScore: 78,
    activityLevel: 65,
    overallWellness: 76,
    upcomingMedications: [
      { name: "Deferasirox", time: "8:00 AM", taken: false },
      { name: "Folic Acid", time: "2:00 PM", taken: true },
      { name: "Vitamin D", time: "8:00 PM", taken: false },
    ],
    nutritionTips: [
      "Include iron-rich foods like spinach and lentils",
      "Avoid tea/coffee with meals to improve iron absorption",
      "Stay hydrated with 8-10 glasses of water daily",
    ],
    recentCheckups: [
      { type: "Ferritin Level", value: "1,200 ng/mL", status: "needs_attention", date: "2024-01-10" },
      { type: "Hemoglobin", value: "9.2 g/dL", status: "stable", date: "2024-01-10" },
      { type: "Liver Function", value: "Normal", status: "good", date: "2024-01-05" },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-100 text-green-800 border-green-200"
      case "stable":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "needs_attention":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "medications", label: "Medications", icon: Pill },
    { id: "nutrition", label: "Nutrition", icon: Apple },
    { id: "checkups", label: "Check-ups", icon: Calendar },
  ]

  return (
    <section id="wellness" className="section-reveal py-20 px-6 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Wellness Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized health tracking with AI-powered insights for nutrition, medication adherence, and
            post-treatment care optimization.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200 overflow-x-auto">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id ? "bg-teal-600 text-white shadow-md" : "text-gray-600 hover:text-teal-600"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Wellness Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-teal-600" />
                      <span className="font-medium text-gray-700">Overall</span>
                    </div>
                    <Badge className="bg-teal-100 text-teal-800">{mockData.overallWellness}%</Badge>
                  </div>
                  <Progress value={mockData.overallWellness} className="h-2" />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Pill className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-700">Medication</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">{mockData.medicationAdherence}%</Badge>
                  </div>
                  <Progress value={mockData.medicationAdherence} className="h-2" />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Apple className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-700">Nutrition</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{mockData.nutritionScore}%</Badge>
                  </div>
                  <Progress value={mockData.nutritionScore} className="h-2" />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-700">Activity</span>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">{mockData.activityLevel}%</Badge>
                  </div>
                  <Progress value={mockData.activityLevel} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card className="bg-gradient-to-r from-teal-50 to-green-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-teal-600" />
                  <span>AI Health Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">This Week's Progress</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Medication adherence improved by 5%</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Iron levels showing positive trend</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        <span>Consider increasing vitamin C intake</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Recommendations</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Schedule ferritin level check next week</li>
                      <li>• Maintain current chelation therapy schedule</li>
                      <li>• Add 30 minutes of light exercise daily</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "medications" && (
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Today's Medication Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.upcomingMedications.map((med, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${med.taken ? "bg-green-500" : "bg-orange-500"}`} />
                        <div>
                          <div className="font-medium text-gray-800">{med.name}</div>
                          <div className="text-sm text-gray-600">{med.time}</div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={med.taken ? "outline" : "default"}
                        className={med.taken ? "border-green-600 text-green-600" : "bg-teal-600 text-white"}
                      >
                        {med.taken ? "Taken" : "Mark Taken"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "nutrition" && (
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Personalized Nutrition Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.nutritionTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                      <Apple className="w-5 h-5 text-green-600 mt-0.5" />
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "checkups" && (
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Check-up Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentCheckups.map((checkup, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-teal-600" />
                        <div>
                          <div className="font-medium text-gray-800">{checkup.type}</div>
                          <div className="text-sm text-gray-600">{checkup.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-800">{checkup.value}</div>
                        <Badge className={`text-xs ${getStatusColor(checkup.status)}`}>
                          {checkup.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
