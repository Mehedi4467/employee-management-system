import React, { Suspense } from 'react';
import EmployeeTableView from '../../components/EmployeeList/EmployeeTableView';
const EmployeeLIstTableView = () => {
  return (
    <main className="flex-1 p-0 md:p-3 dark:bg-[#111827] overflow-auto md:ml-64">
      <Suspense>
        <EmployeeTableView />
      </Suspense>
    </main>
  );
};

export default EmployeeLIstTableView;
