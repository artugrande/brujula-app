"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Heart } from "lucide-react"
import { donate } from "@/lib/brujulaClient"
import { useToast } from "@/hooks/use-toast"

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  userAddress: string
  nickname: string
}

export function DonationModal({ isOpen, onClose, userAddress, nickname }: DonationModalProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleDonate = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Por favor ingresa un monto válido",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await donate(userAddress, Number.parseFloat(amount))
      toast({
        title: "✅ Donación enviada con éxito",
        description: `Has donado ${amount} ETH a ${nickname}`,
      })
      onClose()
      setAmount("")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar la donación. Verifica tu wallet.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="w-full max-w-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Enviar Donación
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Donando a: <span className="font-semibold">{nickname}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Monto en ETH</label>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleDonate}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#01D9AA] to-[#09ABE0] hover:from-[#01C299] hover:to-[#0899D0] text-white"
                >
                  {isLoading ? "Enviando..." : "Enviar Donación"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
