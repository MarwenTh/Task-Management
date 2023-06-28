import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../Images/LoginImg.png";
import axios from "axios";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/users/login", {
        email,
        password,
      });
      setData(res.data);
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      if (res) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("first name", res.data.user.name.firstName);
        localStorage.setItem("last name", res.data.user.name.lastName);
        localStorage.setItem("email", res.data.user.email);
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        Toast.fire({
          icon: "error",
          title: err.response.data.error,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      }
    }
  };

  return (
    <div className=" w-screen h-screen  bg-[#111827]">
      <div className="flex items-center">
        <form
          className=" bg-[#1f2937] rounded-lg h-fit w-fit absolute top-64 left-72"
          onSubmit={handleLogin}
        >
          <h1 className=" text-xl font-bold leading-tight tracking-tight text-white text-center my-5 mt-7">
            Sign in to your account
          </h1>
          <div className=" mx-7">
            <div className="flex flex-col mb-5">
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="email"
              >
                Your email
              </label>
              <input
                className=" bg-[#374151] border-gray-300 focus:border-blue-700 placeholder:text-sm h-10 px-3 rounded-lg text-sm focus:outline-none w-96 text-white placeholder:text-white placeholder:opacity-40"
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className=" block mb-2 text-sm font-medium text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className=" bg-[#374151] border-gray-300 focus:border-blue-700 placeholder:text-sm h-10 px-3 rounded-lg text-sm focus:outline-none w-96 text-white placeholder:text-white placeholder:opacity-40"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-between mx-7 my-2">
            <div className="flex items-center">
              <input
                className="h-4 w-4 rounded border-none "
                type="checkbox"
                name="remember"
                id="remember"
              />
              <label
                className="ml-2 block text-sm text-white font-normal"
                htmlFor="remember"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgotpassword"
              className="m-5 text-blue-700 hover:underline font-medium text-sm"
            >
              Forgot Password
            </Link>
          </div>
          <div className=" flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white font-medium py-2 w-96 rounded-lg "
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="flex justify-start my-5 mx-6">
            <p className="text-white text-sm font-lg ">
              Don't have an account?
            </p>
            <Link
              to="/signup"
              className="text-blue-700 hover:underline font-medium ml-2 text-sm"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <img
        className="hidden md:block absolute right-0 top-0 h-screen w-1/2"
        src={loginImg}
        alt="login"
      />
    </div>
  );
};

export default LoginPage;
