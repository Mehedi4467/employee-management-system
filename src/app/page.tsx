import Image from "next/image";

export default function Home() {
  const employees = [
    {
      id: 1,
      name: "Ethan Antonio",
      department: "Admin",
      contact: "+1 404-233-7961",
      email: "admin@centrovo.com",
      img: "/image/mehedi_hassan.jpg",
      requests: 1,
      hireDate: "2019-06-06",
    },
    {
      id: 2,
      name: "Louis B. Kimble",
      department: "Hardware",
      contact: "+1 404-233-7962",
      email: "louis@centrovo.com",
      img: "/image/mehedi_hassan.jpg",
      requests: 2,
      hireDate: "2019-01-01",
    },
    {
      id: 3,
      name: "Calvin C. Landry",
      department: "Software",
      contact: "+1 404-233-7963",
      email: "calvin@centrovo.com",
      img: "/image/mehedi_hassan.jpg",
      requests: 1,
      hireDate: "2019-01-15",
    },
    {
      id: 4,
      name: "Mabel L. Lee",
      department: "Marketing",
      contact: "+1 404-233-7964",
      email: "mabel@centrovo.com",
      img: "/image/mehedi_hassan.jpg",
      requests: 3,
      hireDate: "2019-04-03",
    },
  ];
  return (
    <main>
      <div className={"dark:bg-gray-900 "}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Company Employees</h1>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Department</th>
                  <th className="p-2">Contact</th>
                  <th className="p-2">Requests</th>
                  <th className="p-2">Hire Date</th>
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
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <span className="text-blue-600 dark:text-blue-400">
                        {emp.name}
                      </span>
                    </td>
                    <td className="p-2">{emp.department}</td>
                    <td className="p-2">
                      {emp.contact} <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {emp.email}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className="px-2 py-1 bg-green-200 text-green-800 dark:bg-green-500 dark:text-white rounded">
                        {emp.requests}
                      </span>
                    </td>
                    <td className="p-2">{emp.hireDate}</td>
                    <td className="p-2">...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
