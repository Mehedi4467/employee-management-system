import Image from 'next/image';
import React from 'react';

const EmployeeCardView = () => {
    const employee = {
        name: "MD Mehedi Hassan",
        image: "/image/mehedi_hassan.jpg", 
        position: "Software Engineer",
        phone: "+8801521542122",
        email: "mehedihassan4467@gmail.com",
        address: "Shewrapara, Mirpur, Dhaka",
      };
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg border bg-white dark:bg-gray-800 p-4">
      {/* Profile Image */}
      <div className="flex justify-center">
        <Image
          src={employee.image || "/default-profile.png"}
          alt={employee.name}
          width={100}
          height={100}
          className="rounded-full border-2 border-gray-300"
        />
      </div>

      {/* Employee Info */}
      <div className="text-center mt-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{employee.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{employee.position}</p>
      </div>

      {/* Contact Info */}
      <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
        <p>📞 {employee.phone}</p>
        <p>✉️ {employee.email}</p>
        <p>📍 {employee.address}</p>
      </div>
    </div>
    );
};

export default EmployeeCardView;