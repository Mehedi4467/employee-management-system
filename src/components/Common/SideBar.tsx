import Image from "next/image";
import React from "react";
import { FaTasks, FaTable, FaClock, FaFolder, FaFileAlt, FaMoneyBillWave, FaUserTie, FaHandshake, FaFileInvoice, FaCalendarAlt, FaCog, FaBook } from "react-icons/fa";

const SideBar = () => {
  return (
    <>
      <div className="flex items-center space-x-2 mb-6">
        <Image
          src="/image/mehedi_hassan.jpg"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h2 className="text-md font-semibold">Ethan Antonio</h2>
          <p className="text-sm text-gray-500">Centrovo</p>
        </div>
      </div>
      <nav className="space-y-4">
        <div>
          <p className="text-gray-400 text-sm">My Task</p>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <FaTasks className="text-[#3899db] text-lg" /> <span>Employee List</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <FaTable className="text-[#3899db] text-lg" /> <span>Employee Table</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Coming Soon</p>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-not-allowed">
              <FaClock className="text-[#3899db] text-lg" /> <span>Timer</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <FaFolder className="text-[#3899db] text-lg" /> <span>Projects</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <FaFileAlt className="text-[#3899db] text-lg" /> <span>Reports</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <FaMoneyBillWave className="text-[#3899db] text-lg" /> <span>Payroll</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <FaUserTie className="text-[#3899db] text-lg" /> <span>Applicant Tracking</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <FaHandshake className="text-[#3899db] text-lg" /> <span>Clients</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <FaFileInvoice className="text-[#3899db] text-lg" /> <span>Invoice</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <FaCalendarAlt className="text-[#3899db] text-lg" /> <span>Events</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <FaCog className="text-[#3899db] text-lg" /> <span>Settings</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Support</p>
          <ul>
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <FaBook className="text-[#3899db] text-lg" /> <span>Knowledge Base</span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
