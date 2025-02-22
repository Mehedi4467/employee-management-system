import React, { useState } from 'react';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: (date: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="flex flex-col md:flex-row items-center  justify-between gap-3 bg-white dark:bg-gray-800 p-4 ">
      <div className="relative w-full md:w-2/3 flex">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-32 py-2 border rounded-lg dark:bg-gray-700 outline-none dark:text-white dark:border-gray-600 "
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
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            if (!e.target.value) {
              onFilter(e.target.value);
            }
          }}
          className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none"
        />
        <button
          type="submit"
          onClick={() => onFilter(selectedDate)}
          className="flex items-center gap-2 bg-[#399bce] hover:bg-[#318bb0] text-white px-4 py-2 rounded-lg shadow"
        >
          <FiFilter size={18} />
          Filter
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
