"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { TrendingUp, Wallet, Calendar, Plus, Users, AlertCircle, UserPlus } from "lucide-react"
import { HabitChart } from "./habit-chart"
import { DonationModal } from "./donation-modal"
import { HabitRegistrationModal } from "./habit-registration-modal"
import { RankingsModal } from "./rankings-modal"
import { ManualDonationModal } from "./manual-donation-modal"
import { EducationalResources } from "./educational-resources"
import { getUser, getStreak, getUserDonations, getUserCheckIns, registerUser } from "@/lib/brujulaClient"
import { useLanguage } from "@/hooks/use-language"
import { Footer } from "./footer"
import { ShareOnXModal } from "./share-on-x-modal"

interface UserProfilePageProps {
  userAddress: string
}

export function UserProfilePage({ userAddress }: UserProfilePageProps) {
  const { t } = useLanguage()

  const [userData, setUserData] = useState<{
    nickname: string | null
    streak: number | null
    donations: number | null
    habits: { fitness: number; mente: number; nutricion: number; saludDigital: number } | null
  }>({
    nickname: null,
    streak: null,
    donations: null,
    habits: null,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false)
  const [isRankingsModalOpen, setIsRankingsModalOpen] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const [nickname, setNickname] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [isManualDonationModalOpen, setIsManualDonationModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [lastRegisteredHabits, setLastRegisteredHabits] = useState<string[]>([])

  const loadUserData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Loading real user data for address:", userAddress)

      const [nickname, streak, donations, habits] = await Promise.all([
        getUser(userAddress),
        getStreak(userAddress),
        getUserDonations(userAddress),
        getUserCheckIns(userAddress),
      ])

      if (!nickname || nickname === "" || nickname === "Unknown") {
        console.log("[v0] User not registered, showing registration form")
        setShowRegistration(true)
      } else {
        setShowRegistration(false)
      }

      setUserData({
        nickname,
        streak,
        donations,
        habits,
      })

      console.log("[v0] Loaded real user data successfully")
    } catch (error) {
      console.error("Error loading user data:", error)
      setError(t("couldNotLoadContractData"))
      setUserData({
        nickname: null,
        streak: null,
        donations: null,
        habits: null,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterUser = async () => {
    if (!nickname.trim()) return

    setIsRegistering(true)
    try {
      console.log("[v0] Registering user with nickname:", nickname)
      const hash = await registerUser(nickname.trim())
      console.log("[v0] User registration successful, hash:", hash)

      setTimeout(() => {
        loadUserData()
      }, 3000)

      setNickname("")
    } catch (error) {
      console.error("Error registering user:", error)
      setShowRegistration(false)
    } finally {
      setIsRegistering(false)
    }
  }

  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(userAddress)
      const originalText = document.querySelector("[data-wallet-badge]")?.textContent
      const badge = document.querySelector("[data-wallet-badge]")
      if (badge) {
        badge.textContent = t("walletCopied")
        setTimeout(() => {
          badge.textContent = originalText
        }, 2000)
      }
    } catch (error) {
      console.error("Error copying to clipboard:", error)
    }
  }

  const handleHabitRegistered = (habits?: string[]) => {
    if (habits) {
      setLastRegisteredHabits(habits)
      setIsShareModalOpen(true)
    }
    loadUserData()
  }

  useEffect(() => {
    if (userAddress) {
      loadUserData()
    }
  }, [userAddress])

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#01D9AA]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0D1117] p-4">
        <div className="max-w-md mx-auto space-y-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Alert className="border-red-500/20 bg-red-500/10 text-white">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                <strong>{t("error")}:</strong> {error}
              </AlertDescription>
            </Alert>
          </motion.div>

          <div className="text-center py-6">
            <h1 className="text-3xl font-bold text-balance mb-4 text-white">{t("contractNotAvailable")}</h1>
            <p className="text-gray-400 mb-6">{t("contractFunctionsNotImplemented")}</p>
            <Button onClick={loadUserData} className="gradient-button text-white font-semibold px-6 py-2 rounded-lg">
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (showRegistration) {
    return (
      <div className="min-h-screen bg-[#0D1117] p-4">
        <div className="max-w-md mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-6"
          >
            <img src="/logo.png" alt="Brújula Logo" className="w-16 h-16 mx-auto mb-2" />
            <h2 className="text-lg font-bold text-[#01D9AA] mb-4">BRÚJULA</h2>
            <h1 className="text-3xl font-bold text-balance mb-4 text-white">¡Bienvenido a Brújula!</h1>
            <p className="text-gray-400">{t("pleaseRegister")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="shadow-lg rounded-xl bg-[#161B22] border-[#30363D]">
              <CardContent className="p-6 space-y-4">
                <div className="text-center mb-4">
                  <UserPlus className="h-12 w-12 mx-auto mb-2 text-[#01D9AA]" />
                  <h2 className="text-xl font-bold text-white">{t("registerUser")}</h2>
                  <Badge variant="secondary" className="mt-2 bg-[#21262D] text-gray-300 border-[#30363D]">
                    <Wallet className="h-3 w-3 mr-1" />
                    {formatAddress(userAddress)}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-300">{t("nickname")}</label>
                    <Input
                      type="text"
                      placeholder={t("enterNickname")}
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      maxLength={20}
                      className="bg-[#21262D] border-[#30363D] text-white placeholder-gray-500"
                    />
                  </div>

                  <Button
                    onClick={handleRegisterUser}
                    disabled={!nickname.trim() || isRegistering}
                    className="w-full gradient-button text-white py-3 font-semibold"
                  >
                    {isRegistering ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    ) : (
                      <UserPlus className="h-4 w-4 mr-2" />
                    )}
                    {isRegistering ? "Registrando..." : t("register")}
                  </Button>

                  <Button
                    onClick={() => setShowRegistration(false)}
                    variant="outline"
                    className="w-full border-[#30363D] text-gray-300 hover:bg-[#21262D]"
                  >
                    Continuar sin registrar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D1117] p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-6"
        >
          <img src="/logo.png" alt="Brújula Logo" className="w-12 h-12 mx-auto mb-2" />
          <h2 className="text-sm font-bold text-[#01D9AA] mb-4">BRÚJULA</h2>
         
        </motion.div>

        {/* Basic Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-lg rounded-xl bg-[#161B22] border-[#30363D]">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2 text-white">
                  {userData.nickname || formatAddress(userAddress)}
                </h2>
                <Badge
                  variant="secondary"
                  className="mb-4 cursor-pointer hover:bg-[#21262D] transition-colors bg-[#21262D] text-gray-300 border-[#30363D]"
                  onClick={copyWalletAddress}
                  data-wallet-badge
                >
                  <Wallet className="h-3 w-3 mr-1" />
                  {formatAddress(userAddress)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-[#21262D] rounded-lg border border-[#30363D]">
                  <Calendar className="h-5 w-5 mx-auto mb-1 text-[#01D9AA]" />
                  <p className="text-2xl font-bold text-white">{userData.streak || 0}</p>
                  <p className="text-sm text-white">
                    {t("streak")} ({t("days")})
                  </p>
                </div>
                <div className="text-center p-3 bg-[#21262D] rounded-lg border border-[#30363D]">
                  <img src="/eth-logo.png" alt="ETH" className="w-5 h-5 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">{userData.donations?.toFixed(4) || "0.0000"} ETH</p>
                  <p className="text-sm text-white">{t("totalDonationsReceived")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Habits Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-lg rounded-xl bg-[#161B22] border-[#30363D]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#01D9AA]" />
                  {t("habitStatistics")}
                </div>
                <Button
                  onClick={() => setIsHabitModalOpen(true)}
                  size="sm"
                  variant="outline"
                  className="text-[#01D9AA] border-[#01D9AA] hover:bg-[#01D9AA] hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {t("register")}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userData.habits ? (
                <HabitChart data={userData.habits} />
              ) : (
                <div className="text-center py-8 text-white">
                  <p>No hay datos de hábitos registrados</p>
                  <p className="text-sm">Registra tus primeros hábitos para ver las estadísticas</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3"
        >
          <Button
            onClick={() => setIsHabitModalOpen(true)}
            className="w-full gradient-button text-white py-6 text-lg font-semibold rounded-xl shadow-lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            {t("registerHabits")}
          </Button>

          <Button
            onClick={() => setIsRankingsModalOpen(true)}
            className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] hover:from-[#7C3AED] hover:to-[#9333EA] text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
          >
            <Users className="h-5 w-5 mr-2" />
            {t("viewRankings")}
          </Button>

          <Button
            onClick={() => setIsManualDonationModalOpen(true)}
            variant="outline"
            className="w-full border-[#01D9AA] text-[#01D9AA] hover:bg-[#01D9AA] hover:text-white py-4 text-base font-semibold rounded-xl bg-transparent"
          >
            <Wallet className="h-4 w-4 mr-2" />
            {t("donateToSpecificWallet")}
          </Button>
        </motion.div>

        {/* Educational Resources Section */}
        <EducationalResources />

        {/* Footer */}
        <Footer />
      </div>

      {/* Modals */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        userAddress={userAddress}
        nickname={userData.nickname || formatAddress(userAddress)}
      />

      <HabitRegistrationModal
        isOpen={isHabitModalOpen}
        onClose={() => setIsHabitModalOpen(false)}
        userAddress={userAddress}
        onHabitRegistered={handleHabitRegistered}
      />

      <RankingsModal
        isOpen={isRankingsModalOpen}
        onClose={() => setIsRankingsModalOpen(false)}
        currentUserAddress={userAddress}
      />

      <ManualDonationModal
        isOpen={isManualDonationModalOpen}
        onClose={() => setIsManualDonationModalOpen(false)}
        currentUserAddress={userAddress}
      />

      <ShareOnXModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        streak={userData.streak || 0}
        userAddress={userAddress}
        registeredHabits={lastRegisteredHabits}
      />
    </div>
  )
}
