import React from "react";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 max-w-md text-center"
      >
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Welcome to my Employee Management Software!
        </p>
      </motion.div>
    </main>
  );
}
