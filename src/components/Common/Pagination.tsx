'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  url: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  url,
}) => {
  const router = useRouter();

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) router.push(`${url}page=${currentPage - 1}`);
  };

  const handleNext = () => {
    if (currentPage < totalPages) router.push(`${url}page=${currentPage + 1}`);
  };

  const visiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  if (endPage - startPage < visiblePages - 1) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md transition ${
          currentPage === 1
            ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
            : 'bg-[#399bce] hover:bg-blue-600 text-white'
        }`}
      >
        Prev
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => router.push(`${url}page=1`)}
            className={`px-3 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-[#399bce] text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => router.push(`${url}page=${page}`)}
          className={`px-3 py-2 rounded-md transition ${
            currentPage === page
              ? 'bg-[#399bce] text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => router.push(`${url}page=${totalPages}`)}
            className={`px-3 py-2 rounded-md transition ${
              currentPage === totalPages
                ? 'bg-[#399bce] text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md transition ${
          currentPage === totalPages
            ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
            : 'bg-[#399bce] hover:bg-blue-600 text-white'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
