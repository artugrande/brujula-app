"use client"

import { useState, useEffect } from "react"
import { UserProfilePage } from "@/components/user-profile-page"
import { WalletConnect } from "@/components/wallet-connect"

export default function AppPage() {
  const [connectedAddress, setConnectedAddress] = useState<string>("")

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          })
          if (accounts.length > 0) {
            setConnectedAddress(accounts[0])
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
        }
      }
    }

    checkWalletConnection()
  }, [])

  const handleConnect = (address: string) => {
    setConnectedAddress(address)
  }

  const handleDisconnect = () => {
    setConnectedAddress("")
  }

  if (!connectedAddress) {
    return (
      <WalletConnect onConnect={handleConnect} connectedAddress={connectedAddress} onDisconnect={handleDisconnect} />
    )
  }

  return <UserProfilePage userAddress={connectedAddress} />
}
