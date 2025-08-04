import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { FloatingSOSButton } from "@/components/floating-sos-button"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Care Connect - Join the LifeLine Network",
  description:
    "AI-powered Thalassemia support platform connecting warriors and donors through predictive care, voice assistance, and compassionate community support.",
  keywords: "Thalassemia, blood donation, AI healthcare, patient support, donor matching",
  authors: [{ name: "Care Connect Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#0f766e",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Care Connect" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Care Connect" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0f766e" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Preload Critical Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                      console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}

        {/* Persistent Floating Components - Available on all pages */}
        <FloatingChatbot />
        <FloatingSOSButton />
        <PWAInstallPrompt />

        {/* Hackathon Compliance Notice */}
        {/* <div className="fixed bottom-2 left-2 z-30 hidden sm:block">
          <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-70">
            Original Hackathon Solution 2024
          </div>
        </div> */}
      </body>
    </html>
  )
}
