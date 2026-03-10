'use client'

import { useTheme } from 'next-themes'
import { useUserStore } from '@/store/user'
import { useRouter } from 'next/navigation'
import { Sun, Moon, LogOut } from 'lucide-react'

export function Header() {
  const { theme, setTheme } = useTheme()
  const { clearUsername } = useUserStore()
  const router = useRouter()

  function handleLogout() {
    clearUsername()
    router.replace('/')
  }

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="w-full bg-[#7695EC] h-16 flex items-center px-8 fixed top-0 left-0 right-0 z-10">
      <span className="text-white font-bold text-xl flex-1">CodeLeap Network</span>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-white hover:opacity-70 transition-opacity"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          onClick={handleLogout}
          className="text-white hover:opacity-70 transition-opacity"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  )
}