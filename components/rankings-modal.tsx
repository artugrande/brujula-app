"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Wallet, Send, Trophy, Medal, Award } from "lucide-react"
import { getAllUsers, donate } from "@/lib/brujulaClient"
import { SuccessModal } from "./success-modal"

interface RankingsModalProps {
  isOpen: boolean
  onClose: () => void
  currentUserAddress: string
}

interface UserRanking {
  address: string
  nickname: string
  streak: number
  donations: number
  totalHabits: number
}

export function RankingsModal({ isOpen, onClose, currentUserAddress }: RankingsModalProps) {
  const [users, setUsers] = useState<UserRanking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserRanking | null>(null)
  const [donationAmount, setDonationAmount] = useState("")
  const [isDonating, setIsDonating] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const loadRankings = async () => {
    setIsLoading(true)
    try {
      console.log("[v0] Loading user rankings...")
      const allUsers = await getAllUsers()
      setUsers(allUsers)
      console.log("[v0] Loaded rankings:", allUsers)
    } catch (error) {
      console.error("Error loading rankings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      loadRankings()
    }
  }, [isOpen])

  const handleDonate = async () => {
    if (!selectedUser || !donationAmount) return

    setIsDonating(true)
    try {
      console.log("[v0] Donating", donationAmount, "ETH to", selectedUser.address)
      const hash = await donate(selectedUser.address, Number.parseFloat(donationAmount))
      console.log("[v0] Donation successful, hash:", hash)

      setShowSuccessModal(true)

      await loadRankings()
      setSelectedUser(null)
      setDonationAmount("")
    } catch (error) {
      console.error("Error sending donation:", error)
    } finally {
      setIsDonating(false)
    }
  }

  const handleDonateClick = (user: UserRanking) => {
    setSelectedUser(user)
    onClose() // Close the rankings modal
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />
    if (index === 2) return <Award className="h-5 w-5 text-amber-600" />
    return <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
  }

  const habitRankings = [...users].sort((a, b) => b.streak - a.streak)
  const donationRankings = [...users].sort((a, b) => b.donations - a.donations)

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">Rankings de Usuarios</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="habits" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="habits" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Más Días Cumpliendo
              </TabsTrigger>
              <TabsTrigger value="donations" className="flex items-center gap-2">
                <img src="/eth-logo.png" alt="ETH" className="w-4 h-4" />
                Más Donaciones
              </TabsTrigger>
            </TabsList>

            <div className="max-h-[400px] overflow-y-auto mt-4">
              <TabsContent value="habits" className="space-y-3">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#01D9AA]"></div>
                  </div>
                ) : (
                  habitRankings.map((user, index) => (
                    <Card key={user.address} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getRankIcon(index)}
                            <div>
                              <p className="font-semibold text-white">{user.nickname}</p>
                              <Badge variant="secondary" className="text-xs bg-[#21262D] text-white border-[#30363D]">
                                <Wallet className="h-3 w-3 mr-1" />
                                {formatAddress(user.address)}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-[#01D9AA]">{user.streak}</p>
                            <p className="text-xs text-white">días</p>
                          </div>
                          {user.address !== currentUserAddress && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDonateClick(user)}
                              className="ml-2 flex items-center gap-1"
                            >
                              <img src="/eth-logo.png" alt="ETH" className="w-3 h-3" />
                              <span className="text-xs">Donar</span>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="donations" className="space-y-3">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#01D9AA]"></div>
                  </div>
                ) : (
                  donationRankings.map((user, index) => (
                    <Card key={user.address} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getRankIcon(index)}
                            <div>
                              <p className="font-semibold text-white">{user.nickname}</p>
                              <Badge variant="secondary" className="text-xs bg-[#21262D] text-white border-[#30363D]">
                                <Wallet className="h-3 w-3 mr-1" />
                                {formatAddress(user.address)}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold" style={{ color: "#63d6ad" }}>
                              {user.donations.toFixed(4)} ETH
                            </p>
                            <p className="text-xs text-white">recibido</p>
                          </div>
                          {user.address !== currentUserAddress && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDonateClick(user)}
                              className="ml-2 flex items-center gap-1"
                            >
                              <img src="/eth-logo.png" alt="ETH" className="w-3 h-3" />
                              <span className="text-xs">Donar</span>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {selectedUser && (
          <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-center">Donar a {selectedUser.nickname}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="text-center p-3 rounded-lg bg-[#21262D] border border-[#30363D]">
                  <Badge variant="secondary" className="bg-[#30363D] text-gray-300 border-[#30363D]">
                    <Wallet className="h-3 w-3 mr-1" />
                    {formatAddress(selectedUser.address)}
                  </Badge>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Cantidad en ETH</label>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0.001"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedUser(null)} className="flex-1">
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleDonate}
                    disabled={!donationAmount || isDonating}
                    className="flex-1 bg-gradient-to-r from-[#01D9AA] to-[#09ABE0] hover:from-[#01C299] hover:to-[#0899D0] text-white"
                  >
                    {isDonating ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Donar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="¡Donación Exitosa!"
        message="Tu donación ha sido enviada correctamente"
        emoji="🤝"
      />
    </>
  )
}
