"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: true }));

    updateTime(); // Set initial time after mount
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="flex items-center justify-between dark:bg-[#1f2937] dark:shadow-lg bg-white px-2">
      <div className="flex items-center">
        <button className="text-2xl mr-4">☰</button>
        <Image
          src="/logo.png"
          alt="User Avatar"
          width={70}
          height={70}
          className="rounded-full"
        />
        <span className=" text-xl font-bold">EMS</span>
      </div>
      <div className="flex items-center space-x-4">
        {time ? (
          <span className="bg-green-500 text-white px-3 py-1 rounded-md">
            {time}
          </span>
        ) : (
          <span className="bg-gray-400 text-white px-3 py-1 rounded-md">
            Loading...
          </span>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Header;
