'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Pagination from '../Common/Pagination';
import EmptyPage from '../Common/EmptyPage';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import BodyHeader from '../Home/BodyHeader';
import SearchBar from '../Common/SearchBar';
import Spinner from '../Common/Spinner';
import Modal from '../Common/Modal';
import EmployeeDelete from './EmployeeDelete';

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

const EmployeeTableView = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profileInfo, setProfileInfo] = useState<EmployeeResponse | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const date = searchParams.get('date') || '';
  const router = useRouter();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const getEmployeeData = async (
    page: number,
    search: string,
    date: string,
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/get-employee?page=${page}&search=${search}&joiningDate=${date}`,
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
    router.push(`/employee-list-table-view?page=1&search=${value}&date=`);
  };

  const onFilter = (value: string) => {
    router.push(`/employee-list-table-view?page=1&search=&date=${value}`);
  };
  console.log(profileInfo);
  return (
    <>
      <BodyHeader setProfileInfo={setProfileInfo} />
      <section className="p-4 shadow dark:bg-gray-800 bg-white rounded-lg">
        <div>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-4 gap-3">
            <h1 className="text-lg hidden md:block sm:text-xl font-semibold text-center sm:text-left">
              Employees List Table View
            </h1>
            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <SearchBar onSearch={onSearch} onFilter={onFilter} />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Spinner />
            </div>
          ) : profileInfo && profileInfo.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f3f4f6] dark:bg-[#1f2937]">
                  <tr className="border-b dark:border-gray-700">
                    <th className="p-3 text-sm md:text-base">ID</th>
                    <th className="p-3 text-sm md:text-base">Name</th>
                    <th className="p-3 text-sm md:text-base">Phone</th>
                    <th className="p-3 text-sm md:text-base">Email</th>
                    <th className="p-3 text-sm md:text-base">Address</th>
                    <th className="p-3 text-sm md:text-base">Joining Date</th>
                    <th className="p-3 text-sm md:text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profileInfo.data.map((employee, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm md:text-base"
                    >
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2 flex items-center space-x-2">
                        <img
                          src={employee.profilePicture}
                          alt={employee.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <span className="text-[#3a9ade] truncate  font-semibold">
                          {employee.name}
                        </span>
                      </td>
                      <td className="p-2">{employee.phone}</td>
                      <td className="p-2 whitespace-nowrap">
                        {employee.email}
                      </td>
                      <td className="p-2">{employee.address}</td>
                      <td className="p-2 whitespace-nowrap">
                        {employee.joiningDate
                          ? new Date(employee.joiningDate).toDateString()
                          : 'N/A'}
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-3">
                          <button type="submit">
                            <img
                              src="/icon/edit-black.png"
                              width={20}
                              height={20}
                              alt="edit icon"
                              className="dark:hidden"
                            />
                            <img
                              src="/icon/edit-white.png"
                              width={20}
                              height={20}
                              alt="edit icon"
                              className="hidden dark:block"
                            />
                          </button>
                          <button
                            onClick={() => setDeleteModalOpen(true)}
                            type="submit"
                          >
                            <img
                              src="/icon/trash-black.png"
                              width={20}
                              height={20}
                              alt="delete icon"
                              className="dark:hidden"
                            />
                            <img
                              src="/icon/trash-white.png"
                              width={20}
                              height={20}
                              alt="delete icon"
                              className="hidden dark:block"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyPage />
          )}

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={page || 1}
              totalPages={profileInfo?.totalPages || 1}
              url={`employee-list-table-view?search=${search}&date=&`}
            />
          </div>
        </div>

        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        >
          <EmployeeDelete
            setProfileInfo={setProfileInfo}
            setDeleteModalOpen={setDeleteModalOpen}
            deleteModalOpen={deleteModalOpen}
          />
        </Modal>
      </section>
    </>
  );
};

export default EmployeeTableView;
