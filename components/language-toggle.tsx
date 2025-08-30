"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Languages } from "lucide-react"
import { usePathname } from "next/navigation"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname()

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  if (pathname === "/") {
    return null
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-[#161B22] border-gray-700 text-white hover:bg-[#21262D] hover:shadow-lg transition-all duration-200"
    >
      <Languages className="h-4 w-4 mr-2" />
      {language.toUpperCase()}
    </Button>
  )
}
