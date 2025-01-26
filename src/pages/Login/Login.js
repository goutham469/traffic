import React, { useEffect } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import { LockKeyhole, User } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  async function onSuccess(response) {
    let data = response.credential;
    let credential = jwtDecode(data);

    let res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credential.email,
          img: credential.img,
        }),
      }
    );
    res = await res.json();
    if (res.message === "login success") {
      toast.success(res.message);
      localStorage.setItem("email", credential.email);
      navigate("/dashboard");
    } else {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    let user_email = localStorage.getItem("email");
    if (user_email) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="bg-gray-700 p-8 rounded-xl shadow-lg w-96 text-center">
        <div className="flex justify-center mb-4">
          <img
            src={`${process.env.REACT_APP_CLIENT_BASE_URL}/favicon.ico`}
            className="w-12 h-12 mr-2"
            alt="logo"
          />
          <b className="text-2xl">Traffic Meter</b>
        </div>

        <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
          <User size={20} /> Login / Signup
        </h2>

        <p className="text-gray-300 mt-2">Login to continue.</p>

        <div className="mt-6 flex flex-col items-center">
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
            <GoogleLogin onSuccess={onSuccess} />
          </GoogleOAuthProvider>

          <button
            className="flex items-center gap-2 bg-red-500 px-4 py-2 mt-4 rounded-lg hover:bg-red-600 transition"
          >
            <FaGoogle /> Sign in with Google
          </button>
        </div>

        <div className="mt-6 text-gray-400 flex items-center justify-center gap-2">
          <LockKeyhole size={18} /> Secure Login
        </div>
      </div>
    </div>
  );
};

export default Login;
