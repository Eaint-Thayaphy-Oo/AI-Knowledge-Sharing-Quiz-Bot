import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="bg-indigo-950 min-h-screen relative">
        <div className="flex flex-col place-items-start justify-center ml-10">
          <h1 className="font-bold text-3xl sm:text-2xl text-white mt-28 ">
            Welcome Back!
          </h1>
          <p className="font-bold text-xl sm:text-2xl text-white mt-8">
            Your Path to Knowledge Awaits!
          </p>
          <img
            src="/assets/images/image1.png"
            alt="image1"
            className="absolute top-20 right-0 mb-10 sm:w-80 md:w-96"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/assets/images/image2.png"
            alt="image2"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-10 sm:w-80 md:w-96"
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm rounded p-8 mt-32"
          >
            <div className="mb-4">
              <input
                {...register("email", { required: "Email is required" })}
                className="appearance-none bg-transparent border-b-2 border-gray-300 w-full placeholder-white text-white mr-3 py-1 px-2 leading-tight focus:outline-none focus:border-blue-500"
                type="email"
                placeholder="Email"
                id="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-6 mt-10">
              <input
                {...register("password", { required: "Password is required" })}
                className="appearance-none bg-transparent border-b-2 border-gray-300 w-full placeholder-white text-white mr-3 py-1 px-2 leading-tight focus:outline-none focus:border-blue-500"
                type="password"
                placeholder="Password"
                id="password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mt-24">
              <Button
                type="submit"
                variant="outline"
                className="w-44 sm:w-36 p-3 flex items-center justify-center font-bold rounded-full bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)] mx-auto"
              >
                Sign In
              </Button>
            </div>
            <p className="font-bold text-md sm:text-lg flex items-center justify-center text-white mt-8">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#59F8E8]  ml-1">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
        <img
          src="/assets/images/image3.png"
          alt="image3"
          className="absolute bottom-0 left-0 sm:w-80 md:w-96"
        />
      </div>
    </>
  );
};
