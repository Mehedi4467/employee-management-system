"use client";
import React, { useState } from "react";
import Modal from "../Common/Modal";
import EmployeeForm from "./AddEmployee/EmployeeForm";

const BodyHeader = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#399bce] text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>
      </header>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <EmployeeForm />
      </Modal>
    </>
  );
};

export default BodyHeader;
