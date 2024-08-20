import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/change-password", data);
      if (response.data.status === "success") {
        setSuccessMessage("Password changed successfully!");
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to change password");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("An error occurred while changing the password");
      setSuccessMessage("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Change Password</h1>
      {successMessage && (
        <div className="mb-4 text-green-500 font-bold">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="mb-4 text-red-500 font-bold">{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            {...register("current_password", {
              required: "Current password is required",
            })}
            className="border border-gray-300 rounded p-2 w-full"
          />
          {errors.current_password && (
            <p className="text-red-500 text-sm">
              {errors.current_password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            {...register("new_password", {
              required: "New password is required",
            })}
            className="border border-gray-300 rounded p-2 w-full"
          />
          {errors.new_password && (
            <p className="text-red-500 text-sm">
              {errors.new_password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            {...register("confirm_new_password", {
              required: "Please confirm the new password",
              validate: (value) =>
                value === watch("new_password") || "Passwords do not match",
            })}
            className="border border-gray-300 rounded p-2 w-full"
          />
          {errors.confirm_new_password && (
            <p className="text-red-500 text-sm">
              {errors.confirm_new_password.message}
            </p>
          )}
        </div>
        <Button type="submit" variant="outline" className="w-full p-3 mt-4 bg-[#89e2dc] text-[#1e1b4b]">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
