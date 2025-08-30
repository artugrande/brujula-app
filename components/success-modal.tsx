"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  emoji?: string
}

export function SuccessModal({ isOpen, onClose, title, message, emoji = "🎉" }: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Create confetti effect
      const createConfetti = () => {
        const confetti = document.createElement("div")
        confetti.innerHTML = "🎊"
        confetti.style.position = "fixed"
        confetti.style.left = Math.random() * 100 + "vw"
        confetti.style.top = "-10px"
        confetti.style.fontSize = "20px"
        confetti.style.zIndex = "9999"
        confetti.style.pointerEvents = "none"
        confetti.style.animation = "confetti-fall 3s linear forwards"

        document.body.appendChild(confetti)

        setTimeout(() => {
          confetti.remove()
        }, 3000)
      }

      // Add confetti animation CSS
      const style = document.createElement("style")
      style.textContent = `
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)

      // Create multiple confetti pieces
      for (let i = 0; i < 20; i++) {
        setTimeout(() => createConfetti(), i * 100)
      }

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <div className="text-center py-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mb-4"
          >
            <div className="text-6xl mb-4">🤝</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-bold text-green-600 mb-2">{title}</h2>
            <p className="text-muted-foreground mb-6">{message}</p>

            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-[#01D9AA] to-[#09ABE0] hover:from-[#01C299] hover:to-[#0899D0] text-white"
            >
              ¡Genial!
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
