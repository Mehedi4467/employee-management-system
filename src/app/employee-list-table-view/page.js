import React from "react";
import EmployeeTableView from "../../components/EmployeeList/EmployeeTableView"
const EmployeeLIstTableView = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-semibold">Company Employees</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
        <EmployeeTableView />
      </div>
    </div>
  );
};

export default EmployeeLIstTableView;
