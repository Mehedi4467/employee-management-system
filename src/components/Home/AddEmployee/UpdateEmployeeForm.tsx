/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  _id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  profilePicture?: string;
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

interface UpdateEmployeeFormProps {
  setProfileInfo: React.Dispatch<React.SetStateAction<EmployeeResponse | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<Employee | null>>;
  editModalOpen: Employee | null;
}

const UpdateEmployeeForm: React.FC<UpdateEmployeeFormProps> = ({
  setProfileInfo,
  setModalOpen,
  editModalOpen,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    editModalOpen?.profilePicture || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (editModalOpen) {
      setValue("name", editModalOpen.name);
      setValue("_id", editModalOpen._id);
      setValue("position", editModalOpen.position);
      setValue("phone", editModalOpen.phone);
      setValue("email", editModalOpen.email);
      setValue("address", editModalOpen.address);
      setImagePreview(editModalOpen.profilePicture || null);
    }
  }, [editModalOpen, setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToImgBB = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
        formData
      );
      return data.data.url;
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    let imageUrl = imagePreview;

    if (selectedFile) {
      imageUrl = await uploadImageToImgBB(selectedFile);
      if (!imageUrl) {
        toast.error("Image upload failed");
        setLoading(false);
        return;
      }
    }

    const submitData = {
      ...formData,
      profilePicture: imageUrl,
    };

    try {
      const { data } = await axios.patch(`/api/submit-employee`, submitData);
      if (data?.status) {
        setProfileInfo((prev) => {
          if (!prev) return null;

          const updatedEmployees = prev.data.map((employee) =>
            employee._id === submitData._id
              ? { ...employee, ...submitData }
              : employee
          );

          return {
            ...prev,
            data: updatedEmployees,
            status: true,
            totalPages: prev.totalPages,
            currentPage: prev.currentPage,
          } as EmployeeResponse;
        });
        setModalOpen(null);
        toast.success("Employee updated successfully!");
      } else {
        toast.error("Failed to update employee");
      }
    } catch (error) {
      toast.error("Error updating employee");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-4 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center space-y-3">
          <label htmlFor="fileUpload" className="cursor-pointer">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <span className="text-gray-500 dark:text-white text-sm">
                Upload Image
              </span>
            )}
          </label>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileUpload"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <div>
            <label>Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border p-2 rounded"
            />
            <div className="min-h-[10px]">
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </div>
          <div>
            <label>Position</label>
            <input
              type="text"
              {...register("position", { required: "Position is required" })}
              className="w-full border p-2 rounded"
            />
            <div className="min-h-[10px]">
              {errors.position && (
                <p className="text-red-500 text-sm">
                  {errors.position.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <label>Phone</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^(?:\+88|88)?01[3-9]\d{8}$/,
                  message: "Phone must be 11 digits and start with 01",
                },
              })}
              className="w-full border p-2 rounded"
            />
            <div className="min-h-[10px]">
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border p-2 rounded"
            />
            <div className="min-h-[10px]">
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <label>Address</label>
          <textarea
            {...register("address", { required: "Address is required" })}
            className="w-full border p-2 rounded"
          />
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
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;
