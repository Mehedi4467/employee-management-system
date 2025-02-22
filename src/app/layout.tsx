// import type { Metadata } from 'next';
// import './globals.css';
// import Header from '@/components/Common/Header';
// import SideBar from '@/components/Common/SideBar';
// import { Toaster } from 'react-hot-toast';

// export const metadata: Metadata = {
//   title: 'Employee Management System',
//   description: 'Generated by create next app',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-200 dark:bg-gray-800 dark:text-white">
//         <div className=" sticky top-0">
//           <Header />
//         </div>
//         <div className="flex h-screen overflow-hidden">
//           <aside className="w-64 bg-white dark:bg-gray-800 p-4 border-r h-screen fixed shadow-md">
//             <SideBar />
//           </aside>
//           <div className="w-full">{children}</div>
//         </div>
//         <Toaster />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Common/Header';
import SideBar from '@/components/Common/SideBar';
import { Toaster } from 'react-hot-toast';
import MobileSidebar from '@/components/Common/MobileSidebar';

export const metadata: Metadata = {
  title: 'Employee Management System',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200 dark:bg-gray-800 dark:text-white">
        {/* Header */}
        <div className="sticky z-50 top-0">
          <Header />
        </div>

        <div className="flex min-h-screen overflow-hidden">
          <MobileSidebar />

          <aside className="hidden md:block md:w-64 bg-white dark:bg-gray-800 p-4 border-r h-screen fixed shadow-md">
            <SideBar />
          </aside>
          <div className="w-full">{children}</div>
        </div>

        <Toaster />
      </body>
    </html>
  );
}
