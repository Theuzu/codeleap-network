"use client";

import { useTheme } from "next-themes";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { Sun, Moon, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { clearUsername } = useUserStore();
  const router = useRouter();

  function handleLogout() {
    clearUsername();
    router.replace("/");
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className="w-full bg-primary h-16 flex items-center justify-between px-8">
      <span className="text-white bg-primary font-bold text-xl">
        CodeLeap Network
      </span>
      <div className="flex justify-around gap-4">
        <Button
          onClick={toggleTheme}
          className="bg-primary text-white hover:opacity-60 transition-opacity cursor-pointer"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </AnimatePresence>
        </Button>

        <Button
          onClick={handleLogout}
          className="bg-primary text-white hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </Button>
      </div>
    </div>
  );
}
