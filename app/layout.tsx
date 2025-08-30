import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { LanguageProvider } from "@/hooks/use-language"
import { LanguageToggle } from "@/components/language-toggle"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Brújula Perfil",
  description: "App Brújula para tracking de hábitos",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} dark`}>
      <body className="font-sans min-h-screen bg-[#0D1117] text-white">
        <LanguageProvider>
          <LanguageToggle />
          <Suspense fallback={null}>
            {children}
            <Toaster />
          </Suspense>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
