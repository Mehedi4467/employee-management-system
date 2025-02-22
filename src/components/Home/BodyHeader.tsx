'use client';
import React, { useState } from 'react';
import Modal from '../Common/Modal';
import EmployeeForm from './AddEmployee/EmployeeForm';
interface Employee {
  _id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  profilePicture?: string;
}

interface EmployeeResponse {
  status: boolean;
  data: Employee[];
  totalPages: number;
  currentPage: number;
}
interface BodyHeaderProps {
  setProfileInfo: React.Dispatch<React.SetStateAction<EmployeeResponse | null>>;
}

const BodyHeader: React.FC<BodyHeaderProps> = ({ setProfileInfo }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <header className="flex  p-2 md:p-6 justify-between items-center">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <button
          type="submit"
          onClick={() => setModalOpen(true)}
          className="bg-[#399bce] text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>
      </header>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <EmployeeForm
          setProfileInfo={setProfileInfo}
          setModalOpen={setModalOpen}
        />
      </Modal>
    </>
  );
};

export default BodyHeader;
