"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Brain, Apple, Smartphone, Plus, ExternalLink, CheckCircle } from "lucide-react"
import { registerHabits } from "@/lib/brujulaClient"

interface HabitRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  userAddress: string
  onHabitRegistered: (habits?: string[]) => void
}

const habitTypes = [
  {
    id: "fitness",
    name: "Fitness",
    icon: Activity,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "Walk 10,000 steps a day, home calisthenics routine, practice a team sport",
  },
  {
    id: "mente",
    name: "Mind",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "Read 30 minutes a day, daily meditation routine",
  },
  {
    id: "nutricion",
    name: "Nutrition",
    icon: Apple,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "Prioritize high-protein meals and reduce ultra-processed, high-sugar foods",
  },
  {
    id: "saludDigital",
    name: "Digital Health",
    icon: Smartphone,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Avoid doomscrolling, spend less than 2 hrs watching reels or TikToks",
  },
]

export function HabitRegistrationModal({
  isOpen,
  onClose,
  userAddress,
  onHabitRegistered,
}: HabitRegistrationModalProps) {
  const [selectedHabits, setSelectedHabits] = useState<string[]>([])
  const [isRegistering, setIsRegistering] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] = useState(false)
  const [transactionHash, setTransactionHash] = useState("")
  const [registeredHabitNames, setRegisteredHabitNames] = useState<string[]>([])
  const [streak, setStreak] = useState(1) // This should come from props or context

  const toggleHabit = (habitId: string) => {
    setSelectedHabits((prev) => (prev.includes(habitId) ? prev.filter((id) => id !== habitId) : [...prev, habitId]))
  }

  const handleRegisterHabits = async () => {
    if (selectedHabits.length === 0) {
      alert("Select at least one habit")
      return
    }

    setIsRegistering(true)
    try {
      console.log("[v0] Registering habits on blockchain:", selectedHabits, "for address:", userAddress)

      const hash = await registerHabits(selectedHabits)
      console.log("[v0] Habits registered successfully, transaction hash:", hash)

      const habitNames = selectedHabits.map((id) => {
        const habit = habitTypes.find((h) => h.id === id)
        return habit?.name || id
      })
      setRegisteredHabitNames(habitNames)

      setTransactionHash(hash)
      onClose()
      setShowSuccessModal(true)
      onHabitRegistered(habitNames)
      setSelectedHabits([])
    } catch (error) {
      console.error("Error registering habits:", error)
      const errorMessage = error instanceof Error ? error.message : String(error)

      if (errorMessage.includes("Ya hiciste check-in hoy") || errorMessage.includes("already did check-in today")) {
        onClose()
        setShowAlreadyRegisteredModal(true)
      } else {
        alert("Error registering habits on blockchain. Please check your wallet and try again.")
      }
    } finally {
      setIsRegistering(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccessModal(false)
    onClose()
  }

  const handleAlreadyRegisteredClose = () => {
    setShowAlreadyRegisteredModal(false)
  }

  const handleShareOnX = () => {
    const habitsList = registeredHabitNames.map((habit) => `✔️ ${habit}`).join("\n")

    const tweetText = `Today I completed my ${streak}-day streak on #Brújula 🧭

${habitsList}

Support my routines by donating to: ${userAddress} 💸

Find your north in the age of distraction: https://v0-brujula.vercel.app/`

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(twitterUrl, "_blank")
    handleSuccessClose()
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#161B22] border-[#30363D] text-white max-w-md mx-auto max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between text-white">
                  <span className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-[#01D9AA]" />📝 Register Habits
                  </span>
                </DialogTitle>
              </DialogHeader>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="text-sm text-gray-400 text-center">
                  Select the habits you want to track on the blockchain
                </p>

                <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-2">
                  {habitTypes.map((habit) => {
                    const Icon = habit.icon
                    const isSelected = selectedHabits.includes(habit.id)

                    return (
                      <motion.div key={habit.id} whileTap={{ scale: 0.98 }}>
                        <Card
                          className={`cursor-pointer transition-all duration-200 bg-[#21262D] border-[#30363D] hover:border-[#01D9AA]/50 ${
                            isSelected ? "border-[#01D9AA] bg-[#01D9AA]/5" : ""
                          }`}
                          onClick={() => toggleHabit(habit.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${habit.bgColor}`}>
                                <Icon className={`h-4 w-4 ${habit.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-white text-sm">{habit.name}</h3>
                                <p className="text-xs text-gray-400 line-clamp-2">{habit.description}</p>
                              </div>
                              {isSelected && <Badge className="bg-[#01D9AA] text-white text-xs">✓</Badge>}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>

                {selectedHabits.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-center"
                  >
                    <p className="text-sm text-gray-400">
                      {selectedHabits.length} habit{selectedHabits.length !== 1 ? "s" : ""} selected
                    </p>
                    <p className="text-xs text-orange-400 mt-1">⚠️ This will require a transaction in your wallet</p>
                  </motion.div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="flex-1 bg-transparent border-[#30363D] text-gray-300 hover:bg-[#21262D] hover:text-white"
                    disabled={isRegistering}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleRegisterHabits}
                    disabled={selectedHabits.length === 0 || isRegistering}
                    className="flex-1 gradient-button text-white font-semibold"
                  >
                    {isRegistering ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Registering...
                      </div>
                    ) : (
                      "Register on Blockchain"
                    )}
                  </Button>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessModal && (
          <Dialog open={showSuccessModal} onOpenChange={handleSuccessClose}>
            <DialogContent className="bg-[#161B22] border-[#30363D] text-white max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-4"
              >
                <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400">Congratulations!</h3>
                  <p className="text-sm text-gray-400 mt-2">You registered your habits successfully!</p>
                  <p className="text-sm text-blue-400 mt-2 font-medium">Now share on X</p>
                  <p className="text-xs text-gray-500 mt-2 font-mono bg-[#21262D] p-2 rounded border border-[#30363D]">
                    Tx: {transactionHash.slice(0, 20)}...
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleSuccessClose}
                    variant="outline"
                    className="flex-1 bg-transparent border-[#30363D] text-gray-300 hover:bg-[#21262D] hover:text-white"
                  >
                    Continue
                  </Button>
                  <Button onClick={handleShareOnX} className="flex-1 gradient-button text-white font-semibold">
                    <img src="/x-logo.svg" alt="X" className="w-4 h-4 mr-2" />
                    Share on X
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAlreadyRegisteredModal && (
          <Dialog open={showAlreadyRegisteredModal} onOpenChange={handleAlreadyRegisteredClose}>
            <DialogContent className="bg-[#161B22] border-[#30363D] text-white max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-4"
              >
                <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400">Already Registered!</h3>
                  <p className="text-sm text-gray-400 mt-2">You already registered your habits today</p>
                  <p className="text-sm text-gray-300 mt-3">Come back tomorrow to register new habits! 🌟</p>
                </div>
                <Button
                  onClick={handleAlreadyRegisteredClose}
                  className="w-full gradient-button text-white font-semibold"
                >
                  Got it!
                </Button>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
