// Clinet Did Not Approve on

import React from "react";
import LoginImage from "../assets/Login.jpg";
import { Link } from "react-router-dom";
function Register() {
  return (
    <>
      <section className="min-h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 flex items-center justify-center py-10">
        <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left image (hidden on small screens) */}
            <div className="hidden md:block">
              <img
                src={LoginImage}
                alt="Register Icon"
                className="w-[600px] h-[755px] mr-3 object-cover rounded-lg"
              />
            </div>

            {/* Register form */}
            <div className="flex items-center justify-center p-8 md:p-12">
              <div className="w-full">
                <div className="flex items-center mb-6">
                  <i
                    className="fas fa-dumbbell fa-2x text-blue-400 mr-3"
                    aria-hidden="true"
                  />
                  <span className="text-3xl font-bold text-gray-800">
                    Welcome to <b>GymFit 👋</b>
                  </span>
                </div>

                <h5 className="text-gray-600 mb-6 tracking-wide font-semibold">
                  Create your account
                </h5>

                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition">
                      Register
                    </button>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <a href="#!" className="hover:underline">
                      Forgot password?
                    </a>
                    <a href="#!" className="hover:underline">
                      Terms of use
                    </a>
                  </div>

                  <p className="text-sm text-gray-700 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400 hover:underline">
                      Log in here
                    </Link>
                  </p>

                  <a
                    href="#!"
                    className="block text-sm text-gray-500 hover:underline mt-2">
                    Privacy policy
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-100 text-center text-sm text-gray-600">
        <div className="w-full bg-black bg-opacity-10 py-4">
          © 2024 - {new Date().getFullYear()} Copyright:{" "}
          <a className="text-gray-800 hover:underline" href="#">
            ZIA
          </a>
        </div>
      </footer>
    </>
  );
}

export default Register;
