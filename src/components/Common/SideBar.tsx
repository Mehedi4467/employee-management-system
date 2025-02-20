import Image from "next/image";
import React from "react";

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
          <p className="text-gray-400 text-sm">Your Apps</p>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:text-black dark:hover:bg-gray-200">
              ⏳<span>Timer</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:text-black dark:hover:bg-gray-200">
              📁<span>Projects</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:text-black dark:hover:bg-gray-200">
              📄<span>Reports</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Your Company</p>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:text-black dark:hover:bg-gray-200">
              👥<span>Employees</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:text-black dark:hover:bg-gray-200">
              💰<span>Payroll</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:text-black dark:hover:bg-gray-200">
              🧑‍💼<span>Applicant Tracking</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:text-black dark:hover:bg-gray-200">
              🤝<span>Clients</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:text-black dark:hover:bg-gray-200">
              🧾<span>Invoice</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:text-black dark:hover:bg-gray-200">
              📅<span>Events</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:text-black dark:hover:bg-gray-200">
              ⚙️<span>Settings</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Support</p>
          <ul>
            <li className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:text-black dark:hover:bg-gray-200">
              📖<span>Knowledge Base</span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
