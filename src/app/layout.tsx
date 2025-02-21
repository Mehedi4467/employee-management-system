import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Common/Header";
import SideBar from "@/components/Common/SideBar";
import BodyHeader from "@/components/Home/BodyHeader";

export const metadata: Metadata = {
  title: "Employee Management System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200 dark:bg-gray-800 dark:text-white">
        <div className=" sticky top-0">
          <Header />
        </div>
        <div className="flex h-screen overflow-hidden">
          <aside className="w-64 bg-white dark:bg-gray-800 p-4 border-r h-screen fixed shadow-md">
            <SideBar />
          </aside>
          <main className="flex-1 p-6 dark:bg-[#111827] overflow-auto ml-64">
            <BodyHeader />
            <section className="p-4 shadow dark:bg-gray-800 bg-white rounded-lg">
              {children}
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
