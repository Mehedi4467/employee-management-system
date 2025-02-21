import Image from 'next/image';
import React from 'react';

const EmployeeTableView = () => {
    const employees = [
        {
          id: 1,
          name: "Mehedi Hassan",
          phone: "01521542122",
          email: "mehedihassan4467@gmail.com",
          img: "/image/mehedi_hassan.jpg",
          address: "359 West Shewrapara, Mirpur, dhaka",
          joiningDate: "2019-06-06",
        },
        {
          id: 2,
          name: "Mehedi Hassan",
          phone: "01521542122",
          email: "mehedihassan4467@gmail.com",
          img: "/image/mehedi_hassan.jpg",
          address: "359 West Shewrapara, Mirpur, dhaka",
          joiningDate: "2019-06-06",
        },
        {
          id: 3,
          name: "Mehedi Hassan",
          phone: "01521542122",
          email: "mehedihassan4467@gmail.com",
          img: "/image/mehedi_hassan.jpg",
          address: "359 West Shewrapara, Mirpur, dhaka",
          joiningDate: "2019-06-06",
        },
        {
          id: 4,
          name: "Mehedi Hassan",
          phone: "01521542122",
          email: "mehedihassan4467@gmail.com",
          img: "/image/mehedi_hassan.jpg",
          address: "359 West Shewrapara, Mirpur, dhaka",
          joiningDate: "2019-06-06",
        },
      ];
    return (
        <table className="w-full text-left">
        <thead className="bg-[#f3f4f6] dark:bg-[#1f2937]">
          <tr className="border-b dark:border-gray-700">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Email</th>
            <th className="p-2">Address</th>
            <th className="p-2">Joining Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="p-2">{emp.id}</td>
              <td className="p-2 flex items-center space-x-2">
                <Image
                  src={emp.img}
                  alt={emp.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-[#3a9ade] font-semibold">
                  {emp.name}
                </span>
              </td>
              <td className="p-2">{emp.phone}</td>
              <td className="p-2">
                {emp.email} 
              </td>
              <td className="p-2">
                <span className="px-2 py-1 bg-green-200 text-green-800 dark:bg-green-500 dark:text-white rounded">
                  {emp.address}
                </span>
              </td>
              <td className="p-2">{emp.joiningDate}</td>
              <td className="p-2">
                <div className="flex items-center gap-4">
                  <button>
                    <Image src="/icon/edit-black.png" width={20} height={20} alt="edite icon" className="dark:hidden"/>
                    <Image src="/icon/edit-white.png" width={20} height={20} alt="edite icon" className="hidden dark:block"/>
                  </button>
                  <button>
                    <Image src="/icon/trash-black.png" width={20} height={20} alt="edite icon" className="dark:hidden"/>
                    <Image src="/icon/trash-white.png" width={20} height={20} alt="edite icon" className="hidden dark:block"/>
                  </button>
                 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default EmployeeTableView;