"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 shadow-lg transition-all"
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="w-7 h-7 bg-white dark:bg-[#111827] rounded-full shadow-md"
        animate={{ x: theme === "light" ? 0 : 32 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <span className="absolute left-2 text-gray-700 dark:text-white">☀️</span>
      <span className="absolute right-2 text-gray-200 dark:text-yellow-400">
        🌙
      </span>
    </motion.button>
  );
}
