import EmployeeCardView from "@/components/EmployeeList/EmployeeCardView";
// import EmployeeTableView from "@/components/EmployeeList/EmployeeTableView";
import React from "react";

export default function Home() {
  return (
    <main>
      <div>
        <div>
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl font-semibold">Company Employees</h1>
          </div>

          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
            {/* <EmployeeTableView /> */}
            <EmployeeCardView/>
          </div>
        </div>
      </div>
    </main>
  );
}
