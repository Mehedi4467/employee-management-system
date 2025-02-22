/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState } from 'react';
import Spinner from '../Common/Spinner';
import axios from 'axios';
import Pagination from '../Common/Pagination';
import BodyHeader from '../Home/BodyHeader';
import SearchBar from '../Common/SearchBar';
import { useRouter, useSearchParams } from 'next/navigation';
import EmptyPage from '../Common/EmptyPage';

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

const EmployeeCardView = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profileInfo, setProfileInfo] = useState<EmployeeResponse | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const date = searchParams.get('date') || '';
  const router = useRouter();
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
        setLoading(false);
      } else {
        setProfileInfo(null);
        setLoading(false);
      }
    } catch (err) {
      console.log((err as Error).message);
      setLoading(false);
      setProfileInfo(null);
    }
  };

  useEffect(() => {
    getEmployeeData(page, search, date);
  }, [page, search, date]);

  const onSearch = (value: string) => {
    router.push(`/employee-list-card-view?page=&search=${value}&date=`);
  };
  const onFilter = (value: string) => {
    console.log(value);
    router.push(`/employee-list-card-view?page=&search=&date=${value}`);
  };

  console.log(profileInfo);

  return (
    <>
      <BodyHeader setProfileInfo={setProfileInfo} />
      <section className="p-4 relative shadow dark:bg-gray-800 bg-white rounded-lg">
        <div>
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl font-semibold"> Employees List Card View</h1>
            <SearchBar onSearch={onSearch} onFilter={onFilter} />
          </div>
          {loading ? (
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
              <Spinner />
            </div>
          ) : !loading && profileInfo && profileInfo?.data?.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
              <div className="container mx-auto px-4 py-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profileInfo?.data?.map((employee, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-lg border bg-white dark:bg-gray-800 p-4"
                    >
                      <div className="flex justify-center">
                        <img
                          src={
                            employee.profilePicture || '/default-profile.png'
                          }
                          alt={employee.name}
                          width={100}
                          height={100}
                          className="rounded-full border-2 border-gray-300"
                        />
                      </div>

                      <div className="text-center mt-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {employee.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {employee.position}
                        </p>
                      </div>

                      <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <p>📞 {employee.phone}</p>
                        <p>✉️ {employee.email}</p>
                        <p>📍 {employee.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <EmptyPage />
          )}

          <Pagination
            currentPage={page || 1}
            totalPages={profileInfo?.totalPages || 1}
            url={`employee-list-card-view?search=${search}&date=&`}
          />
        </div>
      </section>
    </>
  );
};

export default EmployeeCardView;
