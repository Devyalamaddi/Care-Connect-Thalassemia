"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Pill, Apple, Activity, TrendingUp, CheckCircle, AlertCircle, Clock } from "lucide-react"

export default function WellnessInsightsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // TODO: Fetch real wellness data
  const mockData = {
    medicationAdherence: 85,
    nutritionScore: 78,
    activityLevel: 65,
    overallWellness: 76,
    upcomingMedications: [
      { name: "Deferasirox", time: "8:00 AM", taken: false, id: 1 },
      { name: "Folic Acid", time: "2:00 PM", taken: true, id: 2 },
      { name: "Vitamin D", time: "8:00 PM", taken: false, id: 3 },
    ],
    nutritionTips: [
      "Include iron-rich foods like spinach and lentils",
      "Avoid tea/coffee with meals to improve iron absorption",
      "Stay hydrated with 8-10 glasses of water daily",
      "Include vitamin C sources to enhance iron absorption",
    ],
    recentCheckups: [
      { type: "Ferritin Level", value: "1,200 ng/mL", status: "needs_attention", date: "2024-01-10" },
      { type: "Hemoglobin", value: "9.2 g/dL", status: "stable", date: "2024-01-10" },
      { type: "Liver Function", value: "Normal", status: "good", date: "2024-01-05" },
      { type: "Heart Function", value: "Normal", status: "good", date: "2024-01-05" },
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

  const markMedicationTaken = (id: number) => {
    // TODO: Update medication status in backend
    alert("Medication marked as taken!")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Wellness Insights</h1>
        <p className="text-gray-600">
          Personalized health tracking with AI-powered insights for nutrition, medication adherence, and care
          optimization
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8 overflow-x-auto">
        <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200 min-w-max">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 sm:w-5 h-4 sm:h-5 text-teal-600" />
                    <span className="font-medium text-gray-700 text-sm sm:text-base">Overall</span>
                  </div>
                  <Badge className="bg-teal-100 text-teal-800 text-xs">{mockData.overallWellness}%</Badge>
                </div>
                <Progress value={mockData.overallWellness} className="h-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Pill className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
                    <span className="font-medium text-gray-700 text-sm sm:text-base">Medication</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">{mockData.medicationAdherence}%</Badge>
                </div>
                <Progress value={mockData.medicationAdherence} className="h-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Apple className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                    <span className="font-medium text-gray-700 text-sm sm:text-base">Nutrition</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">{mockData.nutritionScore}%</Badge>
                </div>
                <Progress value={mockData.nutritionScore} className="h-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600" />
                    <span className="font-medium text-gray-700 text-sm sm:text-base">Activity</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 text-xs">{mockData.activityLevel}%</Badge>
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
                {mockData.upcomingMedications.map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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
                      className={
                        med.taken ? "border-green-600 text-green-600" : "bg-teal-600 text-white hover:bg-teal-700"
                      }
                      onClick={() => !med.taken && markMedicationTaken(med.id)}
                      disabled={med.taken}
                    >
                      {med.taken ? "Taken" : "Mark Taken"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Medication History */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Medication Adherence Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">This Week</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={85} className="w-20 h-2" />
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Last Week</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={80} className="w-20 h-2" />
                    <span className="text-sm font-medium">80%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">This Month</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={82} className="w-20 h-2" />
                    <span className="text-sm font-medium">82%</span>
                  </div>
                </div>
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

          {/* Nutrition Goals */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Daily Nutrition Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Water Intake</span>
                    <span className="text-sm text-gray-600">6/8 glasses</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Iron-Rich Foods</span>
                    <span className="text-sm text-gray-600">2/3 servings</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Vitamin C Sources</span>
                    <span className="text-sm text-gray-600">3/3 servings</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
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

          {/* Upcoming Appointments */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-800">Hematologist Consultation</div>
                      <div className="text-sm text-gray-600">January 20, 2024 at 10:00 AM</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => alert("Appointment reminder set!")}
                  >
                    Set Reminder
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-800">Blood Work</div>
                      <div className="text-sm text-gray-600">January 25, 2024 at 8:00 AM</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => alert("Appointment reminder set!")}
                  >
                    Set Reminder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
