"use client"

export function Footer() {
  return (
    <footer className="mt-12 py-6 text-center border-t border-[#30363D]">
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
        <span>Made by</span>
        <a
          href="https://v0.dev/user/artugrande"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#01D9AA] hover:text-[#09ABE0] transition-colors font-medium"
        >
          @artugrande
        </a>
        <span>with</span>
        <a
          href="https://v0.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-[#01D9AA] hover:text-[#09ABE0] transition-colors"
        >
          <img src="/v0-logo.svg" alt="v0" className="w-4 h-4" />
        </a>
        <span>from Salta 🇦🇷</span>
      </div>
    </footer>
  )
}
