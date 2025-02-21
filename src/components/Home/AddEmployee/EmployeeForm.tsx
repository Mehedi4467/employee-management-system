/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  profilePicture: FileList;
}

const EmployeeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
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
            {...register("profilePicture", {
              required: "Profile picture is required",
            })}
            accept="image/*"
            className="hidden"
            id="fileUpload"
            onChange={handleImageChange}
          />
          {errors.profilePicture && (
            <p className="text-red-500 text-sm">
              {errors.profilePicture.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="w-full">
            <label className="block font-semibold dark:text-white">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
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
              {...register("position", { required: "Position is required" })}
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
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^(?:\+88|88)?01[3-9]\d{8}$/,
                  message: "Phone must be 11 digits and start with 01",
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
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
            {...register("address", { required: "Address is required" })}
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
          className="w-full bg-[#399bce] text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
