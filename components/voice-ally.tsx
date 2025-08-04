"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, MessageCircle, Volume2, Languages, Sparkles } from "lucide-react"
import { gsap } from "gsap"

export function VoiceAlly() {
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm your Voice Ally. How can I help you today? You can ask about your medication schedule, transfusion prep, or any Thalassemia questions.",
      timestamp: new Date(),
    },
  ])
  const [currentLanguage, setCurrentLanguage] = useState("English")
  const micButtonRef = useRef<HTMLButtonElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  // TODO: Integrate with speech recognition API
  // const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
  // recognition.onresult = (event) => handleSpeechResult(event)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReducedMotion && isListening && micButtonRef.current) {
      gsap.to(micButtonRef.current, {
        scale: 1.1,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    } else if (micButtonRef.current) {
      gsap.killTweensOf(micButtonRef.current)
      gsap.set(micButtonRef.current, { scale: 1 })
    }
  }, [isListening])

  const toggleListening = () => {
    setIsListening(!isListening)
    // TODO: Start/stop speech recognition
    // if (!isListening) {
    //   recognition.start()
    // } else {
    //   recognition.stop()
    // }
  }

  const sendMessage = (content: string, type: "user" | "ai" = "user") => {
    const newMessage = {
      id: messages.length + 1,
      type,
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])

    // TODO: Send to AI backend
    // fetch('/api/voice-ally/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: content, language: currentLanguage })
    // }).then(res => res.json()).then(response => {
    //   setMessages(prev => [...prev, {
    //     id: prev.length + 1,
    //     type: 'ai',
    //     content: response.message,
    //     timestamp: new Date()
    //   }])
    // })

    // Mock AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "ai" as const,
        content:
          "I understand you need help. Let me provide you with the information you need. Would you like me to check your medication schedule or help with transfusion preparation?",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const quickActions = [
    { label: "Medication Reminder", action: () => sendMessage("Set medication reminder") },
    { label: "Transfusion Prep", action: () => sendMessage("Help with transfusion preparation") },
    { label: "Find Donors", action: () => sendMessage("Find nearby donors") },
    { label: "Emergency Help", action: () => sendMessage("I need emergency assistance") },
  ]

  const languages = ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi"]

  return (
    <section id="voice" className="section-reveal py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Voice Ally
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your 24/7 AI companion providing instant support through voice commands and chat. Multilingual, empathetic,
            and always ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Voice Interface */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span>Voice Interface</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Voice Button */}
                <div className="text-center">
                  <Button
                    ref={micButtonRef}
                    size="lg"
                    className={`w-24 h-24 rounded-full ${
                      isListening
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    } text-white shadow-lg`}
                    onClick={toggleListening}
                    aria-label={isListening ? "Stop listening" : "Start listening"}
                  >
                    {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </Button>
                  <p className="mt-4 text-sm text-gray-600">
                    {isListening ? "Listening... Speak now" : "Tap to start voice command"}
                  </p>
                </div>

                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Languages className="w-4 h-4 inline mr-1" />
                    Language
                  </label>
                  <select
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick Actions */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                        onClick={action.action}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Voice Features */}
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-2">Voice Features</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-purple-600" />
                      <span>Text-to-speech responses</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Languages className="w-4 h-4 text-purple-600" />
                      <span>Multi-language support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span>Context-aware AI</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-teal-600" />
                    <span>Chat with Voice Ally</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Chat Messages */}
                <div ref={chatRef} className="h-96 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === "user" ? "bg-teal-600 text-white" : "bg-white text-gray-800 shadow-sm border"
                        } chat-bubble`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.type === "user" ? "text-teal-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message or use voice command..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        sendMessage(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button className="bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800">
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Conversations</h3>
              <p className="text-sm text-gray-600">
                Context-aware responses that understand your medical history and current needs
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Languages className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Multilingual Support</h3>
              <p className="text-sm text-gray-600">
                Communicate in your preferred language with accurate medical translations
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">24/7 Availability</h3>
              <p className="text-sm text-gray-600">
                Always ready to help with instant responses and emergency guidance
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
