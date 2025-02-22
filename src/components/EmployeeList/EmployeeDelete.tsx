import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface Employee {
  _id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  profilePicture?: string;
  joiningDate: string;
}

interface EmployeeResponse {
  status: boolean;
  data: Employee[];
  totalPages: number;
  currentPage: number;
}

interface EmployeeDeleteProps {
  deleteModalOpen: Employee | null;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<Employee | null>>;
  setProfileInfo: React.Dispatch<React.SetStateAction<EmployeeResponse | null>>;
}

const EmployeeDelete: React.FC<EmployeeDeleteProps> = ({
  setProfileInfo,
  setDeleteModalOpen,
  deleteModalOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `/api/delete-employee?id=${deleteModalOpen?._id}`,
      );
      if (data?.status) {
        setProfileInfo((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            data: prev.data.filter((emp) => emp._id !== deleteModalOpen?._id),
          };
        });
        toast.success(data?.message);
        setLoading(false);
        setDeleteModalOpen(null);
      } else {
        toast.error(data?.message);
        setLoading(false);
      }
    } catch (err) {
      toast.error((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800   w-96">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white">
        Delete Confirmation
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Are you sure you want to delete{' '}
        <span className="font-semibold">
          {deleteModalOpen ? deleteModalOpen?.name : ''}
        </span>
        ?
      </p>
      <div className="mt-4 flex justify-end space-x-3">
        {loading ? (
          <span className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-50"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p>Please wait...</p>
          </span>
        ) : (
          <button
            type="submit"
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeDelete;
