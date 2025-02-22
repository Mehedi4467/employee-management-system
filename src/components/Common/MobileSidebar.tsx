'use client';

import { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { FiMenu, FiX } from 'react-icons/fi';

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="submit"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#399bcf] text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-800 p-4 z-50 border-r h-screen shadow-md transform transition-all duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
          >
            <FiX size={24} />
          </button>
          <SideBar setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
}
