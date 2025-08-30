"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, Wallet } from "lucide-react"
import { donate } from "@/lib/brujulaClient"
import { SuccessModal } from "./success-modal"

interface ManualDonationModalProps {
  isOpen: boolean
  onClose: () => void
  currentUserAddress: string
}

export function ManualDonationModal({ isOpen, onClose, currentUserAddress }: ManualDonationModalProps) {
  const [recipientAddress, setRecipientAddress] = useState("")
  const [amount, setAmount] = useState("0.001")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDonate = async () => {
    if (!recipientAddress.trim() || !amount || Number.parseFloat(amount) <= 0) return

    // Validate Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(recipientAddress.trim())) {
      alert("Por favor ingresa una dirección de wallet válida")
      return
    }

    setIsLoading(true)
    try {
      console.log("[v0] Manual donation to:", recipientAddress.trim(), "amount:", amount)
      const hash = await donate(recipientAddress.trim(), Number.parseFloat(amount))
      console.log("[v0] Manual donation successful, hash:", hash)

      setShowSuccess(true)
      setRecipientAddress("")
      setAmount("0.001")
      onClose()
    } catch (error) {
      console.error("Error in manual donation:", error)
      alert("Error al enviar la donación. Verifica tu wallet y conexión.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatAddress = (address: string) => {
    if (address.length < 10) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-[#01D9AA]" />
              Donar a Wallet Específica
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient" className="text-sm font-medium">
                Dirección del destinatario
              </Label>
              <Input
                id="recipient"
                type="text"
                placeholder="0x..."
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">Ingresa la dirección completa de la wallet</p>
            </div>

            <div>
              <Label htmlFor="amount" className="text-sm font-medium">
                Cantidad en ETH
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.001"
                min="0.001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
            </div>

            {recipientAddress.trim() && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Donando a:</p>
                <p className="font-mono text-sm">{formatAddress(recipientAddress.trim())}</p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent" disabled={isLoading}>
                Cancelar
              </Button>
              <Button
                onClick={handleDonate}
                disabled={!recipientAddress.trim() || !amount || Number.parseFloat(amount) <= 0 || isLoading}
                className="flex-1 bg-gradient-to-r from-[#09ABE0] to-[#01D9AA] hover:from-[#0899D0] hover:to-[#01C299] text-white"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Enviando..." : "Donar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="¡Donación Exitosa!"
        message="Tu donación ha sido enviada correctamente"
      />
    </>
  )
}
