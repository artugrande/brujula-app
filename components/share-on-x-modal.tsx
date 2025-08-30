"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface ShareOnXModalProps {
  isOpen: boolean
  onClose: () => void
  streak: number
  userAddress: string
  registeredHabits: string[]
}

export function ShareOnXModal({ isOpen, onClose, streak, userAddress, registeredHabits }: ShareOnXModalProps) {
  const { t } = useLanguage()

  const generateTweet = () => {
    const habitsList = registeredHabits.map((habit) => `✔️ ${habit}`).join("\n")

    const tweetText = `Today I completed my ${streak}-day streak on #Brújula 🧭

${habitsList}

Support my routines by donating to: ${userAddress} 💸

Find your north in the age of distraction: https://v0-brujula.vercel.app/`

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(twitterUrl, "_blank")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#161B22] border-[#30363D] text-white max-w-md">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-center">Share on X</h2>

          <div className="space-y-4">
            <div className="bg-[#21262D] p-4 rounded-lg border border-[#30363D]">
              <p className="text-sm text-gray-300 whitespace-pre-line">
                Today I completed my {streak}-day streak on #Brújula 🧭{"\n\n"}
                {registeredHabits.map((habit) => `✔️ ${habit}`).join("\n")}
                {"\n\n"}
                Support my routines by donating to: {userAddress} 💸{"\n\n"}
                Find your north in the age of distraction: https://v0-brujula.vercel.app/
              </p>
            </div>

            <Button onClick={generateTweet} className="w-full gradient-button text-white font-semibold py-3">
              <img src="/x-logo.svg" alt="X" className="w-4 h-4 mr-2" />
              Share on X
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
