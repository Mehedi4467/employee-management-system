import React, { Suspense } from 'react';
import EmployeeCardView from '../../components/EmployeeList/EmployeeCardView';
const EmployeeListCardView = () => {
  return (
    <main className="flex-1 p-6 dark:bg-[#111827] overflow-auto ml-64">
      <Suspense>
        <EmployeeCardView />
      </Suspense>
    </main>
  );
};

export default EmployeeListCardView;
