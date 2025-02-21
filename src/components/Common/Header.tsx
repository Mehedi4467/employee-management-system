"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ThemeToggle from "../ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [time, setTime] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: true }));

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center px-6 justify-between dark:bg-[#1f2937] dark:shadow-lg bg-white relative">
      <div className="flex items-center">
        <button
          className="text-2xl mr-4 text-[#3899db] lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>

        <Image
          src="/logo.png"
          alt="User Avatar"
          width={70}
          height={70}
          className="rounded-full"
        />
        <span className="text-xl font-bold hidden lg:block">EMS</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden lg:block">
          {time ? (
            <div
              className=" px-4 py-2 rounded-lg bg-opacity-30 backdrop-blur-md transition-all 
      bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border dark:border-gray-600 text-sm sm:text-lg"
            >
              <span className="font-mono font-semibold tracking-widest">
                {time}
              </span>
            </div>
          ) : (
            <div
              className="px-4 py-2 rounded-lg bg-opacity-30 backdrop-blur-md transition-all 
      bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:border dark:border-gray-600 text-sm sm:text-lg"
            >
              <span className="font-mono font-semibold tracking-widest">
                Loading...
              </span>
            </div>
          )}
        </div>

        <ThemeToggle />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 bg-white rounded-full shadow-md transition-all hover:shadow-lg"
          >
            <Image
              src="/image/mehedi_hassan.jpg"
              alt="Profile"
              width={20}
              height={20}
              className="w-12 h-12 p-2 border border-[#d1d5db] rounded-full"
            />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <ul className="text-gray-800 dark:text-white">
                  <li className="px-4 py-3 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all">
                    <FaUserCircle className="text-[#3899db]" />
                    <span>Profile</span>
                  </li>
                  <li className="px-4 py-3 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all">
                    <FaCog className="text-[#3899db]" />
                    <span>Settings</span>
                  </li>
                  <li className="px-4 py-3 flex items-center space-x-2 hover:bg-red-100 dark:hover:bg-red-600 cursor-pointer transition-all text-red-500 dark:text-red-400">
                    <FaSignOutAlt className="text-red-500 dark:text-red-400" />
                    <span>Logout</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Header;
