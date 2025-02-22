import Image from 'next/image';
import React from 'react';

const EmptyPage = () => {
  return (
    <div className="min-h-96 flex justify-center items-center">
      <Image
        src="/image/empty-employee.png"
        alt="Empty image"
        width={200}
        height={200}
      />
    </div>
  );
};

export default EmptyPage;
