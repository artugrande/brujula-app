export const translations = {
  es: {
    // Navigation & General
    profile: "Perfil",
    connect: "Conectar Wallet",
    disconnect: "Desconectar",
    register: "Registrar",
    cancel: "Cancelar",
    close: "Cerrar",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",

    // Profile
    streak: "Racha",
    days: "días",
    totalDonationsReceived: "Total Donaciones Recibidas",
    habitStatistics: "Estadísticas de Hábitos",
    registerHabits: "Registrar Hábitos",
    viewRankings: "Ver Rankings",
    donateToSpecificWallet: "Donar a Wallet Específica",

    // Habits
    mind: "Mente",
    nutrition: "Nutrición",
    fitness: "Fitness",
    digitalHealth: "Salud Digital",
    dayCompleting: "día cumpliendo",
    daysCompleting: "días cumpliendo",

    // Registration
    registerUser: "Registrar Usuario",
    enterNickname: "Ingresa tu nickname",
    nickname: "Nickname",
    pleaseRegister: "Por favor regístrate para usar la aplicación",

    // Habit Registration
    selectHabits: "Selecciona los hábitos que cumpliste hoy",
    registerHabitsButton: "Registrar Hábitos",
    habitRegistered: "¡Hábito registrado exitosamente!",

    // Rankings
    rankings: "Rankings",
    moreDaysCompleting: "Más Días Cumpliendo",
    moreDonations: "Más Donaciones",
    donate: "Donar",

    // Donations
    donateToUser: "Donar a",
    amountInETH: "Cantidad en ETH",
    donationSuccessful: "¡Donación exitosa!",
    donationSent: "Tu donación ha sido enviada correctamente",
    enterWalletAddress: "Ingresa la dirección de wallet",
    walletAddress: "Dirección de Wallet",

    // Wallet
    walletCopied: "¡Wallet copiada al portapapeles!",
    connectWallet: "Conectar Wallet",
    connectToMetaMask: "Conectar a MetaMask",
    installMetaMask: "Instalar MetaMask",
    pleaseInstallMetaMask: "Por favor instala MetaMask para continuar",

    // Errors
    contractNotAvailable: "Contrato no disponible",
    contractFunctionsNotImplemented: "Las funciones del smart contract no están implementadas o no son accesibles",
    couldNotLoadContractData:
      "No se pudieron cargar los datos del contrato. Verifica que las funciones estén implementadas.",
  },
  en: {
    // Navigation & General
    profile: "Profile",
    connect: "Connect Wallet",
    disconnect: "Disconnect",
    register: "Register",
    cancel: "Cancel",
    close: "Close",
    loading: "Loading...",
    error: "Error",
    success: "Success",

    // Profile
    streak: "Streak",
    days: "days",
    totalDonationsReceived: "Total Donations Received",
    habitStatistics: "Habit Statistics",
    registerHabits: "Register Habits",
    viewRankings: "View Rankings",
    donateToSpecificWallet: "Donate to Specific Wallet",

    // Habits
    mind: "Mind",
    nutrition: "Nutrition",
    fitness: "Fitness",
    digitalHealth: "Digital Health",
    dayCompleting: "day completing",
    daysCompleting: "days completing",

    // Registration
    registerUser: "Register User",
    enterNickname: "Enter your nickname",
    nickname: "Nickname",
    pleaseRegister: "Please register to use the application",

    // Habit Registration
    selectHabits: "Select the habits you completed today",
    registerHabitsButton: "Register Habits",
    habitRegistered: "Habit registered successfully!",

    // Rankings
    rankings: "Rankings",
    moreDaysCompleting: "More Days Completing",
    moreDonations: "More Donations",
    donate: "Donate",

    // Donations
    donateToUser: "Donate to",
    amountInETH: "Amount in ETH",
    donationSuccessful: "Donation successful!",
    donationSent: "Your donation has been sent successfully",
    enterWalletAddress: "Enter wallet address",
    walletAddress: "Wallet Address",

    // Wallet
    walletCopied: "Wallet copied to clipboard!",
    connectWallet: "Connect Wallet",
    connectToMetaMask: "Connect to MetaMask",
    installMetaMask: "Install MetaMask",
    pleaseInstallMetaMask: "Please install MetaMask to continue",

    // Errors
    contractNotAvailable: "Contract not available",
    contractFunctionsNotImplemented: "Smart contract functions are not implemented or not accessible",
    couldNotLoadContractData: "Could not load contract data. Verify that functions are implemented.",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.es
