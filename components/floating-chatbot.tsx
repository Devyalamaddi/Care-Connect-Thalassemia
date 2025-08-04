"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Phone, Heart, AlertTriangle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your CareConnect AI assistant. I can help you with blood donation requests, emergency support, and health information. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Find blood donors near me",
        "Emergency blood request",
        "Check my donation history",
        "Health tips for donors",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(content.trim())
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()

    let response = ""
    let suggestions: string[] = []

    if (input.includes("emergency") || input.includes("urgent") || input.includes("help")) {
      response =
        "🚨 I understand this is urgent! For immediate emergency blood needs:\n\n1. Call our 24/7 helpline: +91 1800-BLOOD\n2. Use the Emergency Beacon in your dashboard\n3. I can help you find the nearest blood banks and donors\n\nWould you like me to activate emergency protocols?"
      suggestions = [
        "Activate emergency beacon",
        "Find nearest blood bank",
        "Call emergency helpline",
        "Notify my Samarthan Circle",
      ]
    } else if (input.includes("find") && (input.includes("donor") || input.includes("blood"))) {
      response =
        "I can help you find blood donors! Here's what I can do:\n\n🔍 Search by blood type and location\n📍 Show nearby registered donors\n⚡ Send instant notifications to your Samarthan Circle\n🏥 Connect with blood banks\n\nWhat blood type are you looking for?"
      suggestions = ["A+ donors near me", "O- universal donors", "B+ donors in Mumbai", "Search all blood types"]
    } else if (input.includes("donation") && input.includes("history")) {
      response =
        "📊 Your donation history:\n\n✅ Last donation: 15 days ago\n🩸 Total donations: 12 times\n🏆 Lives saved: ~36 people\n📅 Next eligible: 75 days\n\nYou're a true lifesaver! Would you like to see detailed statistics or schedule your next donation?"
      suggestions = ["View detailed stats", "Schedule next donation", "Share my achievements", "Find donation camps"]
    } else if (input.includes("health") || input.includes("tips")) {
      response =
        "🌟 Health tips for blood donors:\n\n💧 Stay hydrated (drink 2-3L water daily)\n🥗 Eat iron-rich foods (spinach, dates, pomegranate)\n😴 Get 7-8 hours of sleep\n🚫 Avoid alcohol 24hrs before donation\n🍎 Maintain healthy diet\n\nWould you like personalized health recommendations?"
      suggestions = [
        "Iron-rich food recipes",
        "Pre-donation checklist",
        "Post-donation care",
        "Fitness tips for donors",
      ]
    } else if (input.includes("blood bank") || input.includes("hospital")) {
      response =
        "🏥 I can help you find blood banks and hospitals:\n\n📍 Nearby blood banks with availability\n🩸 Real-time blood stock levels\n⏰ Operating hours and contact info\n🚗 Directions and distance\n\nWhich area are you looking for?"
      suggestions = [
        "Blood banks in Mumbai",
        "24/7 emergency hospitals",
        "Government blood banks",
        "Private blood banks",
      ]
    } else if (input.includes("register") || input.includes("join")) {
      response =
        "🎉 Welcome to CareConnect! To complete your registration:\n\n📝 Fill out your medical profile\n🩸 Specify your blood type\n📍 Set your location preferences\n📱 Enable notifications\n🔔 Join a Samarthan Circle\n\nShall I guide you through the registration process?"
      suggestions = [
        "Complete my profile",
        "Join Samarthan Circle",
        "Set notification preferences",
        "Find local community",
      ]
    } else {
      response =
        "I'm here to help with blood donation and emergency support! I can assist you with:\n\n🩸 Finding blood donors\n🚨 Emergency blood requests\n📊 Donation tracking\n🏥 Locating blood banks\n💡 Health tips and guidance\n\nWhat would you like to know more about?"
      suggestions = ["Find blood donors", "Emergency help", "My donation history", "Health tips"]
    }

    return {
      id: Date.now().toString(),
      type: "bot",
      content: response,
      timestamp: new Date(),
      suggestions,
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>

        {/* Notification badge */}
        {/* <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
          AI
        </div> */}
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-96 bg-white shadow-2xl border-0 transition-all duration-300 ${
          isMinimized ? "h-16" : "h-[500px]"
        }`}
      >
        {/* Header */}
        <CardHeader className="pb-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Bot className="w-5 h-5" />
              <span>CareConnect AI</span>
              <Badge className="bg-green-500 text-white text-xs">Online</Badge>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1 h-8 w-8"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 h-80">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] ${
                        message.type === "user"
                          ? "bg-teal-600 text-white rounded-l-lg rounded-tr-lg"
                          : "bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg"
                      } p-3`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === "bot" && <Bot className="w-4 h-4 mt-0.5 text-teal-600" />}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        {message.type === "user" && <User className="w-4 h-4 mt-0.5" />}
                      </div>

                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-7 bg-white/50 hover:bg-white border-gray-300"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-r-lg rounded-tl-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-teal-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50 rounded-b-lg">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                  className="flex-1 border-gray-300 focus:border-teal-500"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick actions */}
              <div className="flex space-x-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 bg-transparent"
                  onClick={() => handleSendMessage("Emergency help needed")}
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Emergency
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 bg-transparent"
                  onClick={() => handleSendMessage("Find donors near me")}
                >
                  <Heart className="w-3 h-3 mr-1" />
                  Find Donors
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 bg-transparent"
                  onClick={() => handleSendMessage("Call helpline")}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call Help
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
