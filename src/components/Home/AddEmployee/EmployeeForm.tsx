/* eslint-disable @next/next/no-img-element */
'use client';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  profilePicture: string;
}

interface Employee {
  _id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  joiningDate: string;
  profilePicture?: string;
}

interface EmployeeResponse {
  status: boolean;
  data: Employee[];
  totalPages: number;
  currentPage: number;
}
interface BodyHeaderProps {
  setProfileInfo: React.Dispatch<React.SetStateAction<EmployeeResponse | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmployeeForm: React.FC<BodyHeaderProps> = ({
  setProfileInfo,
  setModalOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToImgBB = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
        formData,
      );
      return data.data.url;
    } catch (error) {
      console.error('Image upload error:', error);
      return null;
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    let imageUrl: string | null = '';
    if (selectedFile) {
      imageUrl = await uploadImageToImgBB(selectedFile);
      if (!imageUrl) {
        console.error('Image upload failed');
        setLoading(false);
        return;
      }
    }

    const submitData = {
      ...data,
      profilePicture: imageUrl,
      joiningDate: Date.now(),
    };

    try {
      const { data } = await axios.patch(`/api/submit-employee`, submitData);
      if (data?.status) {
        setProfileInfo((prev) => {
          const updatedData = prev ? [submitData, ...prev.data] : [submitData];

          return {
            data: updatedData,
            status: true,
            totalPages: prev?.totalPages ?? prev?.totalPages ?? 1,
            currentPage: prev?.currentPage ?? prev?.currentPage ?? 1,
          } as EmployeeResponse;
        });
        setModalOpen(false);
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      console.error('Submit data error:', (err as Error).message);
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center space-y-3">
          <label
            htmlFor="fileUpload"
            className="w-24 h-24 flex items-center justify-center border-2  border-gray-400 dark:border-white rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-gray-500 dark:text-white text-[10px] text-center px-2">
                Drop Image or Click to Upload
              </span>
            )}
          </label>
          <input
            type="file"
            {...register('profilePicture', {})}
            accept="image/*"
            className="hidden"
            id="fileUpload"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-full">
            <label className="block font-semibold dark:text-white">
              Full Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter your name"
            />
            <div className="min-h-[20px]">
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="w-full">
            <label className="block font-semibold dark:text-white">
              Position
            </label>
            <input
              type="text"
              {...register('position', { required: 'Position is required' })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter your position"
            />
            <div className="min-h-[20px]">
              {errors.position && (
                <p className="text-red-500 text-sm">
                  {errors.position.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-full">
            <label className="block font-semibold dark:text-white">
              Phone Number
            </label>
            <input
              type="tel"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^(?:\+88|88)?01[3-9]\d{8}$/,
                  message: 'Phone must be 11 digits and start with 01',
                },
              })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter your phone number"
            />
            <div className="min-h-[20px]">
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <label className="block font-semibold dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email address',
                },
              })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
            />
            <div className="min-h-[20px]">
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block font-semibold dark:text-white">Address</label>
          <textarea
            {...register('address', { required: 'Address is required' })}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter your address"
            rows={3}
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center bg-[#399bce] text-white py-2 rounded-md hover:bg-blue-600"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-50"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <p>Please wait...</p>
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
