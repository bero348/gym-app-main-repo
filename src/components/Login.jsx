import React, { useContext } from "react";
import LoginImage from "../assets/Login.jpg";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Login() {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    email.length > 0 && loginUser(email, password);
    //console.log(email);
    //console.log(password);
  };
  return (
    <>
      <section className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-950 flex items-center justify-center py-10">
        <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left image (hidden on small screens) */}
            <div className="hidden md:block">
              <img
                src={LoginImage}
                alt="Login Icon"
                style={{
                  width: "500px",
                  height: "650px",
                  marginRight: "12px",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Login form */}
            <div className="flex items-center justify-center p-8 md:p-12">
              <div className="w-full">
                <div className="flex items-center mb-6">
                  <span className="text-2xl font-bold text-blue-400 mr-3">
                    <i className="fas fa-dumbbell fa-2x me-3 text-blue-400" />
                  </span>
                  <span className="text-3xl font-bold text-gray-800">
                    welcome back👋
                  </span>
                </div>

                <h5 className="text-gray-600 mb-6 tracking-wide">
                  Sign into your account
                </h5>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      name="email"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      name="password"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition">
                      Login
                    </button>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <a href="#!" className="hover:underline">
                      Your dream is happening
                    </a>
                  </div>

                  {/* <p className="text-sm text-gray-700 mt-4">
                    Don’t have an account?{" "}
                    <Link
                      to="/Register"
                      className="text-blue-400 hover:underline">
                      Register here
                    </Link>
                  </p> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
