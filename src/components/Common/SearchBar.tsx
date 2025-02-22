"use client";
import React, { useState } from "react";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: (date: string) => void;
}
import { FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isDateOpen, setIsDateOpen] = useState(false);
  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="flex flex-col md:flex-row items-center  justify-between gap-3 bg-white dark:bg-gray-800  ">
      <div className="relative w-full  flex">
        <input
          type="text"
          placeholder="Search by name, phone or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 truncate pr-32 py-2 border rounded-lg dark:bg-gray-700 outline-none dark:text-white dark:border-gray-600 "
        />

        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-300"
          >
            <FiX size={18} />
          </button>
        )}

        <button
          type="submit"
          onClick={() => onSearch(searchQuery)}
          className="absolute right-1 top-[3px] bg-[#399bce] hover:bg-[#318bb0] text-white px-4 py-1.5 rounded-lg shadow flex items-center gap-2"
        >
          <FiSearch size={18} />
          Search
        </button>
      </div>

      <div className="relative w-full flex items-center gap-2">
        <div className="relative  w-full">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: isDateOpen ? 0 : -10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-y-0 left-4 flex items-center pointer-events-none"
          >
            <FiCalendar className="text-gray-500 dark:text-gray-300" />
            {/* <p className="text-gray-400 md:hidden  ml-2">Select Date</p> */}
          </motion.div>

          <button
            type="submit"
            className="absolute inset-0 w-full h-full bg-transparent"
            onClick={() => {
              setIsDateOpen(true);
              (
                document.getElementById("datePicker") as HTMLInputElement
              )?.showPicker();
            }}
          ></button>

          <input
            type="date"
            id="datePicker"
            value={selectedDate}
            onFocus={() => setIsDateOpen(true)}
            onBlur={() => setIsDateOpen(false)}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              if (!e.target.value) {
                onFilter(e.target.value);
              }
            }}
            className="px-10 bg-white py-[10px] md:py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 w-full cursor-pointer"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          onClick={() => onFilter(selectedDate)}
          className="flex items-center gap-2 bg-[#399bce] hover:bg-[#318bb0] text-white px-4 py-2 rounded-lg shadow transition-all duration-300"
        >
          <FiFilter size={18} />
          Filter
        </motion.button>
      </div>
    </div>
  );
};

export default SearchBar;
