import React from 'react';
import EmployeeCardView from '../../components/EmployeeList/EmployeeCardView';
const EmployeeListCardView = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-semibold">Company Employees</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
        <EmployeeCardView />
      </div>
    </div>
  );
};

export default EmployeeListCardView;
