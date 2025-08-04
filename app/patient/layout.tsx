import type React from "react"
import { PatientNavigation } from "@/components/patient-navigation"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-white">
      <PatientNavigation />
      <main className="pt-20">{children}</main>
    </div>
  )
}
