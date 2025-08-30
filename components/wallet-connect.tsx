"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, LogOut } from "lucide-react"
import { motion } from "framer-motion"

interface WalletConnectProps {
  onConnect: (address: string) => void
  connectedAddress?: string
  onDisconnect: () => void
}

export function WalletConnect({ onConnect, connectedAddress, onDisconnect }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        if (accounts.length > 0) {
          onConnect(accounts[0])
        }
      } else {
        alert("Por favor instala MetaMask u otra wallet compatible")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      alert("Error conectando la wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (connectedAddress) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="shadow-lg rounded-xl bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-[#01D9AA]" />
                <span className="font-medium text-white">{formatAddress(connectedAddress)}</span>
              </div>
              <Button
                onClick={onDisconnect}
                variant="outline"
                size="sm"
                className="text-red-500 hover:text-red-600 bg-transparent border-red-500/20"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0D1117] flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md shadow-lg rounded-xl bg-[#161B22] border-[#30363D]">
        <CardHeader className="text-center">
          <div className="mb-4">
            <img src="/logo.png" alt="Brújula Logo" className="w-16 h-16 mx-auto mb-2" />
            <h2 className="text-lg font-bold text-[#01D9AA]">BRÚJULA</h2>
          </div>
          <CardTitle className="text-2xl font-bold text-balance text-white">Conecta tu Wallet</CardTitle>
          <p className="text-white">Conecta tu wallet para acceder a Brújula</p>
        </CardHeader>
        <CardContent className="p-6">
          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full gradient-button text-white py-6 text-lg font-semibold rounded-xl shadow-lg"
          >
            <Wallet className="h-5 w-5 mr-2" />
            {isConnecting ? "Conectando..." : "Conectar Wallet"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
