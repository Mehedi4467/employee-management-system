import EmployeeCardView from "@/components/EmployeeList/EmployeeCardView";
import React, { Suspense } from "react";
const EmployeeListCardView = () => {
  return (
    <main className="flex-1 p-0 md:p-3 dark:bg-[#111827] overflow-auto md:ml-64">
      <Suspense>
        <EmployeeCardView />
      </Suspense>
    </main>
  );
};

export default EmployeeListCardView;
