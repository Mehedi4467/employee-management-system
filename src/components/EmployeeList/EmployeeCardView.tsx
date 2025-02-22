/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState } from 'react';
import Spinner from '../Common/Spinner';
import axios from 'axios';
import Pagination from '../Common/Pagination';

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
    getEmployeeData(1, '', '');
  }, []);

  console.log(profileInfo);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : !loading && profileInfo && profileInfo?.data?.length > 0 ? (
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileInfo?.data?.map((employee, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg border bg-white dark:bg-gray-800 p-4"
              >
                <div className="flex justify-center">
                  <img
                    src={employee.profilePicture || '/default-profile.png'}
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
      ) : (
        ''
      )}

      <Pagination
        currentPage={1}
        totalPages={10}
        url={`employee-list-card-view?`}
      />
    </>
  );
};

export default EmployeeCardView;
