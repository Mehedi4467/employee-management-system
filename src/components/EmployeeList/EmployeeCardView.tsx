/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Spinner from "../Common/Spinner";
import axios from "axios";
import Pagination from "../Common/Pagination";
// import BodyHeader from '../Home/BodyHeader';
import SearchBar from "../Common/SearchBar";
import { useRouter, useSearchParams } from "next/navigation";
import EmptyPage from "../Common/EmptyPage";
import Modal from "../Common/Modal";
import EmployeeDelete from "./EmployeeDelete";

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

const EmployeeCardView = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profileInfo, setProfileInfo] = useState<EmployeeResponse | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const date = searchParams.get("date") || "";
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState<Employee | null>(null);

  const getEmployeeData = async (
    page: number,
    search: string,
    date: string
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/get-employee?page=${page}&search=${search}&joiningDate=${date}`
      );

      if (data?.status) {
        setProfileInfo(data);
      } else {
        setProfileInfo(null);
      }
    } catch (err) {
      console.log((err as Error).message);
      setProfileInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeData(page, search, date);
  }, [page, search, date]);

  const onSearch = (value: string) => {
    router.push(`/employee-list-card-view?page=1&search=${value}&date=`);
  };

  const onFilter = (value: string) => {
    router.push(`/employee-list-card-view?page=1&search=&date=${value}`);
  };

  return (
    <section className="p-4 shadow dark:bg-gray-800 bg-white rounded-lg">
      <div>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-4 gap-3">
          <h1 className="text-lg hidden md:block sm:text-xl font-semibold text-center sm:text-left">
            Employees List Card View
          </h1>
          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <SearchBar onSearch={onSearch} onFilter={onFilter} />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner />
          </div>
        ) : profileInfo && profileInfo.data.length > 0 ? (
          <div className="container mx-auto px-2 sm:px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
              {profileInfo.data.map((employee, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden relative shadow-lg border bg-white dark:bg-gray-800 p-4 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex justify-center">
                    <img
                      src={employee.profilePicture || "/icon/user.png"}
                      alt={employee.name}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-gray-300"
                    />
                  </div>

                  <div className="text-center mt-3">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                      {employee.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {employee.position}
                    </p>
                  </div>

                  <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 text-center md:text-left">
                    <p>📞 {employee.phone}</p>
                    <p>✉️ {employee.email}</p>
                    <p>📍 {employee.address}</p>
                  </div>
                  <button
                    onClick={() => setDeleteModalOpen(employee)}
                    type="submit"
                    className=" absolute top-2 right-3 h-8 w-8 rounded-full bg-red-500 flex justify-center items-center"
                  >
                    {/* <img
                      src="/icon/trash-black.png"
                      width={20}
                      height={20}
                      alt="delete icon"
                      className="dark:hidden"
                    /> */}
                    <img
                      src="/icon/trash-white.png"
                      width={20}
                      height={20}
                      alt="delete icon"
                      // className="hidden dark:block"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyPage />
        )}

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={page || 1}
            totalPages={profileInfo?.totalPages || 1}
            url={`employee-list-card-view?search=${search}&date=&`}
          />
        </div>
      </div>

      <Modal
        isOpen={deleteModalOpen ? true : false}
        onClose={() => setDeleteModalOpen(null)}
      >
        <EmployeeDelete
          setProfileInfo={setProfileInfo}
          setDeleteModalOpen={setDeleteModalOpen}
          deleteModalOpen={deleteModalOpen}
        />
      </Modal>
    </section>
  );
};

export default EmployeeCardView;
