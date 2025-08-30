"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, Wallet } from "lucide-react"
import { donate } from "@/lib/brujulaClient"
import { SuccessModal } from "./success-modal"
import { useLanguage } from "@/hooks/use-language"

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
  const { t } = useLanguage()

  const handleDonate = async () => {
    if (!recipientAddress.trim() || !amount || Number.parseFloat(amount) <= 0) return

    // Validate Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(recipientAddress.trim())) {
      alert(t("enterWalletAddress"))
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
      alert(t("error"))
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
              {t.donateToSpecificWallet}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient" className="text-sm font-medium">
                {t("walletAddress")}
              </Label>
              <Input
                id="recipient"
                type="text"
                placeholder="0x..."
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">{t("enterWalletAddress")}</p>
            </div>

            <div>
              <Label htmlFor="amount" className="text-sm font-medium">
                {t("amount_in_eth")}
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
                <p className="text-sm text-muted-foreground">{t("donate_to")}:</p>
                <p className="font-mono text-sm">{formatAddress(recipientAddress.trim())}</p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent" disabled={isLoading}>
                {t("cancel")}
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
                {isLoading ? t("loading") : t("donate")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={t("donation_successful")}
        message={t("your_donation_has_been_sent_successfully")}
      />
    </>
  )
}
