import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "../Images/SignUp.png";
import axios from "axios";
import Swal from "sweetalert2";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const formData = {
    name: {
      firstName,
      lastName,
    },
    email,
    password,
  };

  const passwordLengthAndMatchAndEmpty = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Please fill all the fields",
      });
      return false;
    } else if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Password must be atleast 8 characters long",
      });
      return false;
    } else if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
      });
      return false;
    } else {
      return true;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!passwordLengthAndMatchAndEmpty()) {
      return;
    } else {
      try {
        const res = await axios.post(
          "http://localhost:3001/api/users/",
          formData
        );
        setData(res.data);
        const token = res.data.token;
        Swal.fire({
          icon: "success",
          title: "Signed up successfully",
        }).then(() => {
          localStorage.setItem("token", token);
          localStorage.setItem("first name", firstName);
          localStorage.setItem("last name", lastName);
          localStorage.setItem("email", email);
          navigate("/dashboard");
        });
      } catch (err) {
        if (err.response) {
          Swal.fire({
            icon: "error",
            title: err.response.data.error,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
          });
        }
      }
    }
  };

  return (
    <div className=" relative w-screen h-screen bg-[#111827]">
      <img
        src={SignUp}
        alt="SignUp"
        className=" absolute h-3/2 w-1/2 right-3/2"
      />
      <div className=" ">
        <form
          className=" bg-[#1f2937] rounded-lg h-fit w-fit absolute top-32 right-52"
          onSubmit={handleSignup}
        >
          <h1 className=" text-xl font-bold leading-tight tracking-tight text-white text-center my-5 mt-7">
            Create an account
          </h1>
          <div className="flex justify-center mx-7">
            <div className="flex flex-col">
              <div className=" mb-5">
                <div className="flex">
                  <div className=" mr-5">
                    <label
                      className="block mb-2 text-sm font-medium text-white"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      className="bg-[#374151] border-gray-300 focus:border-blue-700 placeholder:text-sm h-10 px-3 rounded-lg text-sm focus:outline-none text-white placeholder:text-white placeholder:opacity-40"
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="John"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className=" mb-5">
                    <label
                      className="block mb-2 text-sm font-medium text-white"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      className="bg-[#374151] border-gray-300 focus:border-blue-700 placeholder:text-sm h-10 px-3 rounded-lg text-sm focus:outline-none text-white placeholder:text-white placeholder:opacity-40"
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Doe"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className=" mb-5">
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="bg-[#374151] border-gray-300 focus:border-blue-700 placeholder:text-sm h-10 px-3 rounded-lg text-sm focus:outline-none w-96 text-white placeholder:text-white placeholder:opacity-40"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className=" mb-5">
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="bg-[#374151] border-gray-300 focus:border-blue-700 placeholder:text-sm h-10 px-3 rounded-lg text-sm focus:outline-none w-96 text-white placeholder:text-white placeholder:opacity-40"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className=" mb-2">
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="bg-[#374151] border-gray-300 focus:border-blue-700 placeholder:text-sm h-10 px-3 rounded-lg text-sm focus:outline-none w-96 text-white placeholder:text-white placeholder:opacity-40"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  className="bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white font-medium py-2 w-96 rounded-lg mt-5"
                  type="submit"
                >
                  Sign Up
                </button>

                <div className=" my-5">
                  <p className="text-white text-sm font-lg">
                    Already have an account?{" "}
                    <Link
                      to="/"
                      className="text-blue-500 hover:underline font-medium"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
