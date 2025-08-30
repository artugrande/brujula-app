"use client"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HomePage() {
  const router = useRouter()

  const handleLaunchApp = () => {
    router.push("/app")
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/social_artugrande_quiero_un_video_full_screen_apaisado_de_un_griego__8d0bf867-4832-4bd9-8e70-7c71cd992e21_2-CLEPAdVzaXeUjuvwdxtElnLxI2lTGl.mp4" type="video/mp4" />
      </video>

      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black z-10" />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          {/* Logo */}
          <div className="mb-8">
            <Image src="/logo.png" alt="Brújula Logo" width={120} height={120} className="mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">BRÚJULA</h1>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-md font-light">
            Your compass for a balanced life
          </p>

          {/* Launch Button */}
          <Button
            onClick={handleLaunchApp}
            className="bg-gradient-to-r from-[#01D9AA] to-[#09ABE0] hover:shadow-lg hover:shadow-[#01D9AA]/25 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
          >
            <Compass className="w-5 h-5 mr-2" />
            Launch App
          </Button>
        </div>

        {/* Footer */}
        <div className="pb-6">
          <Footer />
        </div>
      </div>
    </div>
  )
}
