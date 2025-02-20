"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-GB", { hour12: false });
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
        <span className="bg-green-500 text-white px-3 py-1 rounded-md">
          {formattedTime}
        </span>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Header;
